import { IconBrandGithubFilled, IconBrandLinkedinFilled, IconFileCv } from '@tabler/icons-react';
import { Button, Container, Group, List, Text, ThemeIcon, Title } from '@mantine/core';
import { LINKS } from '@/app/constants';
import { ScrollButton } from '@/components/ScrollButton/ScrollButton';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <Container size="md" className={classes.wrapper} id="about-me">
      <div className={classes.inner} >
        <div className={classes.content}>
          <Title className={classes.title}>
            <Group>
              Hi, I'm
              <Text
                variant="gradient"
                size="60px"
                fw={900}
                gradient={{ from: 'blue', to: 'green', deg: 90 }}
              >
                David!
              </Text>{' '}
              <br />
            </Group>
          </Title>
          <Text c="dark-grey" mt="md">
            I'm an undergraduate student studying Machine Learning at the University of Toronto.
            <br />
            My experience is primarily with neural network models and generative AI using Python.
            <br />I also dabble with frontend frameworks ocassionally! Mainly React, Vue, and
            Next.js.
          </Text>

          <List className={classes.list} mt={30} spacing="sm" size="md">
            <Button
              component="a"
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className={classes.listButton}
              variant="default"
            >
              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconBrandLinkedinFilled style={{ width: 16, height: 16 }} />
                  </ThemeIcon>
                }
              >
                <b>Linkedin</b>
              </List.Item>
            </Button>
            <Button
              component="a"
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className={classes.listButton}
              variant="default"
            >
              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconBrandGithubFilled style={{ width: 16, height: 16 }} />
                  </ThemeIcon>
                }
              >
                <b>Github</b>
              </List.Item>
            </Button>
            <Button
              component="a"
              href={LINKS.cv}
              target="_blank"
              rel="noreferrer"
              className={classes.listButton}
              variant="default"
            >
              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconFileCv style={{ width: 16, height: 16 }} />
                  </ThemeIcon>
                }
              >
                <b>CV</b>
              </List.Item>
            </Button>
          </List>

          <Group mt={30}>
            <Button
              component="a"
              href="#projects"
              radius="xl"
              size="md"
              className={classes.control}
            >
              My projects
            </Button>
            <Button
              component="a"
              href="#contact"
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Contact Me
            </Button>
          </Group>
        </div>
      </div>

      <ScrollButton next="#projects" />
    </Container>
  );
}
