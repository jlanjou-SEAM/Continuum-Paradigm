# Publication rendering

This is an editorial presentation build. Canonical Markdown, scientific claims,
execution contracts, evidence, archive downloads, and package seals are unchanged.

Install with `pnpm install --frozen-lockfile`, then run `pnpm build`.
PDF generation requires installed Google Chrome; set `BROWSER_CHANNEL=msedge`
to use Microsoft Edge instead. Both browsers run headlessly.

`build-docs.cjs` reads canonical Markdown and produces document HTML plus local,
self-contained MathJax SVG images. No browser-side MathJax or CDN is required.
The formula manifest records original notation, rendered TeX, source document,
and image path. Images include original notation as alternative text.
Code identifiers and executable snippets remain code; recognized mathematical
code spans and mathematical text fences receive typographic rendering.

Presentation repairs are confined to rendering: one orphan closing fence in
Technical Foundations, two formulas with corrupted `boxed`/`text`/`not`/`forall`
characters, and one extra closing delimiter in the Critical Reader's nested
Closure expression. Long relation chains and prose labels wrap without changing
their order. The Markdown downloads retain their original bytes.

`render-pdfs.cjs` generates the eight existing PDF downloads from the same HTML,
checks image loading, audits box text contrast (4.5:1 minimum), and records mobile
overflow. Screenshots and reports are written to ignored `tmp/`.

Formula boxes, code blocks, callouts, and tables use explicit dark foregrounds
on light backgrounds. Print styles retain the same contrast and fit equations
to the page. Review rendered PDF pages visually before publishing.
