'use client';

import { useEffect, useRef, useState } from 'react';
import Pica from 'pica';
import { Box, Group, Stack, Title } from '@mantine/core';
import classes from './ProductCard.module.css';

const pica = Pica();

type ColorImage = {
  asin: string;
  Photo_url: string;
};

type ProductData = {
  ID: string;
  Color: Record<string, ColorImage>;
};

type ProductCardProps = {
  jsonPath: string;
  thumbCount?: number;
  grayscale?: boolean;
  onLoad?: () => void;
  cardTitle?: string;
};

const THUMB_SIZE = 50;

export function ProductCard({
  jsonPath,
  thumbCount = 8,
  grayscale = false,
  onLoad,
  cardTitle,
}: ProductCardProps) {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(jsonPath);
      const data: ProductData & Record<string, any> = await response.json();

      const imageUrls: string[] = [];

      if (data.product_photo && Object.keys(data.product_photo).length !== 0) {
        imageUrls.push(data.product_photo);
      } else if (
        data['Product Picture(s)'] &&
        Object.keys(data['Product Picture(s)']).length !== 0
      ) {
        imageUrls.push(data['Product Picture(s)']);
      } else if (data['Product Photo'] && Object.keys(data['Product Photo']).length !== 0) {
        imageUrls.push(data['Product Photo']);
      }

      if (imageUrls.length > 0) {
        setPhotoUrls(imageUrls);
        setMainImage(imageUrls[0]);
        setSelectedIndex(0);
      }
    };

    fetchData();
  }, [jsonPath]);

  useEffect(() => {
    const loadAndProcessImages = async () => {
      if (!mainImage) {
        return;
      }

      const mainImg = await loadImage(mainImage);
      drawToCanvas(mainImg, mainCanvasRef.current!, grayscale);

      const resizedImages: string[] = [];

      for (const url of photoUrls) {
        const img = await loadImage(url);
        const aspectRatio = img.width / img.height;

        let targetWidth = THUMB_SIZE;
        let targetHeight = THUMB_SIZE;
        if (aspectRatio > 1) {
          targetHeight = THUMB_SIZE / aspectRatio;
        } else {
          targetWidth = THUMB_SIZE * aspectRatio;
        }

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = targetWidth;
        tempCanvas.height = targetHeight;

        await pica.resize(img, tempCanvas);

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = THUMB_SIZE;
        finalCanvas.height = THUMB_SIZE;
        const ctx = finalCanvas.getContext('2d');
        if (!ctx) {
          continue;
        }

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, THUMB_SIZE, THUMB_SIZE);
        ctx.drawImage(
          tempCanvas,
          (THUMB_SIZE - targetWidth) / 2,
          (THUMB_SIZE - targetHeight) / 2,
          targetWidth,
          targetHeight
        );

        if (grayscale) {
          applyGrayscale(ctx, finalCanvas.width, finalCanvas.height);
        }

        resizedImages.push(finalCanvas.toDataURL('image/jpeg', 0.9));
      }

      setThumbs(resizedImages);
      onLoad?.();
    };

    loadAndProcessImages();
  }, [mainImage, photoUrls, grayscale]);

  const handleThumbnailClick = (index: number) => {
    setMainImage(photoUrls[index]);
    setSelectedIndex(index);
  };

  return (
    <Stack gap="md" className={classes.wrapper}>
      <Group align="flex-start" wrap="nowrap">
        <div className={classes.mainImageWrapper}>
          <Title size="md" className={classes.cardTitle}>
            {cardTitle}
          </Title>
          <Box className={classes.mainImageBox}>
            <canvas ref={mainCanvasRef} className={classes.mainImage} />
          </Box>
        </div>
      </Group>

      {thumbCount > 0 && (
        <Group gap="xs" className={classes.thumbnailGrid} wrap="wrap">
          {thumbs.slice(0, thumbCount).map((thumb, index) => (
            <Box
              key={index}
              className={`${classes.thumbnailWrapper} ${
                index === selectedIndex ? classes.selected : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
              onKeyDown={() => handleThumbnailClick(index)}
              role="presentation"
            >
              <img src={thumb} alt={`Thumbnail ${index + 1}`} className={classes.thumbnail} />
            </Box>
          ))}
        </Group>
      )}
    </Stack>
  );
}

function applyGrayscale(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data.fill(avg, i, i + 3);
  }

  ctx.putImageData(imageData, 0, 0);
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function drawToCanvas(img: HTMLImageElement, canvas: HTMLCanvasElement, grayscale: boolean) {
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  ctx.drawImage(img, 0, 0);

  if (grayscale) {
    applyGrayscale(ctx, canvas.width, canvas.height);
  }
}
