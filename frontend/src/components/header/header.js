/** @jsx jsx */
import { jsx, Box, Container, MenuButton, Flex, Button } from 'theme-ui';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import Sticky from 'react-stickynode';
import Logo from 'components/logo';
import { NavLink, Link } from 'components/link';
import menuItems from './header.data';
import { styles } from '../styles/header/header.style';

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const openMobileMenu = () => {
    setMobileMenu(true);
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <Box sx={styles.headerWrapper}>
      <Sticky enabled={true} top={0} activeClass="is-sticky" innerZ={10}>
        <Box
          as="header"
          variant="layout.header"
          className={mobileMenu ? 'is-mobile-menu' : ''}
        >
          <Container>
            <Box sx={styles.headerInner}>

              <Logo/>
              <Flex
                as="nav"
                sx={styles.navbar}
                className={mobileMenu ? 'navbar active' : 'navbar'}
              >
                <Box
                  as="ul"
                  sx={styles.navList}
                  className={mobileMenu ? 'active' : ''}
                >
                  {menuItems.map(({ path, label }, i) => (
                    <li key={i}>
                      <NavLink
                        path={path}
                        label={label}
                        onClick={closeMobileMenu}
                      />
                    </li>
                  ))}
                <li>
                <Link
                  path="/login"
                  label="Log In"
                  ml={4}
                  sx ={{ cursor: 'pointer' }}
                />
                </li>
                </Box>

                <Button variant="primaryMd" sx={styles.register}>
                  Register Now
                </Button>
                <Link path="/register">
                    <Button variant="primaryMd" sx={styles.register}>
                      Register Now
                    </Button>
                </Link>
              </Flex>
              {mobileMenu ? (
                <Button variant="text" sx={styles.closeButton}>
                  <GrClose
                    onClick={closeMobileMenu}
                    color="white"
                    size="20px"
                  />
                </Button>
              ) : (
                <MenuButton aria-label="Toggle Menu" onClick={openMobileMenu} />
              )}
            </Box>
          </Container>
        </Box>
      </Sticky>
    </Box>
  );
}