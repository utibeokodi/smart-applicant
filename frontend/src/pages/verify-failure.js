import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import Layout from 'components/layout';
import SEO from 'components/seo';
import Notification from "components/notification";


export default function VerifyFailurePage () {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
            <SEO title="Smart Applicant" />
            <Notification 
              heading="Verification Failed"
              message="There was an error verifying your account: "
            />
            </Layout>
        </ThemeProvider>
      );
}
