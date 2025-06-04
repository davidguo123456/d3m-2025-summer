'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Box, Button, Title } from '@mantine/core';
import { GRAYSCALE, THUMB_COUNT } from '@/app/constants';
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
        cols={2}
        productJsonPaths={productJsonPaths}
        grayscale={GRAYSCALE}
        thumbCount={THUMB_COUNT}
        InfoComponent={(path) => <ProductInfoComponent path={path} />}
      />

      <Title order={5} c="dimmed" mt="md" className={classes.sessionCode}>
        Session code: {sessionCode}
      </Title>
    </Box>
  );
}
