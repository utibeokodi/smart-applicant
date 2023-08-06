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
                heading="We Found an account Matching that Email!"
                message="An Email has been sent to the email you provided with steps on how to reset your password"
              />
            </Layout>
        </ThemeProvider>
      );
}
