'use client';

import { ProductCard } from "@/components/ProductCard/ProductCard";

export default function HomePage() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(3, auto)', // Two rows
        gridAutoFlow: 'column',              // Fill by rows first, then move to next column
        gap: '2rem',
        justifyItems: 'start',
      }}
    >
      <ProductCard jsonPath="../image_test_raw.json" />
      <ProductCard jsonPath="../image_test_2.json" />
      <ProductCard jsonPath="../image_test_3.json" />
      <ProductCard jsonPath="../image_test_4.json" />
      <ProductCard jsonPath="../image_test_5.json" />
      <ProductCard jsonPath="../image_test_6.json" />
      <ProductCard jsonPath="../image_test_7.json" />
      <ProductCard jsonPath="../image_test_8.json" />
      <ProductCard jsonPath="../image_test_9.json" />
      <ProductCard jsonPath="../image_test_10.json" />
      <ProductCard jsonPath="../image_test_11.json" />
      <ProductCard jsonPath="../image_test_12.json" />
    </div>
  );
}
