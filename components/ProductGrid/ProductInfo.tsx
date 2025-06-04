'use client';

import { useEffect, useState } from 'react';
import { Box, List, Rating, Text } from '@mantine/core';
import classes from './ProductInfo.module.css';

type ProductInfoProps = {
  path: string;
};

export function ProductInfoComponent({ path }: ProductInfoProps) {
  const [description, setDescription] = useState<string[] | null>(null);
  const [about, setAbout] = useState<string[] | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [reviews, setReviews] = useState<string[] | null>(null);
  const [details, setDetails] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await fetch(path);
        const data = await response.json();

        setDescription(data['Product Description'] || data.product_description || null);
        setAbout(data['About Product'] || data.about_product || null);
        setRating(parseFloat(data['Product Rating']) || null);
        setReviews(data.Reviews?.length ? data.Reviews : null);
        setDetails(data['Product Detail'] || null);
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
        <Rating value={rating || 0} readOnly />
      </Box>

      {description && description.length > 0 && (
        <Box className={classes.padding}>
          <Text fw={500} mb={4}>
            Description
          </Text>
          <List size="sm" spacing="xs" c="dimmed" className={classes.listWrap}>
            {description.map((line, idx) => (
              <List.Item key={idx}>{line}</List.Item>
            ))}
          </List>
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

      {details && (
        <Box className={classes.padding}>
          <Text fw={500} mb={4}>
            Product Details
          </Text>
          <List size="sm" spacing="xs" c="dimmed" className={classes.listWrap}>
            {Object.entries(details).map(([key, value]) => (
              <List.Item key={key}>
                <strong>{key}:</strong> {value}
              </List.Item>
            ))}
          </List>
        </Box>
      )}

      {reviews && reviews.length > 0 && (
        <Box className={classes.padding}>
          <Text fw={500} mb={4}>
            Reviewer Consensus
          </Text>
          <Text size="sm" c="dimmed">
            {reviews}
          </Text>
        </Box>
      )}
    </div>
  );
}
