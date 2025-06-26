'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Box, Button, Title } from '@mantine/core';
import classes from './NavigationRow.module.css';

interface NavigationRowProps {
  currentIndex: number;
  sequence: string;
  category: string;
  goTo: (index: number) => void;
}

export default function NavigationRow({
  currentIndex,
  sequence,
  category,
  goTo,
}: NavigationRowProps) {
  const router = useRouter();

  return (
    <Box className={classes.navigationRow}>
      <Button
        variant="light"
        onClick={() => (currentIndex > 0 ? goTo(currentIndex - 1) : router.push('/'))}
        className={classes.backButton}
        leftSection={<ArrowLeft size={16} />}
        style={{ justifyContent: 'flex-start', textAlign: 'left' }}
      >
        {currentIndex > 0
          ? sequence[currentIndex - 1] === 't'
            ? 'Back to Tutorial'
            : `Back to Scenario ${currentIndex - 1}`
          : 'Back to Homepage'}
      </Button>

      <Title
        order={4}
        className={classes.categoryTitle}
        style={{ width: '22ch', textAlign: 'center' }}
      >
        Scenario: {currentIndex} | Category: {category.toUpperCase()}
      </Title>

      <Button
        variant="light"
        onClick={() => goTo(currentIndex + 1)}
        className={classes.nextButton}
        rightSection={<ArrowRight size={16} />}
        style={{
          justifyContent: 'flex-end',
          textAlign: 'right',
          visibility: currentIndex < sequence.length - 1 ? 'visible' : 'hidden',
        }}
      >
        Go to Scenario {currentIndex + 1}
      </Button>
    </Box>
  );
}
