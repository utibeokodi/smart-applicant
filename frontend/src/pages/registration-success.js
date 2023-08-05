import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import Layout from 'components/layout';
import SEO from 'components/seo';
import Notification from "components/notification";

export default function RegistrationSuccessPage () {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
            <SEO title="Smart Applicant" />
            <Notification 
                heading="Smart Applicant Account Registration Successful"
                message="You have successfully created your Smart Applicant account. Please check your email to verify your account."
              />
            </Layout>
        </ThemeProvider>
      );
}
