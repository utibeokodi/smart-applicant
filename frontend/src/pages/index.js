import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from 'sections/banner';
import UltimateFeatures from 'sections/ultimate-features';
import IntroVideo from 'sections/intro-video';
import UsefulFeatures from 'sections/additional-features';
import Pricing from 'sections/pricing';
import Faq from 'sections/faq';
import WorkFlow from 'sections/how-it-works';

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="Smart Applicant" />
        <Banner />
        <UltimateFeatures />
        <IntroVideo />
        <WorkFlow/>
        <UsefulFeatures />
        <Pricing />
        <Faq />
      </Layout>
    </ThemeProvider>
  );
}
