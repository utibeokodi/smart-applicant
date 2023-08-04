/** @jsx jsx */
import { jsx, Box, Text } from 'theme-ui';
import { styles } from '../styles/cards/feature.style';

const Feature = ({ feature }) => {
  return (
    <Box sx={styles.featureItem}>
      <Text as="p" sx={styles.value} style={{ color: feature?.color }}>
        {feature.value}
      </Text>
      <Text as="p" sx={styles.title}>
        {feature.title}
      </Text>
    </Box>
  );
};

export default Feature;