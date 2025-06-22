import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Fieldset, Select, TextInput, Title } from '@mantine/core';
import { CODE_PREFIX_LENGTH } from '@/app/constants';
import classes from './LandingPage.module.css';

export function LandingPage() {
  const [role, setRole] = useState('');
  const [code, setCode] = useState('');
  const [roleError, setRoleError] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isRoleValid = role.trim().length > 0;
    const isCodeValid = new RegExp(`^[a-zA-Z]{${CODE_PREFIX_LENGTH}}[0-9]{3}$`).test(code.trim());

    setRoleError(!isRoleValid);
    setCodeError(!isCodeValid);

    if (isRoleValid && isCodeValid) {
      const trimmedCode = code.toLowerCase();
      // eslint-disable-next-line prefer-template
      const letters = 't' + trimmedCode.slice(0, CODE_PREFIX_LENGTH);
      const digits = trimmedCode.slice(-3);

      router.push(`/${role.toLowerCase()}/${'tutorial'}?seq=${letters}&sess=${digits}&idx=0`);
    }
  };

  const handleRoleChange = (value: string | null) => {
    setRole(value || '');
    if (value && value.trim().length > 0) {
      setRoleError(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setCode(value);
    if (value.trim().length > 0) {
      setCodeError(false);
    }
  };

  return (
    <Box className={classes.wrapper}>
      <form className={classes.contents} onSubmit={handleSubmit}>
        <Title order={1}>D3M: Fashion Recommendation</Title>
        <Fieldset legend="Onboarding" className={classes.input}>
          <Select
            label="Your role:"
            placeholder="Select a role"
            data={['Assistant', 'Seeker']}
            value={role}
            onChange={handleRoleChange}
            error={roleError ? 'Role is required' : false}
            className={classes.padded}
          />

          <TextInput
            label="Session code:"
            description="Please enter your session code."
            placeholder="eg: abc123"
            value={code}
            onChange={handleCodeChange}
            radius="md"
            error={
              codeError ? `Code must be ${CODE_PREFIX_LENGTH} letters followed by 3 digits` : false
            }
            className={classes.padded}
          />

          <Button type="submit" radius="md" className={classes.padded}>
            Join
          </Button>
        </Fieldset>
      </form>
    </Box>
  );
}
