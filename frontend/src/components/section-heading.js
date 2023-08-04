/** @jsx jsx */
import { jsx, Box, Heading, Text } from 'theme-ui';
import { styles } from './styles/section-heading.style';

const SectionHeading = ({ title, description, ...props }) => {
  return (
    <Box sx={styles.heading} {...props}>
      <Heading sx={styles.title}>{title}</Heading>
      <Text as="p" sx={styles.description}>
        {description}
      </Text>
    </Box>
  );
};

export default SectionHeading;