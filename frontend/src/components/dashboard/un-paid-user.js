import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Heading, Button, Text, Box, Container } from 'theme-ui';

const UnPaidUser = () => {

    useEffect(() => {
        toast.error('Only paid users are allowed to access this feature', { 
            style: {
                border: 'none',
                background: '#ff4d4f',
                color: 'white'
            },
            duration: 3000, position: 'top-center'
            });
    }
    , []);

        return (
            <Container sx = {{
                marginLeft: '250px',
                width: 'calc(100% - 250px)',
                height: '100vh',
                backgroundColor: 'muted',
                '@media screen and (max-width: 991px)': {
                    width: '100%',
                    marginLeft: 0,
                  },
            }}>
                 <Toaster position="top-center" />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: ['100%', '100%', '90%'],
                mx: 'auto',
                my: 'auto'
                }}>
                <Heading as="h2">Access Denied</Heading>
                <Text as="p" mt={3}>Please click on the "Upgrade your account" link on the dashboard and upgrade your account to be able to use this feature.</Text>
                <Button as="a" href="/dashboard/upgrade-your-account" mt={4}>Upgrade your account</Button>
            </Box>
            </Container>
        );
}

export default UnPaidUser;
