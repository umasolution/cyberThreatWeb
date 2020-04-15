import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  withRouter
} from 'react-router-dom';
import CVEInput from "../../CVE/CVEInput/CVEInput";
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 200,
    paddingBottom: 200,
    [theme.breakpoints.down('md')]: {
      paddingTop: 60,
      paddingBottom: 60
    }
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '90%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '90%',
      height: 'auto'
    }
  }
}));

function Hero({ className, ...rest }) {
  const classes = useStyles();

  const [searchByCVE, setSearchByCVE] = useState(true);
  const [cveInput, setCVEInput] = useState("");
  const [cveSearchStartDate, setCVESearchStartDate] = useState(new Date());
  const [cveSearchEndDate, setCVESearchEndDate] = useState(new Date());

  const handleChangeCVE = (event) => {
    setCVEInput(event.target.value);
}
  const changeSearchByCVE = (event) => {
    setSearchByCVE(event.target.checked);
};

const onSearchClicked = () => {
  const {history} = {...rest};
  console.log(cveSearchStartDate);
  console.log(cveSearchEndDate);
  
  if(searchByCVE){
    history.push(`/CVE/${cveInput}`);
  } else {
  // history.push(`/CVE/${moment(cveSearchStartDate).format("YYYY-MM-DD")}/${moment(cveSearchEndDate).format("YYYY-MM-DD")}`);
  history.push(`/CVE/${cveSearchStartDate}/${cveSearchEndDate}`);
  }
}

const keyPress = (event) => {
  if (event.keyCode === 13) {
    onSearchClicked();
  }
}

const setCVESearchDate = (dateType, date) => {
  if(dateType === 'startDate'){
    setCVESearchStartDate(date);
  } else{
    setCVESearchEndDate(date);
  }
}


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={5}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Typography
                variant="overline"
                color="secondary"
              >
                Search CVE
              </Typography>
              <CVEInput 
                searchByCVE={searchByCVE}
                cveInput={cveInput}
                changeSearchByCVE={changeSearchByCVE}
                keyPress={keyPress}
                handleChangeCVE={handleChangeCVE}
                onSearchClicked={onSearchClicked}
                isSearching={false}
                setCVESearchDate={setCVESearchDate}
                cveSearchStartDate={cveSearchStartDate}
                cveSearchEndDate={cveSearchEndDate}
              />
              <Box mt={3}>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item>
                    <Typography
                      variant="h1"
                      color="secondary"
                    >
                      30+
                    </Typography>
                    <Typography
                      variant="overline"
                      color="textSecondary"
                    >
                      Demo Pages
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h1"
                      color="secondary"
                    >
                      UX
                    </Typography>
                    <Typography
                      variant="overline"
                      color="textSecondary"
                    >
                      Complete Flows
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h1"
                      color="secondary"
                    >
                      300+
                    </Typography>
                    <Typography
                      variant="overline"
                      color="textSecondary"
                    >
                      Components
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
          >
            <Box position="relative">
              <div className={classes.shape}>
                <img
                  alt="Shapes"
                  src="/static/home/shapes.svg"
                />
              </div>
              <div className={classes.image}>
                <img
                  alt="Presentation"
                  src="/static/home/dark-light.png"
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Hero.propTypes = {
  className: PropTypes.string
};

export default withRouter(Hero);
