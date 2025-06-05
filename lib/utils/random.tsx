// Hash string seed into a 32-bit integer
function hashSeed(seed: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Improved PRNG using Mulberry32
function seededRandomGenerator(seed: string): () => number {
  let a = hashSeed(seed);
  return function (): number {
    a |= 0;
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= (t + Math.imul(t ^ (t >>> 7), 61 | t));
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


// Shuffle an array deterministically based on a seed
export function shuffleArray<T>(array: T[], seed: string): T[] {
  const random = seededRandomGenerator(seed);
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
