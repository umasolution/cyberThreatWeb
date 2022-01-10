import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Box, Paper, makeStyles, Divider,TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import Info from './Info';
import Version from './Version';
import Sanbox from './Sanbox';
import Vulnerabilty from './Vulnerability';
import { setAdvisoryResults, setPollingId, setScanning, setSearchTerm } from 'src/actions/advisorAction';
import Score from './Score';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    ...theme.typography.caption,
    textAlign: 'center',

    height: 30,

    margin: '5px',
    padding: '5px',
    display : 'flex'
  },

  divider:{
    marginRight : '3px',
    marginLeft : '3px'
  },
  
  header : {
    fontWeight : 400,
  },

  value : {
    fontWeight : 600,
  }
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AdvisoryTabNav() {
  const [value, setValue] = React.useState(0);

  const styles = useStyles();

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const advisor = useSelector((state) => state.advisor);

  React.useEffect(() => {
    getAdvisory();
  }, []);

  const getAdvisory = async () => {
    const url = `/online/niah/get/advisory`;
    const response = await Axios.post(url, { productname: advisor.selectedProduct.name.split('@')[0] });

    dispatch(setAdvisoryResults(response.data.results));
  }

  const onScan = async () => {
    const url = `/online/niah/advisory`;
    const response = await Axios.post(url, { productname: advisor.selectedProduct.name.split('@')[0] });

    dispatch(setScanning(true));

    dispatch(setPollingId(response.data.result_id));

    poll(response.data.result_id);

    //console.log(response);
  }

  let intervalId = undefined;

  const poll = (result_id) => {
    intervalId = setInterval(() => checkData
      (result_id), 4000);
  }

  const checkData = async (result_id) => {
    const url = `/online/niah/advisory/check`;
    const response = await Axios.post(url, { results_id: result_id });

    if (response.data.status == 'PENDING') {
      // Do nothing
    } else {
      console.log("Success");
      clearInterval(intervalId);

      dispatch(setScanning(false));

      dispatch(setAdvisoryResults(response.data.results));
    }
  }


  const onSearch = (event) =>{
    dispatch(setSearchTerm(event.target.value));
  }

  return (
    <Box sx={{ width: '100%', height: '600px' }}>
      <Grid container>
        <Grid xs={3}>
        <div>
            <Score score={advisor.advisoryResults.score}/>
          </div>
        </Grid>
        <Grid item xs={6}  style={{ padding: '10px' }}>
          <div style={{ display: 'flex' }}>
            <Paper className={styles.paper} elevation={8} >
              <div  className={styles.header} >Package</div>
              <Divider className={styles.divider} orientation="vertical" variant="middle" flexItem />
              <div className={styles.value}>{advisor.advisoryResults.package}</div>


            </Paper>
            <Paper className={styles.paper} elevation={8}>
              <div className={styles.header}>Version</div>
              <Divider className={styles.divider} orientation="vertical" variant="middle" flexItem />
              <div className={styles.value}>{advisor.advisoryResults.version}</div>


            </Paper>
          </div>
          <div style={{ display: 'flex' }}>

            <Paper className={styles.paper} elevation={8}>
              <div className={styles.header}>Dependencies</div>
              <Divider className={styles.divider} orientation="vertical" variant="middle" flexItem />
              <div className={styles.value}>{advisor.advisoryResults.dependencies}</div>
            </Paper>
            <Paper className={styles.paper} elevation={8}>
              <div className={styles.header}>Package Manager</div>
              <Divider className={styles.divider} orientation="vertical" variant="middle" flexItem />
              <div className={styles.value}>{advisor.advisoryResults.packagemanager}</div>
            </Paper>
          </div>
          <div style={{ display: 'flex' }}>
            <Paper className={styles.paper} elevation={8}>
              <div className={styles.value}>{advisor.advisoryResults.install_message}</div>
            </Paper>
         
          </div>
       

        </Grid>
    
        <Grid item xs={3}>
          <div  style={{ display: 'flex',marginBottom: '10px' }}>
            
            <Button style={{ backgroundColor: 'rgb(25, 118, 210)', color: 'rgb(255, 255, 255)', color: 'rgb(255, 255, 255)' }} onClick={onScan}>{advisor.scanning ? 'Scanning' : 'Scan'}</Button>
            <div className={styles.paper} elevation={8} >
                <div className={styles.header}>Last Updated</div>
                <Divider className={styles.divider} orientation="vertical" variant="middle" flexItem />
                <div className={styles.value}>{advisor.advisoryResults.lastupdate}</div>
              </div>
          </div>
        
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TextField  fullwidth label="Search for Anything below"  style={{ width:'100%' }} onChange={(event)=>onSearch(event)}/>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Version/Release" {...a11yProps(1)} />
          <Tab label="Sandbox" {...a11yProps(2)} />
          <Tab label="Vulnerabilty" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Info />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Version />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Sanbox />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Vulnerabilty />
      </TabPanel>
    </Box>
  );
}
