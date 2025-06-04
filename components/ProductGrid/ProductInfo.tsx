'use client';

import { useEffect, useState } from 'react';
import { Box, List, Rating, Text } from '@mantine/core';
import classes from './ProductInfo.module.css';

type ProductInfoProps = {
  path: string;
};

export function ProductInfoComponent({ path }: ProductInfoProps) {
  const [description, setDescription] = useState<string | null>(null);
  const [about, setAbout] = useState<string[] | null>(null);
  // TODO: DO THIS PART ONCE THE METADATA IS FINALIZED
  const review = 'This is also missing, this is a placeholder.';

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await fetch(path);
        const data = await response.json();

        setDescription(data['Product Description'] || data.product_description || null);
        setAbout(data['About Product'] || data.about_product || null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load product info:', error);
      }
    };

    fetchProductInfo();
  }, [path]);

  return (
    <div className={classes.container}>
      <Box className={classes.padding}>
        <Text fw={500} mb={4}>
          Rating
        </Text>
        {/* need to change this to get an acc val */}
        <Rating value={0} readOnly />
      </Box>

      {description && description.length > 0 && (
        <Box className={classes.padding}>
          <Text fw={500} mb={4}>
            Description
          </Text>
          <Text size="sm" c="dimmed" className={classes.textWrap}>
            {description}
          </Text>
        </Box>
      )}

      {about && about.length > 0 && (
        <Box className={classes.padding}>
          <Text fw={500} mb={4}>
            Highlights
          </Text>
          <List size="sm" spacing="xs" c="dimmed" className={classes.listWrap}>
            {about.map((point, idx) => (
              <List.Item key={idx}>{point}</List.Item>
            ))}
          </List>
        </Box>
      )}

      {review && review.length > 0 && (
        <Box className={classes.padding}>
          <Text fw={500} mb={4}>
            Reviewer Consensus
          </Text>
          <Text size="sm" c="dimmed" className={classes.textWrap}>
            {review}
          </Text>
        </Box>
      )}
    </div>
  );
}
