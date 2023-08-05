import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import Layout from 'components/layout';
import SEO from 'components/seo';
import Notification from "components/notification";


export default function VerifySuccessPage () {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
            <SEO title="Smart Applicant" />
            <Notification 
                heading="Email Verification Successful"
                message="Your email has been successfully verified. You can now log in to your account."
              />
            </Layout>
        </ThemeProvider>
      );
}
