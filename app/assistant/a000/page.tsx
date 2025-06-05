'use client';

import AssistantSessionPage from '@/components/AssistantSessionPage/AssistantSessionPage';

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
  return <AssistantSessionPage sessionCode="a000" productJsonPaths={productJsonPaths} />;
}
