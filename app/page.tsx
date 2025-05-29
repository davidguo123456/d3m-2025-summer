'use client';

import { useEffect, useState } from 'react';
import { Box, Loader, LoadingOverlay, Overlay, Switch } from '@mantine/core';
import { ProductCard } from '@/components/ProductCard/ProductCard';

export default function HomePage() {
  const [thumbCount, setThumbCount] = useState<number>(8);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const productJsonPaths = [
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_raw.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_2.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_3.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_4.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_5.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_6.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_7.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_8.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_9.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_10.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_11.json',
    'https://davidguo123456.github.io/d3m-2025-summer/image_test_12.json',
  ];

  // Show loading overlay for 1 second when grayscale toggles
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [grayscale]);

  return (
    <Box style={{ position: 'relative', padding: '1rem', minHeight: '100vh' }}>
      {true &&
        <LoadingOverlay visible={loading} overlayProps={{ backgroundOpacity: 0.35, blur: 15 }} />}

      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <label>
          Thumbnails to show:{' '}
          <input
            type="number"
            min={0}
            max={20}
            value={thumbCount}
            onChange={(e) => setThumbCount(Number(e.target.value))}
          />
        </label>

        <Switch
          checked={grayscale}
          onChange={(event) => setGrayscale(event.currentTarget.checked)}
          label="Grayscale"
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, auto)',
          gridAutoFlow: 'column',
          justifyItems: 'start',
        }}
      >
        {productJsonPaths.map((path, index) => (
          <ProductCard key={index} jsonPath={path} thumbCount={thumbCount} grayscale={grayscale} />
        ))}
      </div>
    </Box>
  );
}
