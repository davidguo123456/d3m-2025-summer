'use client';

import AssistantSessionPage from '@/components/AssistantSessionPage/AssistantSessionPage';

const productJsonPaths = [
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_1.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_2.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_3.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_4.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_5.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_6.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_7.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_8.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_9.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_10.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_11.json',
  'https://davidguo123456.github.io/d3m-2025-summer/shoes_test_12.json',
];

export default function Page() {
  return <AssistantSessionPage sessionCode="a000" productJsonPaths={productJsonPaths} />;
}
