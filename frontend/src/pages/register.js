import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import RegistationForm from "components/registration-form"

export default function RegistationPage () {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
            <SEO title="Smart Applicant" />
            <RegistationForm/>
            </Layout>
        </ThemeProvider>
      );
}