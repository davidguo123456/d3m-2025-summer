'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Title } from '@mantine/core';
import { GRAYSCALE, PATH_MAP, ROLES, THUMB_COUNT } from '@/app/constants';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import { ProductInfoComponent } from '@/components/ProductGrid/ProductInfo';
import { shuffleArray } from '@/lib/utils/random';
import NavigationRow from './NavigationRow';
import classes from './AssistantSessionPage.module.css';

export default function AssistantSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('cat') || '';
  const sequence = searchParams.get('seq') || '';
  const session = searchParams.get('sess') || '';
  const currentIndex = Number(searchParams.get('idx')) || 0;
  const baseQuery = `?seq=${sequence}&sess=${session}`;
  // eslint-disable-next-line prefer-template
  const seed = category + (currentIndex % 2 !== 0 ? session.slice(0, 3) : session.slice(3, 6));
  const sessionCode = currentIndex !== 0 ? seed : 'tutorial';

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
      <NavigationRow
        currentIndex={currentIndex}
        sequence={sequence}
        category={category}
        goTo={goTo}
      />

      <ProductGrid
        cols={2}
        productJsonPaths={shuffleArray(productJsonPaths, seed)}
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
