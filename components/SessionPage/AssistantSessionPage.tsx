'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Box, Button, Title } from '@mantine/core';
import { GRAYSCALE, ROLES, THUMB_COUNT } from '@/app/constants';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import { ProductInfoComponent } from '@/components/ProductGrid/ProductInfo';
import classes from './AssistantSessionPage.module.css';

type AssistantSessionPageProps = {
  category: string;
  sessionCode: string;
  productJsonPaths: string[];
};

export default function AssistantSessionPage({
  category,
  sessionCode,
  productJsonPaths,
}: AssistantSessionPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sequence = searchParams.get('seq') || '';
  const currentIndex = sequence.indexOf(category);
  const urlSuffix = sessionCode.slice(1); // everything but the first letter
  const baseQuery = `?seq=${sequence}`;

  const getRoute = (letter: string) => `/${ROLES.seeker}/${letter}${urlSuffix}${baseQuery}`;

  const goTo = (index: number) => {
    const letter = sequence[index];
    if (letter) {
      router.push(getRoute(letter));
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
            ? `Back to ${sequence[currentIndex - 1].toUpperCase()}${urlSuffix}`
            : 'Back to Homepage'}
        </Button>

        {currentIndex >= 0 && currentIndex < sequence.length - 1 && (
          <Button
            variant="light"
            onClick={() => goTo(currentIndex + 1)}
            className={classes.nextButton}
            rightSection={<ArrowRight size={16} />}
          >
            Next Category: {sequence[currentIndex + 1].toUpperCase()}
          </Button>
        )}
      </Box>

      <ProductGrid
        cols={2}
        productJsonPaths={productJsonPaths}
        grayscale={GRAYSCALE}
        thumbCount={THUMB_COUNT}
        InfoComponent={(path) => <ProductInfoComponent path={path} />}
      />

      <Title order={5} c="dimmed" className={classes.sessionCode}>
        Session code: {sessionCode}
      </Title>
    </Box>
  );
}
