const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
process.chdir(path.resolve(__dirname,'..'));
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 const results=[];
 for(const doc of JSON.parse(fs.readFileSync('tmp/documents.json','utf8'))){
  await page.goto(pathToFileURL(path.resolve(doc.page)).href,{waitUntil:'load'});
  await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
  const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));
  if(broken.length) throw new Error(JSON.stringify(broken));
  await page.screenshot({path:`tmp/${doc.page}.png`,fullPage:false});
  if(await page.locator('.math-display').count()) {
    await page.locator('.math-display').first().scrollIntoViewIfNeeded();
    await page.screenshot({path:`tmp/${doc.page}.math.png`});
  }
  const lowContrast=await page.evaluate(()=>{
    function lum(c){const a=c.match(/[\d.]+/g).slice(0,3).map(v=>{v=Number(v)/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return .2126*a[0]+.7152*a[1]+.0722*a[2]}
    const fails=[];
    for(const el of document.querySelectorAll('main code, main pre, main blockquote, main th, main td')){
      if(!el.textContent.trim())continue;
      const fg=getComputedStyle(el).color;let p=el,bg;
      while(p){bg=getComputedStyle(p).backgroundColor;if(bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent')break;p=p.parentElement;}
      bg=p?bg:'rgb(255,255,255)'; const a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
      if(ratio<4.5)fails.push({text:el.textContent.slice(0,70),fg,bg,ratio});
    }return fails;
  });
  if(doc.pdf) await page.pdf({path:doc.pdf,printBackground:true,preferCSSPageSize:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="font:8px Arial;width:100%;text-align:center;color:#536273">Continuum Paradigm · <span class="pageNumber"></span> / <span class="totalPages"></span></div>'});
  await page.setViewportSize({width:390,height:844});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  await page.setViewportSize({width:1280,height:900});
  results.push({...doc,brokenImages:broken.length,mobilePageOverflow:overflow,lowContrast});
  if(lowContrast.length) throw new Error('Low contrast: '+JSON.stringify(lowContrast));
  console.log(doc.page,doc.pdf||'',overflow?'MOBILE OVERFLOW':'OK');
 }
 fs.writeFileSync('tmp/render-report.json',JSON.stringify(results,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
