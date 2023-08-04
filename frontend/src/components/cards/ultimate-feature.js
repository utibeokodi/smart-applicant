/** @jsx jsx */
import { jsx, Box, Image, Heading, Text } from 'theme-ui';
import { styles } from '../styles/cards/ultimate-feature.style';

const UltimateFeature = ({ data, ...props }) => {
  return (
    <Box sx={styles.feature} {...props}>
      <figure>
        <Image src={data?.icon} alt={data?.title} />
      </figure>
      <Box>
        <Heading as="h4">{data?.title}</Heading>
        <Text as="p">{data?.description}</Text>
      </Box>
    </Box>
  );
};

export default UltimateFeature;