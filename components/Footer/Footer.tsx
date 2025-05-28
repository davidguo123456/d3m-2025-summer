import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconMailFilled,
} from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import classes from './Footer.module.css'
import { LINKS } from '@/app/constants';

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 David Guo. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <a
              href="mailto:davidmy.guo@mail.utoronto.ca"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'grey' }}
            >
              <IconMailFilled size={18} stroke={2} />
            </a>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'grey' }}
            >
              <IconBrandLinkedinFilled size={18} stroke={2} />
            </a>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'grey' }}
            >
              <IconBrandGithubFilled size={18} stroke={2} />
            </a>
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
