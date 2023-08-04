/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import UltimateFeature from 'components/cards/ultimate-feature';

import bulb from 'assets/images/icons/bulb.png';
import dart from 'assets/images/icons/dart.png';
import rocket from 'assets/images/icons/rocket.png';
import trophy from 'assets/images/icons/trophy.png';

import { styles } from './styles/features.style'; 

const data = [
  {
    id: 1,
    icon: bulb,
    title: 'Resume Parsing and Profile Creation',
    description: 'Users can upload resumes, and the system extracts details like skills and experience to create a profile',
  },
  {
    id: 2,
    icon: dart,
    title: 'Customized Cover Letter Generation',
    description: 'Enables creation and management of personalized cover letters using predefined templates',
  },
  {
    id: 3,
    icon: rocket,
    title: 'Automated Job Search and Application',
    description: 'Allows automatic job searches and applications, with the option for users to review and approve matches.',
  },
  {
    id: 4,
    icon: trophy,
    title: 'Award winning Application Tracking and Analytics',
    description: 'Offers a state of the art dashboard to track application status and provides insights into application effectiveness.',
  },
];

const Features = () => {
  return (
    <Box as="section" id="ultimate-feature" variant="section.ultimateFeature">
      <Container>
        <SectionHeading
          sx={styles.heading}
          title="Smart applicant features"
          description="Focus on preparing for interviews instead of writing multiple cover letters and sending multiple job applications manually"
        />
        <Box sx={styles.features}>
          {data?.map((item) => (
            <UltimateFeature key={item.id} data={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;