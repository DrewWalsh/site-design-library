/** Reusable deterministic ZIP adapter; also maintained in codex-utility-scripts/node. */
export function createDeterministicZip(entries, zipSync) {
  const files = Object.create(null);
  const seen = new Set();
  for (const entry of entries) {
    const name = entry.path;
    if (
      typeof name !== 'string' ||
      !name ||
      name.includes('\\') ||
      name.startsWith('/') ||
      /[\x00-\x1f<>:"|?*]/.test(name)
    )
      throw new Error(`Unsafe ZIP path: ${name}`);
    const parts = name.split('/');
    if (
      parts.some(
        (p) =>
          !p ||
          p === '.' ||
          p === '..' ||
          /[. ]$/.test(p) ||
          /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(p),
      )
    )
      throw new Error(`Unsafe ZIP path: ${name}`);
    const key = name.toLowerCase();
    if (seen.has(key)) throw new Error(`Duplicate ZIP path: ${name}`);
    seen.add(key);
    const bytes =
      typeof entry.data === 'string' ? new TextEncoder().encode(entry.data) : entry.data;
    if (!(bytes instanceof Uint8Array)) throw new Error(`Invalid ZIP content: ${name}`);
    files[name] = [
      bytes,
      {
        level: /\.(?:jpg|jpeg|png|webp|woff2|zip)$/i.test(name) ? 0 : 6,
        mtime: new Date(2000, 0, 1),
      },
    ];
  }
  const ordered = Object.fromEntries(
    Object.keys(files)
      .sort()
      .map((key) => [key, files[key]]),
  );
  return zipSync(ordered);
}
