'use client';

import AssistantSessionPage from '@/components/AssistantSessionPage/AssistantSessionPage';

const productJsonPaths = [
  'https://davidguo123456.github.io/d3m-2025-summer/outer_1.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_2.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_3.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_4.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_5.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_6.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_7.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_8.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_9.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_10.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_11.json',
  'https://davidguo123456.github.io/d3m-2025-summer/outer_12.json',
];

export default function Page() {
  return <AssistantSessionPage sessionCode="a000" productJsonPaths={productJsonPaths} />;
}
