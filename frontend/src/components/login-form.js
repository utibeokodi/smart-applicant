import React, { useState, useEffect } from 'react';
import { Box, Container, Label, Button, Input, Heading, Grid, Text, Spinner } from 'theme-ui';
import { styles } from './styles/base-form.style.js';
import { Link } from 'components/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast, Toaster } from 'react-hot-toast';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const sessionExpired = localStorage.getItem('sessionExpired');
    if (sessionExpired) {

      toast.error('Your session has expired. Please log in again.', { 
        style: {
          border: 'none',
          background: '#ff4d4f',
          color: 'white'
        },
        duration: 3000, position: 'top-center'
       });
  
      localStorage.removeItem('sessionExpired');
    }
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        const jwtToken = data.token;
        Cookies.set('jwtToken', jwtToken, { expires: 1, secure: false });

        router.push('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error)
      setError('There has been a problem with your login, please try again later', error);
    }
  };

  return (
    <Container mb={125} pt={70}>
      <Toaster position="top-center" />
      <Grid>
        <Box as='form' onSubmit={handleSubmit} sx={styles.form}>
          <Box sx={styles.heading}>
            <Heading>Smart Applicant Login</Heading>
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
          <Box mb={3}>
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              sx={styles.input}
            />
          </Box>
          <Text sx={ {fontSize: '14px'} }>
            <Link path="/forgot-password" sx={styles.link}>
              Forgot password?
            </Link>
          </Text>
          <Button>
            {isLoading ? <Spinner /> : 'Login'}
          </Button>
          <Text sx={{fontSize : '13px'}}>
            Don't have an account? &nbsp;
            <Link path="/register" sx={styles.link}>
                Register here
            </Link>
          </Text>
          {error && <Text sx={{ color: 'red' }}>{error}</Text>}
        </Box>
      </Grid>
    </Container>
  );
}

export default LoginForm;