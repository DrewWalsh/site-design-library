import fs from 'node:fs';
import path from 'node:path';
const designs = JSON.parse(fs.readFileSync('catalogue.json', 'utf8'));
const site = 'https://drew-site-design-library.netlify.app';
const escape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const template = fs.readFileSync('dist/index.html', 'utf8');
const link = (href: string, label: string) => `<a href="${escape(href)}">${escape(label)}</a>`;
function publish(route: string, title: string, description: string, content: string) {
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?\s*>)/,
      `$1${escape(description)}$2`,
    )
    .replace(
      '</head>',
      `<link rel="canonical" href="${site}${route}" /><link rel="alternate" type="text/plain" href="/llms.txt" title="Agent reference index" /></head>`,
    )
    .replace(
      '<div id="app"></div>',
      `<div id="app"><div class="g-agent-page"><nav aria-label="Library">${link('/', 'Design Library')} · ${link('/guide', 'How to use')} · ${link('/llms.txt', 'Agent index')} · ${link('/LICENSE', 'MIT license')}</nav><main id="main">${content}</main></div></div>`,
    );
  const destination = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
}
const card = (d: any) =>
  `<article><h2>${link(`/designs/${d.id}-${d.slug}`, `${d.id} ${d.name}`)}</h2><p>${escape(d.thesis)}</p><p>${escape(d.discovery.industries.join(' · '))}</p><p>${link(`/downloads/${d.id}-${d.slug}.zip`, 'Download design ZIP')} · ${link(`/references/${d.id}-${d.slug}/DESIGN.md`, 'Read specification')}</p></article>`;
publish(
  '/',
  'Design Library — ' + designs.length + ' ways to make a website',
  `${designs.length} freely reusable website design references with source, screenshots and complete ZIP downloads.`,
  `<h1>${designs.length} different ways to make a website.</h1><p>Working examples, design specifications and complete reference downloads. Free to use and adapt under MIT, with separate notices for third-party assets.</p><p>${link('/catalogue.json', 'Machine-readable catalogue')} · ${link('/AGENT_WORKFLOW.md', 'Coding-model workflow')} · ${link('https://github.com/DrewWalsh/site-design-library', 'Public GitHub repository')}</p><div class="g-agent-grid">${designs.map(card).join('\n')}</div>`,
);
for (const d of designs) {
  const reference = `/references/${d.id}-${d.slug}`;
  const paragraphs = d.brief
    .split(/\n\s*\n/)
    .map((p: string) => `<p>${escape(p).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>`)
    .join('\n');
  publish(
    `/designs/${d.id}-${d.slug}`,
    `${d.id} ${d.name} — Design Library`,
    d.thesis,
    `<p>Design reference ${d.id} · ${escape(d.family)}</p><h1>${escape(d.name)}</h1><p>${escape(d.thesis)}</p><p>${link(`/downloads/${d.id}-${d.slug}.zip`, 'Download design ZIP')} · ${link(d.entryRoute, 'Open interactive specimen')}</p>${d.referenceImages[0] ? `<figure><img src="${escape(d.referenceImages[0].url)}" width="1440" height="1000" alt="${escape(d.name)} desktop reference" /></figure>` : ''}<h2>Design specification</h2>${paragraphs}<h2>Files for a coding model</h2><ul>${['DESIGN.md', 'design.json', 'tokens.css', 'Demo.vue'].map((file) => `<li>${link(`${reference}/${file}`, file)}</li>`).join('')}<li>${link(`/previews/${d.id}/capture.json`, 'Screenshot provenance')}</li></ul><h2>Reference images</h2><ul>${d.referenceImages.map((r: any) => `<li>${link(r.url, `${r.fullPage ? 'Full page' : r.viewport.width === 390 ? 'Phone' : r.state === 'start' ? 'Desktop' : 'Supporting state'} — ${r.viewport.width} × ${r.viewport.height} viewport`)}</li>`).join('')}</ul><h2>Supporting routes</h2><ul>${d.states.map((s: any) => `<li>${link(s.route, s.label)}</li>`).join('')}</ul><h2>Reuse</h2><p>Use and adapt the original code and specifications for personal or commercial work under MIT. Keep applicable font and photo notices. The ZIP includes the complete runnable reference and its local assets.</p><p>${link('/THIRD_PARTY.md', 'Asset notices')} · ${link('/AGENT_WORKFLOW.md', 'Agent instructions')}</p>`,
  );
}
publish(
  '/guide',
  'How to use — Design Library',
  'Download a complete design reference or read the public specifications with a coding model.',
  `<h1>Choose a direction. Make it your own.</h1><ol><li>Choose a reference for the visitor’s task and compare the desktop and phone layouts.</li><li>Download its ZIP and extract it into a folder.</li><li>Give Codex or another coding model that folder, CODEX_PROMPT.md and your actual project request.</li><li>Read DESIGN.md, study the screenshots and adapt the example’s composition, navigation and interaction to your content.</li></ol><p>Each ZIP includes specifications, tokens, source, assets, four reference captures, license notices, a prompt and a runnable Vue/Vite starter. Installing packages needs internet access; rendering the installed example needs no external asset service or account.</p><p>${link('/AGENT_WORKFLOW.md', 'Full workflow')} · ${link('/llms.txt', 'Agent index')} · ${link('/catalogue.json', 'Catalogue JSON')} · ${link('/LICENSE', 'MIT license')} · ${link('/THIRD_PARTY.md', 'Photo and font notices')}</p>`,
);
const introduction = `# Site Design Library\n\n${designs.length} distinct, complete design references. Public source and specifications; no login or API key. Original code and specifications: MIT. Photos/fonts retain their licenses; read THIRD_PARTY.md.\n\nRead a design’s specification and screenshots before adapting its code. Live specimens need JavaScript; the gallery and design pages have complete static HTML for readers and crawlers. ZIPs include editable source, required local assets, screenshots, provenance, an adaptation prompt and a runnable Vue/Vite starter.\n\n- Catalogue: ${site}/catalogue.json\n- Workflow: ${site}/AGENT_WORKFLOW.md\n- Download checksums and sizes: ${site}/downloads/index.json\n- License: ${site}/LICENSE\n- Asset notices: ${site}/THIRD_PARTY.md\n- Source: https://github.com/DrewWalsh/site-design-library\n\n## Designs\n\n`;
fs.writeFileSync(
  'dist/llms.txt',
  introduction +
    designs
      .map(
        (d: any) =>
          `- [${d.id} ${d.name}](${site}/designs/${d.id}-${d.slug}): ${d.thesis}\n  Specification: ${site}/references/${d.id}-${d.slug}/DESIGN.md\n  ZIP: ${site}/downloads/${d.id}-${d.slug}.zip`,
      )
      .join('\n\n') +
    '\n',
);
fs.writeFileSync(
  'dist/llms-full.txt',
  introduction +
    designs
      .map(
        (d: any) =>
          `## ${d.id} ${d.name}\n\n${d.brief}\n\nLive: ${site}${d.entryRoute}\nFiles: ${site}/references/${d.id}-${d.slug}/design.json\nDownload: ${site}/downloads/${d.id}-${d.slug}.zip`,
      )
      .join('\n\n') +
    '\n',
);
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
fs.writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', '/guide', ...designs.map((d: any) => `/designs/${d.id}-${d.slug}`)].map((route) => `<url><loc>${site}${route}</loc></url>`).join('')}</urlset>\n`,
);
for (const file of ['LICENSE', 'THIRD_PARTY.md']) fs.copyFileSync(file, `dist/${file}`);
console.log(
  `Published static HTML for the gallery, guide and ${designs.length} design pages, plus crawler indexes.`,
);
