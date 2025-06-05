'use client';

import SeekerSessionPage from '@/components/SeekerSessionPage/SeekerSessionPage';

const productJsonPaths = [
  'https://davidguo123456.github.io/d3m-2025-summer/outer_1.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_2.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_3.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_1.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_2.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_3.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_1.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_2.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_3.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_1.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_2.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_3.json',
];

export default function Page() {
  return <SeekerSessionPage sessionCode="a000" productJsonPaths={productJsonPaths} />;
}
