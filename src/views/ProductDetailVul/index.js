import Page from 'src/components/Page';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router';
import {
    Container,
    makeStyles,
    Button,
    Grid,
    Drawer,
    Typography,
    Card,
    CardContent,
    Paper,
    Link,
    LinearProgress,
    Tooltip,
    Box, List, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ListItem, ListItemIcon, ListItemText

} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Axios from 'axios';
import CWEPieChart from '../../views/ProductsReports/ReportSummary/CWEPieChart/CWEPieChart';
import SeverityBarChart from '../../views/ProductsReports/ReportSummary/SeverityBarChart/SeverityBarChart';
import ReportCount from '../ProductsReports/ReportCount/ReportCount';
import './ProductDetailVul.css';
import lineChartData from './data/lineChartData';
import PerformanceOverTime from '../reports/DashboardView/PerformanceOverTime';
import getLineChartData from './data/lineChartData';
import LatestProjects from '../../views/reports/DashboardView/LatestProjects';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Skeleton from '@material-ui/lab/Skeleton';
import ShowMoreText from "react-show-more-text";
import ReactSpeedometer from "react-d3-speedometer"
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';
import DisplayDetail from './DisplayDetail';
import CweTreeMap from './CweTreeMap';
import ErrorDisplay from './ErrorDisplay';
import VulDrawerComponent from './VulDrawerComponent';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import {setAlert,delAlert} from '../../views/management/Alerts/AlertFunctions';
import { useDispatch, useSelector } from 'react-redux';
import AdvisoryModal from '../Advisor';
import { setSelectedProduct } from 'src/actions/advisorAction';




const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    container: {
        [theme.breakpoints.up('xs')]: {
        }
    }, formControl: {
        margin: 0,
        minWidth: 120,
    },
    productDetails: {
        fontSize: '16px'
    },
    card: {
        width: '100%',
        padding: 10,
        overflow: 'auto'
    },
    row: {
        display: 'inline-flex',
        width: '100%'
    },
    blueBox: {
        backgroundColor: theme.palette.info.dark,
        width: '100%',
        paddingTop: '5px',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: '600',
        color: 'white'
    },
    whiteBox: {
        backgroundColor: theme.palette.common.white,
        width: '100%',
        height: '30px',
        paddingTop: '5px',
        textAlign: 'center'


    },
    boxContent: {

        fontSize: '14px',
        fontWeight: '600'
    },
    box: {
        height: '20%',
        background: 'linear-gradient(45deg, #99ebff 30%, #e6faff 90%)',

    },
    grid: {
        margin: '10px',
        backgroundColor: '#f0f0f5'
    },
    link: {

        cursor: 'pointer'
    },
    info: {
        paddingBottom: 10
    },
    accordianRoot: {
        backgroundColor: theme.palette.background.dark,
    },
    accordianHeader: {
        marginTop: '0.5%',
        marginLeft: '1%',
        textTransform: 'upperCase',
        fontWeight: '600'

    },
    dragger: {
        width: '5px',
        cursor: 'ew-resize',
        padding: '4px 0 0',
        borderTop: '1px solid #ddd',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: '100',
        backgroundColor: '#f4f7f9'
    },
    alertIcon : {
        marginLeft: '10px',
        color: '#3949ab' 

    }

}));


const ProductDetailVul = () => {

    const location = useLocation();
    const classes = useStyles();
    const type = useSelector((state) => state.sidebar.selectedSideBarItem);

    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const [alertsOn,setAlertsOn] = useState(false);

    // This is hardcoded for now but it will be primed from the response once available.
    const lineChartData = getLineChartData();
    const [tableData, setTableData] = useState();

    const [firstAccordianOpen, setFirstAccordianOpen] = useState({ txt: 'Collapse', expand: true });
    const [secondAccordianOpen, setSecondAccordianOpen] = useState({ txt: 'Collapse', expand: true });

    const [loadingRows, setloadingRows] = useState(false);
    const [singlerows, setSingleRows] = useState();

    const [expand, setExpand] = useState(false);
    const [selected, setSelected] = useState([]);

    const defaultDrawerWidth = 400;

    const [openDrawer, setOpenDrawer] = useState(false);

    


    const dispatch = useDispatch();

    useEffect(() => {
        // API call
        fetchProductVulnerabilities();
        setAlertStatus(location.state.name);

        //setProduct
        dispatch(setSelectedProduct(location.state.product));
       
    }, []);

    const setAlertStatus = async (productName) => {
        const url =`/alerts/lists`;
        const response = await Axios.get(url);
        if(!response.data){
            return;
        }
       const alertList = response.data;
       
       alertList.map((alerts) => {   
           if(alerts.alert_name === productName)
           setAlertsOn(true);
       })
       
    }


    const fetchProductVulnerabilities = async () => {
        setLoading(true);
        try {
           
        const url = `/details/product`;
        // Below Data is hard coded as this is the only combination which has data. TODO
        //const response = await Axios.post(url, { type: "application", application: "tomcat", product: "tomcat" });
        const response = await Axios.post(url, { /*type: location.state.selData*/type: type, 
                                                application: location.state.name.split('@')[1], 
                                                product: location.state.name.split('@')[0] });
        

        setProduct(response.data);

        setTableData({ columns: response.data.db.columns, data: response.data.db.results });
        
        }
        catch(error)
        {
            console.log(error);
           
        }
        setLoading(false);

       
    }

    const convertFirstLetterToCaps = (word) => {
        return <b>{word.replace(word.charAt(0), word.charAt(0).toUpperCase())}</b>
    }

    const getLoader = () => {
        if (loading) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
    };

    const handleRemoveRow = async (event, value) => {
        setloadingRows(false);
        setSingleRows(false);
        setloadingRows(false);

        const selectedIndex = selected.indexOf(value);
        let newSelected = [];
        newSelected = newSelected.concat([], []);
        setSelected(newSelected);
        setOpenDrawer(false);


    };

    const handleClickRow = async (event, value) => {
        value = 'CVE-2019-20465';

        let url = `/search/cve?cve=${value}`;
        /*const url = `/single-searchcve.php?asds=edd3ddads&cve=${value}`;*/
        setloadingRows(true);
        setSingleRows();
        setloadingRows(true);
        let response = await Axios.get(url);
        setSingleRows(response.data);
        const selectedIndex = selected.indexOf(value);
        let newSelected = [];
        newSelected = newSelected.concat([], value);
        setSelected(newSelected);
        setOpenDrawer(true);

    };

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const onNiahAdvisoryClick = () => {
        setOpen(true);
    }

    const [open,setOpen] = useState(false);


    const handleAdvisoryModalClose = () =>{
        setOpen(false);
    }

    const getBody = () => {
        return (
            <>
                <Grid

                    style={{ marginTop: 10, marginBottom: 10 }}
                    spacing={2}
                >

                    <Card className={classes.card}>
                        <CardContent style={{display:"inline-flex"}}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Showing vulnerabilities in  {convertFirstLetterToCaps((location.state.name).split('@')[1])}
                            </Typography>
                            <div>
                            {alertsOn?<Tooltip title="Remove Alert">
                                <NotificationsOffIcon className={classes.alertIcon} onClick={() => {delAlert(location.state.name,"product");setAlertsOn(false);}}/>
                            </Tooltip>:<Tooltip title="Set Alert">
                                <AddAlertIcon className={classes.alertIcon} onClick={() => {setAlert(location.state.name,"product");setAlertsOn(true);}}/>
                            </Tooltip>
                           }
                           </div>
                           <Button style={{float:'right'}} onClick={onNiahAdvisoryClick} >Niah Advisory</Button>
                           
                        </CardContent>
                    </Card>


                </Grid>
                <Grid
                    container
                    style={{ marginTop: 10, marginBottom: 10 }}
                    spacing={2}
                    className="report-dashboardData"
                >

                    {
                        product && product.header.map((header, index) => {

                            return (
                                <>
                                    {Object.keys(header).map((key, index) =>
                                        <DisplayDetail header={key} value={header[key]} index={index} gridSize={true} />
                                    )}
                                </>

                            )
                        })
                    }

                </Grid>

                {/*  <Grid container spacing={2} className={classes.info}>
                    <Grid item lg={4}
                        sm={6}
                        xs={12}>
                        <Paper elevation={3} className={classes.paperSmall}>
                            <div className={classes.row}>
                                <div className={classes.blueBox}>
                                    <Typography className={classes.boxContent} align="center" variant="caption" >
                                        Latest Version
                         </Typography>
                                </div>
                                <div className={classes.whiteBox}>
                                    <Typography className={classes.boxContent} align="center" variant="caption" >
                                        <Link className={classes.link}>2.2.3</Link>
                                    </Typography>
                                </div>

                            </div>
                        </Paper>
                    </Grid>

                    <Grid item lg={4}
                        sm={6}
                        xs={12}>
                        <Paper elevation={3} className={classes.paperSmall}>
                            <div className={classes.row}>
                                <div className={classes.blueBox}>
                                    <Typography className={classes.boxContent} align="center" variant="caption" >
                                        Package
                         </Typography>
                                </div>
                                <div className={classes.whiteBox}>
                                    <Typography className={classes.boxContent} align="center" variant="caption" >
                                        > 5 Years
                         </Typography>
                                </div>

                            </div>
                        </Paper>
                    </Grid>

                    <Grid item lg={4}
                        sm={6}
                        xs={12}>
                        <Paper elevation={3} className={classes.paperSmall}>
                            <div className={classes.row}>
                                <div className={classes.blueBox}>
                                    <Typography className={classes.boxContent} align="center" variant="caption" >
                                        Last Updated
                         </Typography>
                                </div>
                                <div className={classes.whiteBox}>
                                    <Typography className={classes.boxContent} align="center" variant="caption" >
                                        21st August, 2020
                         </Typography>
                                </div>

                            </div>
                        </Paper>
                    </Grid>
                </Grid>*/}
                <Accordion className={classes.accordianRoot} square expanded={firstAccordianOpen} onChange={() => { setFirstAccordianOpen(!firstAccordianOpen) }}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{ backgroundColor: '#f6f8fa' }}>
                        <IconButton aria-label="expand row" size="small" onClick={() => setFirstAccordianOpen(!firstAccordianOpen)}>
                            {firstAccordianOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        <Typography className={classes.accordianHeader} variant="h5">Vulnerability Statistics</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            spacing={2}
                            className="report-summary-box"
                        >

                            <Grid
                                item
                                style={{ marginBottom: 10 }}
                                lg={6}
                                xs={12}
                                className="reports-charts-cwe"
                            >
                                {
                                    product && product.chart && product.chart.cwe && Object.keys(product.chart.cwe).length > 0 ?
                                        //<CWEPieChart title="CWE Chart" cwe={product.chart.cwe} width={400} divId="productVul" /> : ""
                                        <CweTreeMap title="CWE Chart" cwe={product.chart.cwe} /> : <ErrorDisplay title="CWE Chart" content="No Records to Display." />
                                }

                            </Grid>
                            <Grid
                                item
                                style={{ marginBottom: 10 }}
                                lg={6}
                                xs={12}
                                className="reports-charts-severity"
                            >
                                {
                                    product && product.chart && product.chart.cwe && product.chart.severity && Object.keys(product.chart.severity).length > 0 ?
                                        <SeverityBarChart title="Severity Chart" severity={product.chart.severity} width={500} divId="productVul" /> : <ErrorDisplay title="Severity Chart" content="No Records to Display." />
                                }


                            </Grid>



                            {/* <Grid
                                item
                                style={{ marginBottom: 10 }}
                                lg={8}
                                xs={12}
                                className="reports-charts-cwe"
                            >
                                <PerformanceOverTime chartsMainKey="0" chartsKey="chart3" chartsData={lineChartData} boxHeight={480} />

                           </Grid> */}

                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.accordianRoot} square
                    expanded={secondAccordianOpen}
                    onChange={() => { setSecondAccordianOpen(!secondAccordianOpen) }}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel2d-header" style={{ backgroundColor: '#f6f8fa' }} >
                        <IconButton aria-label="expand row" size="small" onClick={() => setSecondAccordianOpen(!secondAccordianOpen)}>
                            {secondAccordianOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        <Typography className={classes.accordianHeader} variant="h5">Open Vulnerabilities</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                style={{ marginTop: 10, marginBottom: 10 }}
                                spacing={2}
                                lg={12}
                                xl={12}
                                xs={12}
                            >

                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Vulnerabilities in  {convertFirstLetterToCaps(location.state.name.split('@')[1])} by version.
                                </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            These vulnerabilities are found in this {convertFirstLetterToCaps(location.state.name.split('@')[1])} package and not in its depedencies.
                                </Typography>
                                    </CardContent>
                                </Card>


                            </Grid>
                            <Grid
                                item
                                lg={12}
                                xl={12}
                                xs={12}
                                className = "open_vulnerabilities"

                            >
                                {tableData ? <LatestProjects project_details={tableData} onClickRow={handleClickRow} /> : "Loading ...."}
                            </Grid>

                        </Grid>
                        {loadingRows ? (<>
                        <VulDrawerComponent openDrawer={openDrawer} closeDrawer={closeDrawer} singlerows = {singlerows} handleRemoveRow={handleRemoveRow} />                            
                        </>) : ''}
                    </AccordionDetails>
                </Accordion>


            </>
        )
    }

    return (
        <Page
            className={classes.root}
        >
            <Container
                maxWidth={false}
                className={classes.container}>
                {loading ? getLoader() : getBody()}
            </Container>
            <AdvisoryModal open={open} onClose={handleAdvisoryModalClose} />
        </Page>

    );
}

export default ProductDetailVul;