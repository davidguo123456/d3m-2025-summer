'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Box, Button, Title } from '@mantine/core';
import { GRAYSCALE, ROLES, THUMB_COUNT } from '@/app/constants';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import classes from './SeekerSessionPage.module.css';

type SeekerSessionPageProps = {
  category: string;
  sessionCode: string;
  productJsonPaths: string[];
};

export default function SeekerSessionPage({
  category,
  sessionCode,
  productJsonPaths,
}: SeekerSessionPageProps) {
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
            ? `Back to Category ${sequence[currentIndex - 1].toUpperCase()}`
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
        productJsonPaths={productJsonPaths}
        grayscale={GRAYSCALE}
        thumbCount={THUMB_COUNT}
      />

      <Title order={5} c="dimmed" className={classes.sessionCode}>
        Session: {sessionCode}
      </Title>
    </Box>
  );
}
