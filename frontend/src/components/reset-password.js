import React, { useState } from 'react';
import { Box, Container, Label, Button, Input, Heading, Grid, Text, Spinner } from 'theme-ui';
import { styles } from './styles/base-form.style.js';
import { useRouter } from 'next/router';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { token } = router.query;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError('Passwords do not match!');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          token
        }),
      });

      setIsLoading(false);

      if (response.ok) {
        router.push('/reset-password-success');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      setError('There has been a problem with your reset password operation, please try again later');
    }
  };

  return (
    <Container mb={[100, 120, 150]} pt={[75, 100, 100]}>
      <Grid>
        <Box as='form' onSubmit={handleSubmit} sx={styles.form}>
          <Box sx={styles.heading}>
            <Heading>Reset Your Password</Heading>
          </Box>
          <Box mb={3}>
            <Label htmlFor="password">New Password:</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              placeholder="Enter New Password"
              minLength='8'
              maxLength='20'
              onChange={(e) => setPassword(e.target.value)}
              sx={styles.input}
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="passwordConfirm">Confirm New Password:</Label>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              value={passwordConfirm}
              placeholder="Confirm New Password"
              minLength='8'
              maxLength='20'
              onChange={(e) => setPasswordConfirm(e.target.value)}
              sx={styles.input}
            />
          </Box>
          <Button>
            {isLoading ? <Spinner /> : 'Reset Password'}
          </Button>
          {error && <Text sx={{ color: 'red' }}>{error}</Text>}
        </Box>
      </Grid>
    </Container>
  );
}

export default ResetPasswordForm;