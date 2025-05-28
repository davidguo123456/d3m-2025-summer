import { IconAt, IconMapPin, IconPhone } from '@tabler/icons-react';
import { Box, Stack, Text } from '@mantine/core';
import contactInfo from '../../public/contact.json';
import classes from './ContactIcons.module.css';

const iconMap = {
  IconMapPin,
  IconAt,
  IconPhone,
};

interface ContactIconProps {
  icon: React.ComponentType;
  title: React.ReactNode;
  description: React.ReactNode;
}

const ContactIcon = ({ icon: Icon, title, description }: ContactIconProps) => (
  <div className={classes.wrapper}>
    <Box mr="md">
      <Icon />
    </Box>
    <div>
      <Text size="xs" className={classes.title}>
        {title}
      </Text>
      <Text className={classes.description}>{description}</Text>
    </div>
  </div>
);

export function ContactIconsList() {
  return (
    <Stack>
      {contactInfo.data.map(({ icon, title, description }, index) => {
        const IconComponent = iconMap[icon as keyof typeof iconMap];
        if (!IconComponent) {
          return null;
        }
        return (
          <ContactIcon key={index} icon={IconComponent} title={title} description={description} />
        );
      })}
    </Stack>
  );
}
