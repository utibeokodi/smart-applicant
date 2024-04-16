import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from 'contexts/app/app.provider';
import theme from 'theme';
import SEO from 'components/seo';
import DashboardLayout from '../../components/dashboard/dashboard-layout';
import PaymentForm from '../../components/dashboard/make-payment';

export default function UpgradeAccountPage () {
    return (
        <ThemeProvider theme={theme}>
          <StickyProvider>
          <DashboardLayout>
            <PaymentForm>
            <SEO title="Smart Applicant" />
            </PaymentForm>
          </DashboardLayout>
          </StickyProvider>
        </ThemeProvider>
      );
};