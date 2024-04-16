import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from 'contexts/app/app.provider';
import theme from 'theme';
import SEO from 'components/seo';
import DashboardLayout from '../../components/dashboard/dashboard-layout';
import DashboardIndex from '../../components/dashboard/dashboard-index';

export default function DashBoardIndexPage () {
    return (
        <ThemeProvider theme={theme}>
          <StickyProvider>
          <DashboardLayout>
            <DashboardIndex>
            <SEO title="Smart Applicant" />
            </DashboardIndex>
          </DashboardLayout>
          </StickyProvider>
        </ThemeProvider>
      );
};