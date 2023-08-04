import React, { useState } from 'react';
import { Box, Container, Label, Button, Input, Heading, Grid, Text, Spinner } from 'theme-ui';
import { styles } from './styles/registration-form.style.js';
import { Link } from 'components/link';
import { useRouter } from 'next/router';


function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const fields = [
    {
      id: 'first-name',
      name: 'name',
      type: 'text',
      value: firstName,
      placeholder: " Enter First Name",
      onChange: e => setFirstName(e.target.value),
      label: 'First Name',
      required: true,
      minLength: undefined,
      maxLength: undefined
    },
    {
      id: 'last-name',
      name: 'last-name',
      type: 'text',
      value: lastName,
      placeholder: " Enter Last Name",
      onChange: e => setLastName(e.target.value),
      label: 'Last Name',
      required: true,
      minLength: undefined,
      maxLength: undefined
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      value: email,
      placeholder: " Enter Email Address",
      onChange: e => setEmail(e.target.value),
      label: 'Email',
      required: true,
      minLength: undefined,
      maxLength: undefined
    },
    {
      id: 'password1',
      name: 'password1',
      type: 'password',
      value: password1,
      placeholder: " Enter Password",
      onChange: e => setPassword1(e.target.value),
      label: 'Password',
      required: true,
      minLength: '8',
      maxLength: '20'
    },
    {
      id: 'password2',
      name: 'password2',
      type: 'password',
      value: password2,
      placeholder: " Confirm Password",
      onChange: e => setPassword2(e.target.value),
      label: 'Confirm Password',
      required: true,
      minLength: '8',
      maxLength: '20'
    }
  ];
  
  const handleSubmit = async event => {
    event.preventDefault();

    //enforce password 
    if (password1 !== password2) {
        setError('Passwords do not match');
        return;
      }
    // Here you can make a POST request to your API endpoint for registration
    // You can use the fetch API or any HTTP client like axios
    try {
      setIsLoading(true);
      const response = await fetch("/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password1,
          password2
        })
      });

      const data = await response.json();
      setIsLoading(false);
      
     if(response.ok){
      router.push('/registration-success');
     } else {
      setError(data.message);
     }
      
  }
    catch (error){
    setIsLoading(false);
    setError('There has been a problem with your registration, please try again later', error);
    }
   
  };

  return (
    <Container>
     <Grid>
        <Box
        as='form'
        onSubmit={handleSubmit}
        sx={styles.form}
        mb={8}
        >
        <Box sx={styles.heading}>
        <Heading>Create Account</Heading>
        </Box>
        {fields.map((field, index) => (
          <Box key={index} mb={4}>
            <Label htmlFor={field.id} sx={styles.label}>{field.label}:</Label>
            <Input
              id={field.id}
              name={field.name}
              type={field.type}
              required={field.required}
              value={field.value}
              placeholder={field.placeholder}
              onChange={field.onChange}
              minLength={field.minLength}
              maxLength={field.maxLength}
              sx={styles.input}
            />
          </Box>
          ))}
        <Text sx={{ ...styles.text, mb:'4px'}}>
            By Registering, you agree to our&nbsp;
            <Link path="/terms" sx={styles.link}>
                Terms and Condition
            </Link>
        </Text>
        <Button>
            {isLoading ? <Spinner /> : "Register Now"} 
        </Button>
        {error && <Text sx={{ color: 'red' }}>{error}</Text>}
        </Box>
    </Grid>
</Container>
  );

}

export default RegistrationForm;