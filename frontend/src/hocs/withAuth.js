import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { Spinner, Box } from 'theme-ui';
import jwt_decode from 'jwt-decode';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const jwtToken = Cookie.get('jwtToken');

      if (!jwtToken) {
        Router.replace('/login');
      } else {
        try {
          const { exp } = jwt_decode(jwtToken);

          if (exp < Date.now() / 1000) {
            Cookie.remove('jwtToken');
            localStorage.setItem('sessionExpired', 'true');
            Router.push('/login');
          }
          setIsAuthenticated(true);
        } catch (error) {
          Cookie.remove('jwtToken');
          localStorage.setItem('sessionExpired', 'true');
          Router.push('/login');
        }
      }
      setIsLoading(false);
    }, [Router]);

    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner />
        </Box>
      );
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
