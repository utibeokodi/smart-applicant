/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import UltimateFeature from 'components/cards/ultimate-feature';

import bulb from 'assets/images/icons/bulb-2.png';
import diamond from 'assets/images/icons/diamond.png';
import help from 'assets/images/icons/help.png';
import award from 'assets/images/icons/award.png';

const data = [
  {
    id: 1,
    icon: bulb,
    title: 'Job Matching Algorithm',
    description: `A sophisticated AI-driven algorithm that analyzes user profiles, preferences, and industry trends to identify the most suitable job openings. This system ensures that automated applications are directed towards relevant opportunities, increasing the chances of success.`,
  },
  {
    id: 2,
    icon: diamond,
    title: 'Integration with LinkedIn and Job Boards',
    description: `Seamless integration with LinkedIn, Indeed, and other job sites allows users to automatically search for matching jobs directly within the app, across these platforms. This unified approach simplifies the job search process, enabling users to explore and apply for opportunities on various job platforms from a single interface.`,
  },
  {
    id: 3,
    icon: help,
    title: 'Comprehensive Notifications and Reminders System',
    description: `A robust notification system that gives users timely updates on all stages of the job application process, including job matches, interview invitations, and essential deadlines. Users can customize these notifications to be received via email, SMS, or in-app alerts, ensuring they stay informed and never miss an opportunity.`,
  },
  {
    id: 4,
    icon: award,
    title: 'Customer Support',
    description: `We believe it’s important for everyone to have access to software – especially when it comes to digital learning tools. Eduflow is built with WCAG standards in mind and can easily be navigated by keyboard and screen readers.`,
  },
];

const UsefulFeatures = () => {
  return (
    <Box as="section" id="useful-features" variant="section.usefulFeatures">
      <Container>
        <SectionHeading
          sx={styles.heading}
          title="Additional features"
          description="Let Smart Applicant handle your job applications. Set your preferences, and we'll automate the process, freeing you to focus on your career."
        />
        <Box sx={styles.features}>
          {data?.map((item) => (
            <UltimateFeature
              key={item.id}
              data={item}
              className="feature-item"
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default UsefulFeatures;

const styles = {
  heading: {
    marginBottom: 80,
  },
  features: {
    gap: 60,
    display: ['grid'],
    gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)'],
    '.feature-item': {
      display: ['block', 'block', 'block', 'block', 'flex'],
      px: ['15px', 0],
      maxWidth: ['none'],
      figure: {
        minWidth: '90px',
        m: [
          '0 auto 30px',
          '0 auto 30px',
          '0 auto 30px',
          '0 auto 30px',
          '0 26px 0 0',
        ],
      },
    },
  },
};
