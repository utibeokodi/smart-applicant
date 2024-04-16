import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from 'contexts/app/app.provider';
import theme from 'theme';
import SEO from 'components/seo';
import DashboardLayout from '../../components/dashboard/dashboard-layout';
import ViewApplyBoards from 'components/dashboard/view-apply-boards';

export default function ViewPrepPage () {
    return (
        <ThemeProvider theme={theme}>
          <StickyProvider>
          <DashboardLayout>
            <ViewApplyBoards>
            <SEO title="Smart Applicant" />
            </ViewApplyBoards>
          </DashboardLayout>
          </StickyProvider>
        </ThemeProvider>
      );
};