export interface ShareHead {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  card?: 'summary' | 'summary_large_image';
}

export function readShareHead(html: string): { titles: string[]; meta: Record<string, string[]>; links: Record<string, string>[] };
export function renderShareHead(html: string, metadata: ShareHead): string;
export function emitSharePages(directory: string, pages: (ShareHead & { path: string; outputPath?: string })[], templateFile?: string): Promise<number>;
