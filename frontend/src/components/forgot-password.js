import React, { useState } from 'react';
import { Box, Container, Label, Button, Input, Heading, Grid, Text, Spinner } from 'theme-ui';
import { styles } from './styles/base-form.style.js';
import { Link } from 'components/link';
import { useRouter } from 'next/router';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        router.push('/forgot-password-success');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      setError('There has been a problem, please try again later', error);
    }
  };

  return (
    <Container mb={150} pt={[50, 75, 125]}>
      <Grid>
        <Box as='form' onSubmit={handleSubmit} sx={styles.form}>
          <Box sx={styles.heading}>
            <Heading>Forgot Your Password?</Heading>
          </Box>
          <Box mb={3}>
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              sx={styles.input}
            />
          </Box>
          <Button>
            {isLoading ? <Spinner /> : 'Submit'}
          </Button>
          <Text sx={{fontSize : '13px'}}>
            Remembered your password? &nbsp;
            <Link path="/login" sx={styles.link}>
                Login here
            </Link>
          </Text>
          {error && <Text sx={{ color: 'red' }}>{error}</Text>}
        </Box>
      </Grid>
    </Container>
  );
}

export default ForgotPasswordForm;
