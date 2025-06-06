'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Box, Button, Title } from '@mantine/core';
import { GRAYSCALE, THUMB_COUNT } from '@/app/constants';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import classes from './SeekerSessionPage.module.css';

type SeekerSessionPageProps = {
  sessionCode: string;
  productJsonPaths: string[];
};

export default function SeekerSessionPage({
  sessionCode,
  productJsonPaths,
}: SeekerSessionPageProps) {
  const router = useRouter();

  return (
    <Box>
      <Button
        variant="light"
        onClick={() => router.push('/')}
        className={classes.backButton}
        leftSection={<ArrowLeft size={16} />}
      >
        Back to Homepage
      </Button>

      <ProductGrid
        productJsonPaths={productJsonPaths}
        grayscale={GRAYSCALE}
        thumbCount={THUMB_COUNT}
      />

      <Title order={5} c="dimmed" className={classes.sessionCode}>
        Session code: {sessionCode}
      </Title>
    </Box>
  );
}
