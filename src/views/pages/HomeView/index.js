import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import LeftRightImage from './LeftRightImage';
import CTA from './CTA';
import FAQS from './FAQS';
import SearchBar from './SearchBar';
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
      {/*<LeftRightImage />
      <PricingView />*/}
      <CTA />
    </Page>
  );
}

export default HomeView;
