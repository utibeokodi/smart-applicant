import React, { useState, useEffect } from 'react';
import { Box, Container, Label, Button, Input, Heading, Grid, Text, Spinner } from 'theme-ui';
import { styles } from '../styles/base-form.style.js';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import withAuth from '../../hocs/withAuth';

function UserProfileForm() {
  const [firstName, setFirstName] = useState("Jon");
  const [lastName, setLastName] = useState("doe");
  const [email, setEmail] = useState("example@email.com");
  const [error, setError] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [initialState, setInitialState] = useState(null);

  const jwt = Cookies.get('jwtToken');
  try{
    var { userId } = jwtDecode(jwt);
  } catch(error){
    console.log(error.message);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);

        const headers = {
            'Authorization': `Bearer ${jwt}`
          };

        const csrfResponse = await fetch('/api/csrf-token', { headers });
        const userResponse = await fetch(`/api/user/${userId}`, { headers });

          
        const userData = await userResponse.json();
        const csrfData = await csrfResponse.json();

        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setCsrfToken(csrfData.csrfToken);
        setInitialState(
          { 
            firstName: userData.firstName,
            lastName: userData.lastName, 
            email: userData.email 
          });

        setIsLoadingData(false);
      } catch (error) {
        setError('There was an error loading your profile data.');
        setIsLoadingData(false);
      }
    };

    fetchData();

  }, []);


  const handleSave = async event => {
    event.preventDefault();

    if (firstName !== "" && lastName !== "" && email !== "") {
      const userData = { firstName, lastName, email };

      if (JSON.stringify(userData) !== JSON.stringify(initialState)) {
        try {
          setIsSavingData(true);
          const response = await fetch(`/api/user/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`,
              'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ userId, ...userData })
          });
          const data = await response.json();
          setIsSavingData(false);

          if (response.status === 403) {
            setError('Your session has expired. Please log in again.');
            return;
          }
          
          if (!response.ok) {
            setError(data.message);
            return;
          } else {
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            setInitialState(userData);
          }
        } catch (error) {
          setIsSavingData(false);
          setError('There was an error saving the data.');
        }
      }
    }
  };

  const hasDataChanged = JSON.stringify({ firstName, lastName, email }) !== JSON.stringify(initialState);

  return (
    <Container sx={
        {
            marginLeft: '250px',
            width: 'calc(100% - 250px)',
            height: '100vh',
            '@media screen and (max-width: 991px)': {
                width: '100%',
                marginLeft: 0,
                marginTop: '60px'
              },
        }}>
      <Grid>
        <Box
          as='form'
          onSubmit={handleSave}
          sx={styles.form}
        >
          <Box sx={styles.heading}>
            <Heading>Edit Your Profile</Heading>
          </Box>

          <Box mb={3}>
            <Label htmlFor='first-name'>First Name:</Label>
            <Input
              id='first-name'
              name='first-name'
              type='text'
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              sx={styles.input}
            />
          </Box>

          <Box mb={3}>
            <Label htmlFor='last-name'>Last Name:</Label>
            <Input
              id='last-name'
              name='last-name'
              type='text'
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              sx={styles.input}
            />
          </Box>

          <Box mb={3}>
            <Label htmlFor='email'>Email:</Label>
            <Input
              id='email'
              name='email'
              type='email'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={styles.input}
            />
          </Box>

          <Button 
            variant="primary"
            disabled={!hasDataChanged}>
            {isLoadingData ? "Loading data..." : isSavingData ? <Spinner /> : "Save Changes"}
          </Button>

          {error && <Text sx={{ color: 'red' }}>{error}</Text>}
          {saveSuccess && <Text sx={{ color: 'green' }}>Your changes have been saved successfully.</Text>}
        </Box>
      </Grid>
    </Container>
  );
}

export default withAuth(UserProfileForm);
