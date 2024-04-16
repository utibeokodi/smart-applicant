import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
import 'components/modal/modal.css';
import 'typeface-dm-sans';
import Head from 'next/head';
import 'swiper/swiper-bundle.min.css';
import 'rc-drawer/assets/index.css';
import 'react-modal-video/css/modal-video.min.css';
import 'react-credit-cards/es/styles-compiled.css';

export default function CustomApp({ Component, pageProps }) {
  useEffect(() => {
    initGA();
    logPageView();
    Router.events.on('routeChangeComplete', logPageView);
  }, []);
  <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" />
  </Head>
  return <Component {...pageProps} />;
}
