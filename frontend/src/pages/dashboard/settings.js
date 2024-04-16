import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from 'contexts/app/app.provider';
import theme from 'theme';
import SEO from 'components/seo';
import DashboardLayout from '../../components/dashboard/dashboard-layout';
import Settings from '../../components/dashboard/settings';

export default function SettingsPage () {
    return (
        <ThemeProvider theme={theme}>
          <StickyProvider>
          <DashboardLayout>
            <Settings>
            <SEO title="Smart Applicant" />
            </Settings>
          </DashboardLayout>
          </StickyProvider>
        </ThemeProvider>
      );
};