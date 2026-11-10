// Maintained copy of DrewWalsh/codex-utility-scripts/vue/share-head.mjs.
// Static metadata shared by build-time emitters and the read-only preview probe.
import { lstat, mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const decode = value => value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (whole, code) => {
  if (code[0] !== '#') return ({ amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' })[code.toLowerCase()];
  const number = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : Number(code.slice(1));
  return number > 0 && number <= 0x10ffff ? String.fromCodePoint(number) : whole;
});
const tokenPattern = /<!--[\s\S]*?-->|<(script|style|template|noscript)\b[^>]*>[\s\S]*?<\/\1\s*>|<title\b[^>]*>[\s\S]*?<\/title\s*>|<(?:meta|link)\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(([, key, a, b, c]) => [key.toLowerCase(), decode(a ?? b ?? c)]));
}

export function readShareHead(html) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1];
  if (head === undefined) throw new Error('Initial HTML has no head');
  const titles = [], meta = {}, links = [];
  for (const [tag] of head.matchAll(tokenPattern)) {
    if (/^<title\b/i.test(tag)) titles.push(decode(tag.replace(/^<title\b[^>]*>|<\/title\s*>$/gi, '').trim()));
    if (/^<meta\b/i.test(tag)) {
      const attrs = attributes(tag), key = (attrs.property ?? attrs.name)?.toLowerCase();
      if (key) (meta[key] ??= []).push(attrs.content ?? '');
    }
    if (/^<link\b/i.test(tag)) links.push(attributes(tag));
  }
  return { titles, meta, links };
}

export function renderShareHead(html, { title, description, url, image, imageAlt, imageWidth, imageHeight, imageType, card = 'summary_large_image' }) {
  for (const value of [title, description, url]) if (typeof value !== 'string' || !value.trim()) throw new Error('Title, description and absolute HTTPS URL are required');
  for (const value of [url, image].filter(Boolean)) {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error('Public metadata URLs must use HTTPS without credentials');
  }
  const values = { description, 'og:title': title, 'og:description': description, 'og:type': 'website', 'og:url': url, 'twitter:title': title, 'twitter:description': description };
  if (image) Object.assign(values, {
    'og:image': image, 'og:image:alt': imageAlt ?? title,
    'og:image:width': imageWidth, 'og:image:height': imageHeight, 'og:image:type': imageType,
    'twitter:image': image, 'twitter:image:alt': imageAlt ?? title, 'twitter:card': card,
  });
  let found = false;
  const rendered = html.replace(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i, (whole, head) => {
    found = true;
    const cleaned = head.replace(tokenPattern, tag => {
      if (/^<title\b/i.test(tag)) return '';
      if (/^<meta\b/i.test(tag)) {
        const attrs = attributes(tag);
        if (Object.hasOwn(values, (attrs.property ?? attrs.name)?.toLowerCase() ?? '')) return '';
      }
      if (/^<link\b/i.test(tag) && attributes(tag).rel?.toLowerCase() === 'canonical') return '';
      return tag;
    });
    const tags = Object.entries(values).filter(([, value]) => value !== undefined)
      .map(([key, value]) => `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}">`);
    return whole.replace(head, () => cleaned + `\n<title>${escape(title)}</title>\n<link rel="canonical" href="${escape(url)}">\n` + tags.join('\n') + '\n');
  });
  if (!found) throw new Error('Initial HTML has no head');
  return rendered;
}

export async function emitSharePages(directory, pages, templateFile = 'index.html') {
  const root = await realpath(directory);
  if (!/^[\w-]+\.html$/.test(templateFile)) throw new Error('Expected an HTML template in the build root');
  const template = await readFile(resolve(root, templateFile), 'utf8');
  const paths = new Set();
  for (const page of pages) {
    const output = page.outputPath ?? page.path;
    if (typeof output !== 'string' || !/^\/(?:[A-Za-z0-9._~-]+\/)*[A-Za-z0-9._~-]*$/.test(output) || output.split('/').some(part => part === '.' || part === '..') || paths.has(output)) throw new Error('Invalid or duplicate public page path');
    paths.add(output);
    const target = resolve(root, '.' + output, 'index.html');
    if (!target.startsWith(root + sep)) throw new Error('Public page path leaves the build');
    const content = renderShareHead(template, page);
    await mkdir(dirname(target), { recursive: true });
    if (await realpath(dirname(target)) !== dirname(target) || (await lstat(target).catch(error => { if (error.code !== 'ENOENT') throw error; }))?.isSymbolicLink()) throw new Error('Public page path cannot follow a symlink');
    await writeFile(target, content);
  }
  return paths.size;
}
