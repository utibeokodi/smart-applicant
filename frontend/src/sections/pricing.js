/** @jsx jsx */
import { useState } from 'react';
import { jsx, Box, Grid, Container, Flex, Text, Button } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import PriceTable from 'components/cards/price-table';
import { styles } from './styles/pricing.style'; 

const monthly = [
  {
    id: 1,
    title: 'Basic Plan',
    subtitle: 'For lighter workloads',
    amount: 70,
    isRecommended: false,
    buttonText: 'Register Now',
    features: [
      {
        id: 1,
        isAvailable: true,
        title: 'Automated Application Submission',
      },
      {
        id: 2,
        isAvailable: true,
        title: `Advanced Analytics and Reporting`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `Upload one resume and have multiple preferences`,
      },
      {
        id: 4,
        isAvailable: false,
        title: `Premium Support and Guidance`,
      },
      {
        id: 5,
        isAvailable: false,
        title: `Robust Notification System`,
      },
    ],
  },
  {
    id: 2,
    title: 'Premium Plan',
    subtitle: 'For heavier workloads',
    amount: 149.99,
    isRecommended: true,
    buttonText: 'Register Now',
    features: [
      {
        id: 1,
        isAvailable: true,
        title: 'Automated Application Submission',
      },
      {
        id: 2,
        isAvailable: true,
        title: `Advanced Analytics and Reporting`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `Upload three resumes and have multiple preferences`,
      },
      {
        id: 4,
        isAvailable: true,
        title: `Premium Support and Guidance`,
      },
      {
        id: 5,
        isAvailable: true,
        title: `Robust Notification System`,
      },
    ],
  },
];
const annual = [
  {
    id: 1,
    title: 'Basic Plan',
    subtitle: 'For lighter workloads',
    amount: 70 * 12 - 10,
    isRecommended: false,
    buttonText: 'Register Now',
    features: [
      {
        id: 1,
        isAvailable: true,
        title: 'Automated Application Submission',
      },
      {
        id: 2,
        isAvailable: true,
        title: `Advanced Analytics and Reporting`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `Upload one resume and have multiple preferences`,
      },
      {
        id: 4,
        isAvailable: false,
        title: `Premium Support and Guidance`,
      },
      {
        id: 5,
        isAvailable: false,
        title: `Robust Notification System`,
      },
    ],
  },
  {
    id: 2,
    title: 'Premium Plan',
    subtitle: 'For heavier workloads',
    amount: 149.99 * 12 - 10,
    isRecommended: true,
    buttonText: 'Register Now',
    features: [
      {
        id: 1,
        isAvailable: true,
        title: 'Automated Application Submission',
      },
      {
        id: 2,
        isAvailable: true,
        title: `Advanced Analytics and Reporting`,
      },
      {
        id: 3,
        isAvailable: true,
        title: `Upload three resumes and have multiple preferences`,
      },
      {
        id: 4,
        isAvailable: true,
        title: `Premium Support and Guidance`,
      },
      {
        id: 5,
        isAvailable: true,
        title: `Robust Notification System`,
      },
    ],
  },
];

const Pricing = () => {
  const [plan, setPlan] = useState({
    active: 'monthly',
    pricingPlan: monthly,
  });

  const handlePlan = (plan) => {
    if (plan === 'monthly') {
      setPlan({
        ...plan,
        active: 'monthly',
        pricingPlan: monthly,
      });
    }
    if (plan === 'annual') {
      setPlan({
        ...plan,
        active: 'annual',
        pricingPlan: annual,
      });
    }
  };
  return (
    <Box
      as="section"
      id="pricing"
      sx={styles.section}
      variant="section.pricing"
    >
      <Container>
        <SectionHeading
          sx={styles.heading}
          title="What deal suit you perfect"
        />
        <Flex sx={styles.priceSwitcher}>
          <Text as="span" className="discount">
            Save 20%
          </Text>
          <Button
            variant="text"
            onClick={() => handlePlan('monthly')}
            className={`${plan.active === 'monthly' ? 'active' : ''}`}
          >
            Monthly Plan
          </Button>
          <Button
            variant="text"
            onClick={() => handlePlan('annual')}
            className={`${plan.active === 'annual' ? 'active' : ''}`}
          >
            Annual Plan
          </Button>
        </Flex>
        <Grid sx={styles.priceWrapper}>
          {plan.pricingPlan.map((price, index) => (
            <PriceTable price={price} key={`${plan.active}-${index}`} isMonthly={plan.active === 'monthly'} />

          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;