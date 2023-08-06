import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import Layout from 'components/layout';
import SEO from 'components/seo';
import ResetPasswordForm from "components/reset-password";


export default function ResetPasswordPage () {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
            <SEO title="Smart Applicant" />
            <ResetPasswordForm/>
            </Layout>
        </ThemeProvider>
      );
}