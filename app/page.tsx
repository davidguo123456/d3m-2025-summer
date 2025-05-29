'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { Switch } from '@mantine/core';
import classes from './page.module.css';

export default function HomePage() {
  const [thumbCount, setThumbCount] = useState<number>(8);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const productJsonPaths = [
    '../image_test_raw.json',
    '../image_test_2.json',
    '../image_test_3.json',
    '../image_test_4.json',
    '../image_test_5.json',
    '../image_test_6.json',
    '../image_test_7.json',
    '../image_test_8.json',
    '../image_test_9.json',
    '../image_test_10.json',
    '../image_test_11.json',
    '../image_test_12.json',
  ];

  // Show loading overlay for 1 second whenever grayscale changes
  useEffect(() => {
    setShowOverlay(true);
    const timeout = setTimeout(() => setShowOverlay(false), 1200);
    return () => clearTimeout(timeout);
  }, [grayscale]);

  return (
    <div style={{ padding: '1rem' }}>
      {showOverlay && (
        <div className={classes.fullScreenOverlay}>
          <div className={classes.spinner}/>
        </div>
      )}

      {/* Controls */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
          <ProductCard
            key={index}
            jsonPath={path}
            thumbCount={thumbCount}
            grayscale={grayscale}
          />
        ))}
      </div>
    </div>
  );
}
