import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import LeftRightImage from './LeftRightImage';
import ThirdSection from './ThirdSection';
import CTA from './CTA';
import FAQS from './FAQS';
import SearchBar from './SearchBar';
import PricingView from './../PricingView';
import FadeIn from 'react-fade-in';


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
      <FadeIn>
        <Hero />
        <Features />
        <ThirdSection />
        {/*<LeftRightImage />*/}
        <PricingView />
        <CTA />
      </FadeIn>
    </Page>
  );
}

export default HomeView;
