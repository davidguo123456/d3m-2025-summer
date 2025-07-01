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
    const isCodeValid = new RegExp(`^[0-9]{1}[a-zA-Z]{${CODE_PREFIX_LENGTH}}[0-9]{6}$`).test(
      code.trim()
    );

    setRoleError(!isRoleValid);
    setCodeError(!isCodeValid);

    if (isRoleValid && isCodeValid) {
      const flip = code[0] === '1' ? 1 : 0;
      const trimmedCode = code.slice(1).toLowerCase(); // remove first char, then lowercase

      const letters =
        // eslint-disable-next-line prefer-template
        't' +
        trimmedCode
          .split('')
          .map((c) => c + c)
          .join('')
          .slice(0, CODE_PREFIX_LENGTH * 2);
      const digits = trimmedCode.slice(-6);

      router.push(`/${role.toLowerCase()}?flip=${flip}&seq=${letters}&sess=${digits}&idx=0&cat=t`);
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
            placeholder="eg: 0abc123456"
            value={code}
            onChange={handleCodeChange}
            radius="md"
            error={
              codeError
                ? `Code must be 1 digit followed by ${CODE_PREFIX_LENGTH} letters followed by 6 digits`
                : false
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
