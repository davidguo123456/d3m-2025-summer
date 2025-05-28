import { IconArrowDownDashed } from '@tabler/icons-react';
import { ActionIcon, Group } from '@mantine/core';

// Type definition for the props
interface ScrollButtonProps {
  next: string; // The target section to scroll to (anchor ID)
}

export function ScrollButton({ next }: ScrollButtonProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetElement = document.querySelector(next);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Group justify="center">
      <ActionIcon size="50px" radius="25px" variant="subtle">
        <a
          href={next}
          onClick={handleScroll}
          style={{ color: 'grey', display: 'block', textDecoration: 'none' }}
        >
          <IconArrowDownDashed size={45} stroke={2} color="gray" />
        </a>
      </ActionIcon>
    </Group>
  );
}
