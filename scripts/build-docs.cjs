/* Generate offline SVG math and PDF-ready HTML from the canonical Markdown. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {mathjax} = require('mathjax-full/js/mathjax.js');
const {TeX} = require('mathjax-full/js/input/tex.js');
const {SVG} = require('mathjax-full/js/output/svg.js');
const {liteAdaptor} = require('mathjax-full/js/adaptors/liteAdaptor.js');
const {RegisterHTMLHandler} = require('mathjax-full/js/handlers/html.js');
const {AllPackages} = require('mathjax-full/js/input/tex/AllPackages.js');
const MarkdownIt = require('markdown-it');
const root = path.resolve(__dirname, '..');
process.chdir(root);
const adaptor = liteAdaptor(); RegisterHTMLHandler(adaptor);
const errors = [];
const tex = new TeX({packages: AllPackages, formatError: (jax, error) => {throw error;}});
const math = mathjax.document('', {InputJax: tex, OutputJax: new SVG({fontCache:'none'})});
fs.mkdirSync('assets/formulas', {recursive:true}); fs.mkdirSync('tmp', {recursive:true});
const inventory = [];
const escape = s => s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
let source = '';
function image(expression, display, original=expression) {
  if(display) {
    // Wrap long prose labels and relation chains without changing their tokens.
    expression=expression.replace(/\\text\{([^{}]{65,})\}/g,(_,text)=> {
      const lines=[]; let line='';
      for(const word of text.split(/\s+/)) { if((line+' '+word).length>52) {lines.push(line);line=word;} else line+=(line?' ':'')+word; }
      if(line) lines.push(line);
      return '\\begin{gathered}'+lines.map(l=>'\\text{'+l+'}').join('\\\\')+'\\end{gathered}';
    });
    let boxed=expression.startsWith('\\boxed{') && expression.endsWith('}');
    let inner=boxed?expression.slice(7,-1):expression;
    let depth=0,parts=[],start=0;
    for(let i=0;i<inner.length;i++) {
      if(inner[i]==='{' && inner[i-1]!=='\\') depth++;
      if(inner[i]==='}' && inner[i-1]!=='\\') depth--;
      if(depth===0 && inner.slice(i).startsWith('\\rightarrow')) { parts.push(inner.slice(start,i)); start=i+11; i+=10; }
    }
    if(parts.length>=3) {
      parts.push(inner.slice(start));
      const rows=[];
      for(let i=0;i<parts.length;i+=2) rows.push((i?'\\rightarrow ':'')+parts.slice(i,i+2).join('\\rightarrow '));
      expression=(boxed?'\\boxed{':'')+'\\begin{gathered}'+rows.join('\\\\[4pt]')+'\\end{gathered}'+(boxed?'}':'');
    }
  }
  const id = crypto.createHash('sha256').update(expression).digest('hex').slice(0,20);
  const file = `assets/formulas/${id}.svg`;
  let svg;
  try {
    const node = math.convert(expression, {display, em:16, ex:8, containerWidth:760});
    svg = adaptor.outerHTML(adaptor.firstChild(node));
    if (/data-mjx-error|<merror/.test(svg)) throw new Error('MathJax error output');
    svg = svg.replace(/currentColor/g, '#17212b');
    fs.writeFileSync(file, svg+'\n');
  } catch(e) { errors.push({source,expression,error:e.message}); return `<strong class="math-error">${escape(original)}</strong>`; }
  const width = Number(svg.match(/width="([\d.]+)ex"/)?.[1] || 20);
  const height = Number(svg.match(/height="([\d.]+)ex"/)?.[1] || 2);
  const align = svg.match(/vertical-align: ([^;" ]+)/)?.[1] || '0';
  inventory.push({source,original,tex:expression,display,file,widthEx:width,heightEx:height});
  const img = `<img class="math-image" src="${file}" alt="${escape(original)}" width="${Math.ceil(width*8)}" height="${Math.ceil(height*8)}" style="width:${width}ex;height:auto;vertical-align:${align}" decoding="sync">`;
  return display ? `<div class="math-display">${img}</div>` : img;
}
const greek = ['Gamma','Delta','Theta','Sigma','Omega','Phi','Xi','Pi','alpha','beta','gamma','delta','eta','theta','lambda','mu','nu','xi','pi','rho','sigma','tau'];
const unicode = {'→':'\\to ','⇒':'\\Rightarrow ','∈':'\\in ','∝':'\\propto ','≤':'\\le ','≥':'\\ge ','−':'-','×':'\\times ','∅':'\\varnothing ','∫':'\\int ','∞':'\\infty ','Δ':'\\Delta ','Ω':'\\Omega ','ξ':'\\xi ','λ':'\\lambda ','τ':'\\tau ','ν':'\\nu ','π':'\\pi '};
function codeIsMath(s) {
  if (/\.(md|py|json|csv|txt|zip|xlsx)|Evidence\/|Archive\/|^[a-f0-9]{32,}$|^[A-Z][A-Z0-9_:-]{4,}$/.test(s)) return false;
  if (/^[A-Z_]+: |^[a-z]+_[a-z_]+(?:\(\))?$|^[\w_]+: |^Pred_|^(?:ftol|gtol|maxiter|maxls|comparator_accessed|terminal_status)|native complete|resolved pair structure|legacy observable|current relational|compact support|^Z, N_low/.test(s)) return false;
  return /[=<>∝≤≥∈ΔΩτλ]|->|\\|\^|\b(?:argmax|arg max|Delta|Gamma|Phi|Xi|mathcal|mathfrak)\b|^[A-Za-z]+_[A-Za-z0-9{]|^[A-Z]\*|^[A-Z]\[|^[A-Z]\(|^[A-Za-z]\//.test(s);
}
function codeTex(s) {
  // Typographic conversion only: no formula simplification or evaluation.
  s = s.replace(/(?<!\\)\bmathcal ([A-Za-z])/g,'\\mathcal{$1}').replace(/(?<!\\)\bmathfrak ([A-Za-z])/g,'\\mathfrak{$1}');
  s = s.replace(/arg max|argmax/g,'\\operatorname{argmax}').replace(/->/g,'\\to ').replace(/>=/g,'\\ge ').replace(/<=/g,'\\le ');
  s = s.replace(/[→⇒∈∝≤≥−×∅∫∞ΔΩξλτνπ]/g,c=>unicode[c]);
  s = s.replace(/(?<![A-Za-z\\])(?:Gamma|Delta|Theta|Sigma|Omega|Phi|Xi|Pi|alpha|beta|gamma|delta|eta|theta|lambda|mu|nu|xi|pi|rho|sigma|tau)(?![a-z])/g,v=>'\\'+v+' ');
  s = s.replace(/(?<!\\)\b(?:sum|integral|cap)(?=\b|_)/g,v=>({sum:'\\sum',integral:'\\int',cap:'\\cap'}[v]));
  s = s.replace(/sqrt\(([^()]*)\)/g,'\\sqrt{$1}');
  s = s.replace(/\b(?:mean|exp|ln|log10)\b/g, v=>'\\operatorname{'+v+'}');
  s = s.replace(/(?<!\\)\bin\b/g,'\\in ');
  s = s.replace(/_\(([^)]+)\)/g,'_{$1}').replace(/\^\(([^)]+)\)/g,'^{$1}');
  s = s.replace(/_([A-Za-z][A-Za-z0-9_-]*)/g,(_,v)=>v.length===1?'_{'+v+'}':'_{\\mathrm{'+v.replace(/_/g,'\\_')+'}}');
  s = s.replace(/\^([A-Za-z]{2,})/g,'^{\\mathrm{$1}}');
  s = s.replace(/\bsame\b/g,'\\text{same}').replace(/\bfreeze\b/g,'\\text{freeze}');
  return s;
}
const md = new MarkdownIt({html:true, breaks:false, typographer:false});
md.renderer.rules.code_inline = (tokens,i) => {
  const s = tokens[i].content;
  return codeIsMath(s) ? image(codeTex(s),false,s) : '<code>'+escape(s)+'</code>';
};
function render(content) {
  const slots=[];
  // Protect fenced code before math extraction; mathematical delimiters survive Markdown.
  const fences=[];
  content=content.replace(/^```([a-zA-Z]+)[^\n]*\n([\s\S]*?)^```\s*$/gm,(whole,lang,body)=> {
    // Mathematical examples were also stored as text fences in the source.
    const lines=body.trim().split(/\r?\n/);
    const pureMath=lang==='text' && lines.every(l=>!l.trim() || (codeIsMath(l.trim()) && !/[a-z]{4,} [a-z]{4,}/.test(l))) && !body.includes(':');
    if(pureMath) {
      const expression=lines.map(l=>codeTex(l.trim())).join(' \\\\ ');
      return `\n\nMATHPLACEHOLDER${slots.push(image('\\begin{gathered}'+expression+'\\end{gathered}',true,body.trim()))-1}END\n\n`;
    }
    return `FENCEPLACEHOLDER${fences.push(whole)-1}END`;
  });
  // One orphan closing fence in the technical source otherwise swallows later chapters.
  content=content.replace(/^```\s*$/gm,'');
  content=content.replace(/\\\[([\s\S]*?)\\\]|\$\$([\s\S]*?)\$\$|\\\(([\s\S]*?)\\\)|(?<![\\$])\$([^$\n]+)\$(?!\$)/g,(match,a,b,c,d)=> {
    const display=a!==undefined||b!==undefined;
    let expression=(a??b??c??d).trim();
    if(expression.includes('\u0008oxed')) {
      expression=expression.replace(/\u0008oxed/g,'\\boxed').replace(/\text\{/g,'\\text{')
        .replace(/\r?\not(?=\\Rightarrow)/g,'\\not').replace(/\r?\norall /g,'\\forall ');
    }
    // The Critical Reader source has six closing delimiters for five opening
    // delimiters in this one nested Closure expression. Remove only the extra.
    if (source==='06_CONTINUUM_CRITICAL_READER_GUIDE.md' && expression.includes('\\mathrm{Closure}_{SEAM}(X)')) {
      expression=expression.replace(/(\\right\)){6}/,'\\right)\\right)\\right)\\right)\\right)');
    }
    const n=slots.push(image(expression,display))-1;
    return display?`\n\nMATHPLACEHOLDER${n}END\n\n`:`MATHPLACEHOLDER${n}END`;
  });
  content=content.replace(/FENCEPLACEHOLDER(\d+)END/g,(_,i)=>fences[i]);
  return md.render(content).replace(/<p>MATHPLACEHOLDER(\d+)END<\/p>/g,(_,i)=>slots[i]).replace(/MATHPLACEHOLDER(\d+)END/g,(_,i)=>slots[i]);
}
const docs = [
 ['00_README','00-overview','Release overview'],
 ['01_CONTINUUM_CANONICAL_CHARTER','01-canonical-charter','Canonical Charter'],
 ['02_CONTINUUM_TECHNICAL_FOUNDATIONS','02-technical-foundations','Technical Foundations'],
 ['03_CONTINUUM_ENGINE_AND_VALIDATION_PROTOCOL','03-engine-validation','Engine and Validation'],
 ['04_CONTINUUM_CLOSURE_AND_STANDING_MATRIX','04-closure-standing','Closure and Standing'],
 ['05_CONTINUUM_EVIDENCE_AND_VERIFICATION_RECORD','05-evidence-record','Evidence Record'],
 ['06_CONTINUUM_CRITICAL_READER_GUIDE','06-critical-reader','Critical Reader Guide'],
 ['07_CONTINUUM_PHASE_BY_PHASE_EXECUTION_GUIDE','07-phase-execution','Phase Execution Guide'],
 ['PROBLEM_SOLVING_CORRESPONDENCE','problem-solving-correspondence','Problem-Solving Correspondence'],
 ['CURRENT_STANDING','current-standing','Current Standing'],
 ['CONTRIBUTING','contributing','Contribution and Review Guide']
];
// Keep the established document shell, navigation, and styling.
let template = fs.readFileSync('01-canonical-charter.html','utf8');
template=template.replace(/\s*<script src="[^"]*MathJax[^\"]*"><\/script>/gi,'');
const css = fs.readFileSync('scripts/math.css','utf8');
template=template.replace(/<style id="formula-styles">[\s\S]*?<\/style>/g,'').replace('</head>',`<style id="formula-styles">${css}</style>\n</head>`);
const manifest=[];
for(const [base,page,title] of docs) {
  source=base+'.md';
  const start=inventory.length;
  const body=render(fs.readFileSync(source,'utf8'));
  let html=template.replace(/<title>[\s\S]*?<\/title>/,`<title>${title} — Continuum Paradigm</title>`)
    .replace(/<meta name="description"[^>]+>/,`<meta name="description" content="The Continuum Paradigm: ${title}">`)
    .replace(/<h1>[\s\S]*?<\/h1>/,`<h1>${title}</h1>`)
    .replace(/<main>[\s\S]*?<\/main>/,`<main>\n${body}\n</main>`)
    .replace(/pdfs\/01_CONTINUUM_CANONICAL_CHARTER.pdf/g,`pdfs/${base}.pdf`)
    .replace(/href="01_CONTINUUM_CANONICAL_CHARTER.md"/g,`href="${base}.md"`);
  if(!fs.existsSync(`pdfs/${base}.pdf`)) html=html.replace(/\s*<a href="pdfs\/[^" ]+" download>.*?<\/a>/,'');
  if(page==='problem-solving-correspondence') html=html.replace('</head>',fs.readFileSync('scripts/correspondence-metadata.html','utf8')+'\n</head>');
  fs.writeFileSync(page+'.html',html);
  manifest.push({source,page:page+'.html',pdf:fs.existsSync(`pdfs/${base}.pdf`)?`pdfs/${base}.pdf`:null,formulas:inventory.length-start});
}
source='index.html';
let index=fs.readFileSync('index.html','utf8');
const selection=image('C^*=\\underset{C\\in\\mathcal A}{\\arg\\max}\\;S[C]',true);
index=index.replace(/<div class="(?:formula|math-display)"[\s\S]*?<\/div>/,selection)
 .replace(/href="CURRENT_STANDING.md"/g,'href="current-standing.html"').replace(/href="CONTRIBUTING.md"/g,'href="contributing.html"')
 .replace(/<style id="formula-styles">[\s\S]*?<\/style>/g,'').replace('</head>',`<style id="formula-styles">${css}</style>\n</head>`);
fs.writeFileSync('index.html',index);
fs.writeFileSync('assets/formulas/manifest.json',JSON.stringify(inventory,null,2)+'\n');
const used=new Set(inventory.map(x=>path.basename(x.file)));
for(const file of fs.readdirSync('assets/formulas')) if(/^[a-f0-9]{20}\.svg$/.test(file)&&!used.has(file)) fs.unlinkSync(path.join(root,'assets/formulas',file));
fs.writeFileSync('tmp/documents.json',JSON.stringify(manifest,null,2));
fs.writeFileSync('tmp/math-errors.json',JSON.stringify(errors,null,2));
console.log(JSON.stringify({documents:manifest,formulaOccurrences:inventory.length,uniqueImages:new Set(inventory.map(x=>x.file)).size,errors},null,2));
if(errors.length) process.exitCode=1;
