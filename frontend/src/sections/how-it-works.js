import { Heading, Box, Text, Container, Grid } from 'theme-ui';
import BlockTitle from 'components/block-title';
import React from 'react';
import { styles } from './styles/how-it-works.style'; 

const workflowData = [
  {
    title: 'Create an account with us',
    text:
      'Navigate to the Register Now button and create and account with us',
  },
  {
    title: 'Upgrade your account by subscribing to any of our paid plan',
    text:
      'Once your account has been created you would need to upgrade your account to any of our paid plans to benefit from the automation power of smart applicant',
  },
  {
    title: 'Upload your resume',
    text:
      'Upload your resume and and fill out other necessary information',
  },
  {
    title: 'Configure your preferences',
    text:
      'Configure your preferences in the dashboard and click `Create Now`',
  },
];

const WorkFlow = () => {
  return (
    <Box as="section" sx={styles.workflow} id="how-it-works">
      <Container>
        <BlockTitle
          sx={styles.workflow.blockTitle}
          tagline="Smart Applicant"
          heading="Let’s see how it works"
        />

        <Grid gap="50px 54px" columns={4} sx={styles.workflow.grid}>
          {workflowData.map((item, index) => (
            <Box sx={styles.workflow.card} key={index}>
              <Box sx={styles.workflow.iconBox}>{`0${index + 1}`}</Box>
              <Box sx={styles.workflow.wrapper}>
                <Heading sx={styles.workflow.wrapper.title}>
                  {item.title}
                </Heading>
                <Text sx={styles.workflow.wrapper.subTitle}>{item.text}</Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WorkFlow;