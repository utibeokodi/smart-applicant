import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from 'contexts/app/app.provider';
import theme from 'theme';
import SEO from 'components/seo';
import DashboardLayout from '../../components/dashboard/dashboard-layout';
import CreateNewApplyBoard from 'components/dashboard/create-new-apply-board';

export default function CreateNewPrepPage () {
    return (
        <ThemeProvider theme={theme}>
          <StickyProvider>
          <DashboardLayout>
            <CreateNewApplyBoard>
            <SEO title="Smart Applicant" />
            </CreateNewApplyBoard>
          </DashboardLayout>
          </StickyProvider>
        </ThemeProvider>
      );
};