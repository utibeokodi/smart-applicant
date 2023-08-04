/** @jsx jsx */
import { jsx, Box, Button, Heading, Text } from 'theme-ui';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';
import { Link } from 'components/link';
import { styles } from '../styles/cards/price-table.style';

const PriceTable = ({ price, isMonthly }) => {
  return (
    <Box
      sx={styles.priceTable}
      className={`priceCard ${price.isRecommended ? 'recommended' : ''}`}
    >
      {price?.isRecommended && (
        <Text as="span" sx={styles.recommended}>
          Recommended
        </Text>
      )}
      <Box sx={styles.header}>
        <Box className="priceHeader">
          <Heading as="h3" sx={styles.title}>
            {price.title}
          </Heading>
          <Text as="p" sx={styles.subtitle}>
            {price.subtitle}
          </Text>
        </Box>
        {price?.amount !== 0 && (
          <Box className="priceAmount">
            <Text as="p" sx={styles.priceLabel}>
              Starting from
            </Text>

            <Text as="p" sx={styles.priceAmount}>
              {price?.amount?.toFixed(0)}
              {isMonthly ? '/mo' : '/yr'}
            </Text>
          </Box>
        )}
      </Box>
      <Box as="ul" sx={styles.list}>
        {price?.features?.map((feat) => (
          <li key={feat.id} className={!feat.isAvailable ? 'unavailable' : ''}>
            {feat.isAvailable ? (
              <IoMdCheckmarkCircle color="#3FDBB1" size="30px" />
            ) : (
              <IoIosCloseCircle color="#CED7E1" size="30px" />
            )}
            <span>{feat.title}</span>
          </li>
        ))}
      </Box>
      <Box sx={{ textAlign: 'center' }} className="priceButton">
      <Link path="/register" sx={{ ...styles.button, variant: 'buttons.primaryMd' }}>
        {price.buttonText}
      </Link>
      </Box>
    </Box>
  );
};

export default PriceTable;