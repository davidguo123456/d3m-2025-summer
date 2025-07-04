'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Box, Button, Title } from '@mantine/core';
import { SCENARIO_NUMBERS } from '@/app/constants';
import classes from './NavigationRow.module.css';

interface NavigationRowProps {
  currentIndex: number;
  sequence: string;
  category: string;
  flip: number;
  goTo: (index: number) => void;
}

export default function NavigationRow({
  currentIndex,
  sequence,
  category,
  flip,
  goTo,
}: NavigationRowProps) {
  const router = useRouter();

  const options = SCENARIO_NUMBERS[category as keyof typeof SCENARIO_NUMBERS];
  const scenarioNumber = options?.[currentIndex % 2 ^ (flip ? 0 : 1)] ?? '';

  return (
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
            : `Back to previous scenario`
          : 'Back to Homepage'}
      </Button>

      <Title order={4} className={classes.categoryTitle}>
        Scenario: {scenarioNumber} | Category: {category.toUpperCase()}
      </Title>

      <Button
        variant="light"
        onClick={() => goTo(currentIndex + 1)}
        className={classes.nextButton}
        rightSection={<ArrowRight size={16} />}
        style={{
          visibility: currentIndex < sequence.length - 1 ? 'visible' : 'hidden',
        }}
      >
        Go to next scenario
      </Button>
    </Box>
  );
}
