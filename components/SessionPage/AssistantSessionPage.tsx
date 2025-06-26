'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Box, Button, Title } from '@mantine/core';
import { GRAYSCALE, PATH_MAP, ROLES, THUMB_COUNT } from '@/app/constants';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import { ProductInfoComponent } from '@/components/ProductGrid/ProductInfo';
import { shuffleArray } from '@/lib/utils/random';
import classes from './AssistantSessionPage.module.css';

export default function AssistantSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('cat') || '';
  const sequence = searchParams.get('seq') || '';
  const session = searchParams.get('sess') || '';
  const currentIndex = Number(searchParams.get('idx')) || 0;
  const baseQuery = `?seq=${sequence}&sess=${session}`;

  const productJsonPaths = PATH_MAP[category];

  const getRoute = (category: string, index: number) =>
    `/${ROLES.assistant}${baseQuery}&idx=${index}&cat=${category}`;

  const goTo = (index: number) => {
    const category = sequence[index];
    if (category) {
      router.push(getRoute(category, index));
    }
  };

  return (
    <Box>
      <Box className={classes.navigationRow}>
        <Button
          variant="light"
          onClick={() => (currentIndex > 0 ? goTo(currentIndex - 1) : router.push('/'))}
          className={classes.backButton}
          leftSection={<ArrowLeft size={16} />}
        >
          {currentIndex > 0
            ? sequence[currentIndex - 1] === 't'
              ? 'Back to Tutorial'
              : `Back to Category ${sequence[currentIndex - 1].toUpperCase()}`
            : 'Back to Homepage'}
        </Button>

        {currentIndex >= 0 && currentIndex < sequence.length - 1 && (
          <Button
            variant="light"
            onClick={() => goTo(currentIndex + 1)}
            className={classes.nextButton}
            rightSection={<ArrowRight size={16} />}
          >
            Go to Category {sequence[currentIndex + 1].toUpperCase()}
          </Button>
        )}
      </Box>

      <ProductGrid
        cols={2}
        productJsonPaths={shuffleArray(productJsonPaths, session)}
        grayscale={GRAYSCALE}
        thumbCount={THUMB_COUNT}
        InfoComponent={(path) => <ProductInfoComponent path={path} />}
      />

      <Title order={5} c="dimmed" className={classes.sessionCode}>
        Session code: {category + session}
      </Title>
    </Box>
  );
}
