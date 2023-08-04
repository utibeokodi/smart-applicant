/** @jsx jsx */
import { jsx, Box, Container, Heading, Text, Button, Image } from 'theme-ui';
import banner from 'assets/images/banner.png';
import linkedin from 'assets/images/linkedin.png';
import indeed from 'assets/images/indeed.png';
import { Link } from 'components/link';
import { styles } from './styles/banner.style'; 

const Banner = () => {
  return (
    <Box id="home" as="section" variant="section.banner">
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.content}>
            <Heading sx={styles.title}>
            Smart Applicant | Make your next career move
            </Heading>
            <Text as="p" sx={styles.text}>
            Automate your job search with Smart Applicant. 
            Upload your resume, set preferences, and let us handle the applications. 
            Embrace the future of career success.
            </Text>
            <Link path="/register" sx={{ ...styles.button, variant: 'buttons.primaryMd' }}>
              Register Now
            </Link>
            <Box sx={styles.clients}>
              <Image src={linkedin} alt="linkedin" />
              <Image src={indeed} alt="indeed" />
            </Box>
          </Box>
          <Box sx={styles.illustration}>
            <Image src={banner} alt="banner" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;