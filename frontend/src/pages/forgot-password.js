import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import Layout from 'components/layout';
import SEO from 'components/seo';
import ForgotPasswordForm from "components/forgot-password"


export default function ForgotPasswordPage () {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
            <SEO title="Smart Applicant" />
            <ForgotPasswordForm/>
            </Layout>
        </ThemeProvider>
      );
}