import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import CTA from './CTA';
import FAQS from './FAQS';
import PricingView from './../PricingView';

const useStyles = makeStyles(() => ({
  root: {}
}));

function HomeView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <Hero />
      <Features />
      <PricingView />
      <Testimonials />
      <CTA />
      <FAQS />
    </Page>
  );
}

export default HomeView;