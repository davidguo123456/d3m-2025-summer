import { ReactNode } from 'react';
import { Box, SimpleGrid } from '@mantine/core';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  cols?: number;
  productJsonPaths: string[];
  thumbCount?: number;
  grayscale?: boolean;
  InfoComponent?: (path: string) => ReactNode;
};

export default function ProductGrid({
  cols = 4,
  productJsonPaths,
  thumbCount = 0,
  grayscale = false,
  InfoComponent,
}: ProductGridProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <SimpleGrid cols={cols} m="md" w="100%">
        {productJsonPaths.map((path, index) => (
          <Box key={index} style={{ display: 'flex' }}>
            <ProductCard
              jsonPath={path}
              thumbCount={thumbCount}
              grayscale={grayscale}
              cardTitle={`Item ${String(index + 1).padStart(2, '0')}`}
            />
            {InfoComponent && InfoComponent(path)}
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
}
