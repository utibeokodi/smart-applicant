import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import Layout from 'components/layout';
import SEO from 'components/seo';
import Notification from "components/notification";


export default function RegistationPage () {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
            <SEO title="Smart Applicant" />
            <Notification 
              heading="Reset Password Success"
              message="Your Password has been reset successfully, you can now log into your account with your new password"
            />
            </Layout>
        </ThemeProvider>
      );
}