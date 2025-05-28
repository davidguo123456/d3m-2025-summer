import { IconBrandGithubFilled, IconBrandLinkedin, IconFileCv } from '@tabler/icons-react';
import { ActionIcon, SimpleGrid, Title, Container, Group} from '@mantine/core';
import { ContactIconsList } from './ContactIcons';
import classes from './Contact.module.css';
import { LINKS } from '@/app/constants';

export function ContactUs() {
  return (
    <Container py="md" className={classes.wrapper} id="contact">
      <div className={classes.info}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          <div>
            <Title className={classes.title}>Contact Me</Title>
            <ContactIconsList/>
          </div>
        </SimpleGrid>
        <Group gap="xs" mt={10}>
          <ActionIcon size="lg" color="white" variant="subtle">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" style={{ color: 'white' }}>
              <IconBrandLinkedin size={22} stroke={2}/>
            </a>
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <a href={LINKS.github} target="_blank" rel="noreferrer" style={{ color: 'white' }}>
              <IconBrandGithubFilled size={22} stroke={2}/>
            </a>
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <a href={LINKS.cv} target="_blank" rel="noreferrer" style={{ color: 'white' }}>
              <IconFileCv size={22} stroke={2}/>
            </a>
          </ActionIcon>
        </Group>
      </div>
    </Container>

    

    
  );
}
