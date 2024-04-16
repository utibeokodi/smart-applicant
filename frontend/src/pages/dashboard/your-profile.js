import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from 'contexts/app/app.provider';
import theme from 'theme';
import SEO from 'components/seo';
import DashboardLayout from '../../components/dashboard/dashboard-layout';
import UserProfileForm from '../../components/dashboard/profile';

export default function DashBoardProfilePage () {
    return (
        <ThemeProvider theme={theme}>
          <StickyProvider>
          <DashboardLayout>
            <UserProfileForm>
            <SEO title="Smart Applicant" />
            </UserProfileForm>
          </DashboardLayout>
          </StickyProvider>
        </ThemeProvider>
      );
};