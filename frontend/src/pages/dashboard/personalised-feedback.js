import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from 'contexts/app/app.provider';
import theme from 'theme';
import SEO from 'components/seo';
import DashboardLayout from '../../components/dashboard/dashboard-layout';
import PersonalisedFeedback from '../../components/dashboard/personalised-feedback';

export default function Page () {
    return (
        <ThemeProvider theme={theme}>
          <StickyProvider>
          <DashboardLayout>
            <PersonalisedFeedback>
            <SEO title="Smart Applicant" />
            </PersonalisedFeedback>
          </DashboardLayout>
          </StickyProvider>
        </ThemeProvider>
      );
};