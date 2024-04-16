import React from 'react';
import { Box, Container, Text } from 'theme-ui';
import withAuth from '../../hocs/withAuth';

const sideBarWidth = '280px';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: [0, 0, 0, 0, sideBarWidth],
    height: '100vh',
    width: ['100%', '100%', '100%', '100%', `calc(100% - ${sideBarWidth})`],
  },
  box: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap', 
    alignItems: 'center',
    '@media screen and (max-width: 344px)': {
        gap: '10px'
      },
  },
  text: {
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 48
  },
  fadedText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif',
    opacity: 0.2,
    fontSize: 48
  }
};

export default withAuth(function DashboardIndex() {
  return (
    <Container sx={styles.container}>
      <Box sx={styles.box}>
        <Text as='h1' sx={{ ...styles.fadedText, color: 'grey' }}>Smart</Text>
        <Text as='h1' sx={{ ...styles.text, color: 'yellow' }}>Applicant</Text>
      </Box>
    </Container>
  );
});
