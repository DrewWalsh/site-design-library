import type { Design } from './data';

const normalize = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const stopWords = new Set([
  'a',
  'an',
  'the',
  'for',
  'and',
  'with',
  'based',
  'driven',
  'website',
  'site',
]);

export function matchesSearch(design: Design, query: string) {
  const discovery = design.discovery;
  const text = normalize(
    [
      design.id,
      design.name,
      design.thesis,
      design.family,
      design.brief,
      ...design.suitableFor,
      ...design.definingFeatures,
      ...design.patterns,
      ...discovery.industries,
      ...discovery.visitorGoals,
      ...discovery.conversionActions,
      discovery.siteSize,
      ...discovery.interactionTypes,
      ...discovery.keywords,
    ].join(' '),
  );
  const terms = normalize(query)
    .split(/\s+/)
    .filter((term) => term && !stopWords.has(term));
  return terms.every((term) => text.includes(term));
}
