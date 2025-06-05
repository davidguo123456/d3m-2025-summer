// Converts a string seed to a 32-bit unsigned integer hash
function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
    h |= 0; // Convert to 32-bit signed integer
  }
  return h >>> 0; // Convert to unsigned
}

// Returns a seeded pseudo-random number generator (0 <= x < 1)
function seededRandomGenerator(seed: string): () => number {
  let x = hashSeed(seed);
  return function (): number {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
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
  if (array === result) console.log('didnt work')
  return result;
}
