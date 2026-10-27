import type { Zippable } from 'fflate';
export function createDeterministicZip(
  entries: { path: string; data: string | Uint8Array }[],
  zipSync: (data: Zippable) => Uint8Array,
): Uint8Array;
