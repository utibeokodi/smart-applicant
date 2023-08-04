/** @jsx jsx */
import { jsx, Box, Text, Container } from 'theme-ui';
import Logo from 'components/logo';
import { Link } from 'components/link';
import { menuItems, footerNav } from './footer.data';
import { styles } from '../styles/footer/footer.style';

export default function Footer() {
  return (
    <Box as="footer" variant="layout.footer">
      <Container>
        <Box sx={styles.footerInner}>
          <Box sx={styles.copyright}>
            <Logo />
            <Text as="span" ml={6}>
              {new Date().getFullYear()} All rights reserved
            </Text>
          </Box>

          <Box as="ul" sx={styles.footerNav}>
          {footerNav.map(({ path, label }, i) => (
            <li key={i}>
              <Link path={path} key={i} label={label} variant="footer" sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'primary' }} />
            </li>
          ))}
        </Box>

        </Box>
      </Container>
    </Box>
  );
}