'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Title } from '@mantine/core';
import { GRAYSCALE, PATH_MAP, ROLES, THUMB_COUNT } from '@/app/constants';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import { shuffleArray } from '@/lib/utils/random';
import NavigationRow from './NavigationRow';
import classes from './SeekerSessionPage.module.css';

export default function SeekerSessionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('cat') || '';
  const sequence = searchParams.get('seq') || '';
  const session = searchParams.get('sess') || '';
  const flip = Number(searchParams.get('flip')) || 0;
  const currentIndex = Number(searchParams.get('idx')) || 0;
  const baseQuery = `?flip=${flip}&seq=${sequence}&sess=${session}`;
  const seed = category + (currentIndex % 2 !== 0 ? session.slice(0, 3) : session.slice(3, 6));
  const sessionCode = currentIndex !== 0 ? seed : 'tutorial';

  const productJsonPaths = PATH_MAP[category];

  const getRoute = (category: string, index: number) =>
    `/${ROLES.seeker}${baseQuery}&idx=${index}&cat=${category}`;

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
        flip={flip}
        goTo={goTo}
      />

      <ProductGrid
        productJsonPaths={shuffleArray(productJsonPaths, seed)}
        grayscale={GRAYSCALE}
        thumbCount={THUMB_COUNT}
      />

      <Title order={5} c="dimmed" className={classes.sessionCode}>
        Session code: {sessionCode}
      </Title>
    </Box>
  );
}
