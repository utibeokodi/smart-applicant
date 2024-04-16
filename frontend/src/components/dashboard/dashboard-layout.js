import { useState, useEffect } from 'react';
import { Box, Divider } from 'theme-ui';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { items } from './dashboard-layout.data';
import { SideNavItem } from './side-nav-item';
import { useRouter } from 'next/router';
import Logo from '../logo';
import Head from 'next/head';
import withAuth from '../../hocs/withAuth';

export default withAuth(function DashboardLayout({ children }) {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const router = useRouter();
  const pathname = router.pathname;
  const sidebarWidth = '280px';

  useEffect(() => {
    if (isMobileNavVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileNavVisible]);

  return (
    <Box sx={{ height: '100vh', position: 'relative' }}>
      <Head>
        <title>Smart Applicant</title>
      </Head>
      {/* Mobile Top Bar */}
      <Box
        sx={{
          display: ['flex', 'flex', 'flex', 'flex', 'none'],
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'transparent',
          p: 3,
          zIndex: 3,
          '@media screen and (max-width: 992px)': {
            backgroundColor: '#05133b',
            position: 'fixed',
            top: 0,
            width: '100%'
          },
        }}
      >
        <Box onClick={() => setIsMobileNavVisible(!isMobileNavVisible)} sx={{ color: 'white' }}>
          {isMobileNavVisible ? <IoMdClose size={24} /> : <IoMdMenu size={22} />}
        </Box>
      </Box>

      {/* Sidebar */}
      <Box
        sx={{
          display: 'block',
          width: sidebarWidth,
          textAlign: 'center',
          height: '100vh',
          backgroundColor: '#05133b',
          p: 3,
          position: 'fixed',
          top: 0,
          left: 0,
          transition: 'transform 0.3s ease-in-out',
          transform: isMobileNavVisible ? 'translateX(0)' : 'translateX(-100%)',
          '@media screen and (min-width: 992px)': {
            transform: 'translateX(0)',
          },
          zIndex: 2,
        }}
      >
        <Box sx={{ display: 'flex', height: '15vh', alignItems: 'center', justifyContent: 'center', mb: 1, mx: 'auto'}}>
          <Logo />
        </Box>


        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />

        {/* Using SideNavItem */}
        <Box
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />

      </Box>

      {/* Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.54)',
          opacity: isMobileNavVisible ? 1 : 0,
          visibility: isMobileNavVisible ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-in-out , visibility 0.3s ease-in-out',
          zIndex: 1
        }}
        onClick={() => setIsMobileNavVisible(false)}
      />
      {/* children */}
      <Box sx={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            '@media screen and (max-width: 991px)': {
              width: '100%',
              marginLeft: 0
            },
        
    }}
      >
        {children}
      </Box>


    </Box>
  );
});
