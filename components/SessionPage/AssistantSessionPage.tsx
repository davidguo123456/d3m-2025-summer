'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Box, Button, Title } from '@mantine/core';
import { GRAYSCALE, ROLES, THUMB_COUNT } from '@/app/constants';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import { ProductInfoComponent } from '@/components/ProductGrid/ProductInfo';
import classes from './AssistantSessionPage.module.css';

type AssistantSessionPageProps = {
  sessionCode: string;
  productJsonPaths: string[];
};

export default function AssistantSessionPage({
  sessionCode,
  productJsonPaths,
}: AssistantSessionPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sequence = searchParams.get('seq') || '';
  const session = searchParams.get('sess') || '';
  const currentIndex = Number(searchParams.get('idx')) || 0;
  const baseQuery = `?seq=${sequence}&sess=${session}`;

  const getRoute = (letter: string, index: number) =>
    `/${ROLES.assistant}/${letter}${session}${baseQuery}&idx=${index}`;

  const goTo = (index: number) => {
    const letter = sequence[index];
    if (letter) {
      if (letter === 't') {
        router.push(`/${ROLES.assistant}/tutorial${baseQuery}&idx=${0}`);
      } else {
        router.push(getRoute(letter, index));
      }
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
