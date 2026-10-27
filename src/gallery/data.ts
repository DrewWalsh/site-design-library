import data from '../../catalogue.json';
export interface Design {
  id: string;
  slug: string;
  name: string;
  brand: string;
  family: string;
  status: string;
  thesis: string;
  suitableFor: string[];
  discovery: {
    industries: string[];
    visitorGoals: string[];
    conversionActions: string[];
    siteSize: string;
    interactionTypes: string[];
    keywords: string[];
  };
  patterns: string[];
  character: string;
  traits: {
    composition: string;
    navigation: string;
    typography: string;
    density: string;
    imagery: string;
    surface: string;
    motion: string;
  };
  effort: string;
  definingFeatures: string[];
  entryRoute: string;
  states: { key: string; label: string; route: string }[];
  referenceImages: {
    file: string;
    url: string;
    state: string;
    viewport: { width: number; height: number };
    sourceRevision: string;
    fullPage?: boolean;
  }[];
  sourcePath: string;
  downloadUrl?: string;
  neighbours: string[];
  palette: Record<string, string>;
  fonts: string[];
  brief: string;
  researchSources?: { title: string; url: string }[];
}
export const designs = (data as unknown as Design[]).map((design) => ({
  ...design,
  referenceImages: design.referenceImages.map((image) => ({
    ...image,
    url: import.meta.env.VITE_LOCAL_REFERENCES === '1' ? image.file : image.url,
  })),
}));
export const repository = 'https://github.com/DrewWalsh/site-design-library';
export const site = 'https://drew-site-design-library.netlify.app';
export const families = [
  'Clarity & editorial',
  'Workspaces & discovery',
  'Commerce & places',
  'Playful & material',
  'Retro & experimental',
  'Small business',
  'Community & institutions',
];
export function thumbnail(d: Design) {
  return (
    d.referenceImages.find((r: any) => r.state === 'start' && r.viewport.width === 1440)?.url || ''
  );
}
export function downloadUrl(d: Design) {
  return d.downloadUrl || `/downloads/${d.id}-${d.slug}.zip`;
}
export function makePrompt(d: Design, scope: string, secondary: string) {
  const base = `${site}/references/${d.id}-${d.slug}`;
  return `Use Site Design Library ${d.id}, ${d.name}, as the primary design direction for ${scope || 'one representative page and its supporting states'}.\n\nComplete ZIP: ${site}${downloadUrl(d)}\nLive sample: ${site}${d.entryRoute}\nDesign brief: ${base}/DESIGN.md\nTokens: ${base}/tokens.css\nSource: ${base}/Demo.vue\nReference images and metadata: ${base}/design.json\n\nPublic repository: ${repository}. No account is required. The ZIP contains a runnable reference, source, local assets, screenshots, specifications and CODEX_PROMPT.md. Read LICENSE and THIRD_PARTY.md; original work is MIT, with separate font/photo terms. In a local clone, read ${d.sourcePath}/DESIGN.md and tokens.css; inspect the reference images listed in design.json and study ${d.sourcePath}/Demo.vue.\n\nPreserve:\n${d.definingFeatures
    .slice(0, 3)
    .map((x: string) => '- ' + x)
    .join(
      '\n',
    )}\n\n${secondary ? 'Secondary influence: ' + secondary + '. Borrow only its relevant interaction or detail; keep ' + d.name + ' in charge of the composition.\n\n' : ''}Adapt to the destination’s existing framework, content, routes, and working user tasks. Begin with one representative route, make the phone layout deliberate, then apply the approved direction across the requested scope. Explain material departures from the reference. Do not copy fictional brand claims or sample data.`;
}
