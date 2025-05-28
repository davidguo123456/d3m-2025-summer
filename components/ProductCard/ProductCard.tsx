import { useEffect, useState } from 'react';
import { Container, Stack } from '@mantine/core';
import Pica from 'pica';
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
};

export function ProductCard({ jsonPath }: ProductCardProps) {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(jsonPath);
      const data: ProductData = await response.json();

      const seenColors = new Set<string>();
      const uniqueUrls: string[] = [];

      for (const [color, value] of Object.entries(data.Color)) {
        if (!seenColors.has(color)) {
          seenColors.add(color);
          uniqueUrls.push(value.Photo_url);
        }
      }

      setPhotoUrls(uniqueUrls);
      setMainImage(uniqueUrls[0]);
      setSelectedIndex(0);
    };

    fetchData();
  }, [jsonPath]);

  useEffect(() => {
    if (photoUrls.length === 0) return;

    const createThumbnails = async () => {
      const resizedImages: string[] = [];

      for (const url of photoUrls) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;

        await new Promise((res) => (img.onload = res));

        const maxSize = 50;
        const aspectRatio = img.width / img.height;
        let targetWidth = maxSize;
        let targetHeight = maxSize;

        if (aspectRatio > 1) {
          targetHeight = maxSize / aspectRatio;
        } else {
          targetWidth = maxSize * aspectRatio;
        }

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = targetWidth;
        tempCanvas.height = targetHeight;

        await pica.resize(img, tempCanvas, {
          quality: 3,
          unsharpAmount: 160,
          unsharpThreshold: 1,
        });

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = maxSize;
        finalCanvas.height = maxSize;
        const ctx = finalCanvas.getContext('2d');
        if (!ctx) continue;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, maxSize, maxSize);
        ctx.drawImage(tempCanvas, (maxSize - targetWidth) / 2, (maxSize - targetHeight) / 2, targetWidth, targetHeight);

        const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.9);
        resizedImages.push(dataUrl);
      }

      setThumbs(resizedImages);
    };

    createThumbnails();
  }, [photoUrls]);

  const handleThumbnailClick = (index: number) => {
    setMainImage(photoUrls[index]);
    setSelectedIndex(index);
  };

  return (
    <Stack gap="s" className={classes.wrapper}>
      <Container py="md">
        <div className={classes.articleGrid}>
          <div className={classes.mainImageWrapper}>
            {mainImage && (
              <img src={mainImage} alt="Main product" className={classes.mainImage} />
            )}
          </div>

          <div className={classes.thumbnailGrid}>
            {thumbs.slice(0, 8).map((thumb, index) => (
              <div
                key={index}
                className={`${classes.thumbnailWrapper} ${
                  index === selectedIndex ? classes.selected : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={thumb} alt={`Thumbnail ${index + 1}`} className={classes.thumbnail} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Stack>
  );
}
