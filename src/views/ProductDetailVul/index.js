import Page from 'src/components/Page';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
    Container,
    makeStyles,
    Grid,
    Typography,
    Card,
    CardContent,
    Paper,
    Link,
    LinearProgress,
    Box,List,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,ListItem,ListItemIcon,ListItemText

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

    }

}));


const ProductDetailVul = () => {

    const location = useLocation();
    const classes = useStyles();

    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);

    // This is hardcoded for now but it will be primed from the response once available.
    const lineChartData = getLineChartData();
    const [tableData, setTableData] = useState();

    const [firstAccordianOpen, setFirstAccordianOpen] = useState({ txt: 'Collapse', expand: true });
    const [secondAccordianOpen, setSecondAccordianOpen] = useState({ txt: 'Collapse', expand: true });

    const [loadingRows, setloadingRows] = useState(false);
    const [singlerows, setSingleRows] = useState();

    const [expand, setExpand] = useState(false);
    const [selected, setSelected] = useState([]);

     const onShowMore = () => {
        setExpand(!expand);
     };


    useEffect(() => {
        // API call
        fetchProductVulnerabilities();
    }, []);


    const fetchProductVulnerabilities = async () => {
        setLoading(true);
        const url = `/details/product`;
        // Below Data is hard coded as this is the only combination which has data. TODO
        const response = await Axios.post(url, { type: "application", application: location.state.name.split('@')[1], product:location.state.name.split('@')[1] });

        setProduct(response.data);

        setTableData({ columns: response.data.db.columns, data: response.data.db.results });

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

    };
    
    const handleClickRow = async (event, value) => {
        value = 'CVE-2019-20465';
        
        let url = `/search/cve?cve=${value}`;
        /*const url = `/single-searchcve.php?asds=edd3ddads&cve=${value}`;*/
        setloadingRows(false);
        setSingleRows();
        setloadingRows(true);
        let response = await Axios.get(url);
        setSingleRows(response.data);
        const selectedIndex = selected.indexOf(value);
        let newSelected = [];
        newSelected = newSelected.concat([], value);
        setSelected(newSelected);

    };  

    const getBody = () => {
        return (
            <>
                <Grid

                    style={{ marginTop: 10, marginBottom: 10 }}
                    spacing={2}
                >

                    <Card className={classes.card}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Showing vulnerabilities in  {convertFirstLetterToCaps(location.state.name.split('@')[1])}
                            </Typography>
                            
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
                                            <CweTreeMap title="CWE Chart" cwe={product.chart.cwe} /> : <ErrorDisplay title="CWE Chart" content="No Records to Display."/>
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
                                            <SeverityBarChart title="Severity Chart" severity={product.chart.severity} width={500} divId="productVul" /> :  <ErrorDisplay title="Severity Chart" content="No Records to Display."/>
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
                                className="open_vulnerabilities"
                            >
                                {tableData ? <LatestProjects project_details={tableData} onClickRow = {handleClickRow}/> : "Loading ...."}
                                {loadingRows ? (<div className="open_vulnerabilities">
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        className="cvesearchright"
                                    >
                                        <Box
                                            className="cvesearchright-inner"
                                            borderRadius={5}
                                        >
                                            {singlerows ? (
                                                <>
                                                    <Box className={classes.boxrightheader}
                                                        display="flex"
                                                        flexDirection="column"
                                                        justifyContent="center"
                                                        borderRadius={16}>
                                                        <IconButton className={classes.customizedButton}>
                                                            <HighlightOffIcon onClick={handleRemoveRow} />
                                                        </IconButton>
                                                        <Box className="boxdetailhead">
                                                            <Box className="boxdetailtitle">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    Severity Scores
                                  </Typography>
                                                            </Box>
                                                            <Box className="boxtitlecontent">
                                                                {singlerows.severity ? (
                                                                    <> <Typography variant="body2" color="textSecondary" component="div" className="scoreblock-div">

                                                                        {Object.entries(singlerows.severity).map((severity) => (
                                                                            <>
                                                                                <Box className="scoreblock MuiGrid-grid-md-6">
                                                                                    <Box className="scoreblock-inner">
                                                                                        <Box className="scoretitle">
                                                                                            {severity[0]}
                                                                                        </Box>
                                                                                        <Box className="scorevalue">
                                                                                            {severity[1]}
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Box>
                                                                            </>
                                                                        ))}

                                                                    </Typography>
                                                                    </>
                                                                ) : ''}

                                                                {singlerows.niah_meter ? (
                                                                    <>
                                                                        <Grid
                                                                            className="meter"
                                                                        >
                                                                            <Grid
                                                                                xs={6}
                                                                                md={6}
                                                                                className="meterleft"
                                                                            >
                                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                                    {singlerows.niah_meter.title}
                                                                                </Typography>
                                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                                    <a target="_blank" rel="noopener noreferrer" href={singlerows.niah_meter.patch_now}>Patch Now</a>
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid
                                                                                xs={6}
                                                                                md={6}
                                                                                className="meterright"
                                                                            >
                                                                                <ReactSpeedometer
                                                                                    maxSegmentLabels={0}
                                                                                    width={150}
                                                                                    height={150}
                                                                                    value={singlerows.niah_meter.speedometer.default}
                                                                                    customSegmentStops={parseInt(singlerows.niah_meter.speedometer.segments)}
                                                                                    minValue={parseInt(singlerows.niah_meter.speedometer.min)}
                                                                                    maxValue={parseInt(singlerows.niah_meter.speedometer.max)}
                                                                                    segmentColors={singlerows.niah_meter.speedometer.colors}
                                                                                    needleHeightRatio={0.6}
                                                                                    ringWidth={10}
                                                                                    height={150}
                                                                                    needleColor={'#000000'}
                                                                                    valueFormat={'d'}

                                                                                />

                                                                            </Grid>
                                                                        </Grid>
                                                                    </>
                                                                ) : ''}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    {singlerows.NIAH_Insights ? (
                                                        <>
                                                            <Box className={classes.boxrightheader}
                                                                display="flex"
                                                                flexDirection="column"
                                                                justifyContent="center"
                                                                borderRadius={16}>
                                                                <Box className="boxdetailhead">
                                                                    <Box className="boxdetailtitle">
                                                                        <Typography gutterBottom variant="h5" component="h2">
                                                                            NIAH Insights
                                  </Typography>
                                                                    </Box>
                                                                    <Box className="boxtitlecontent">
                                                                        <Typography variant="body2" color="textSecondary" component="div">
                                                                            <List component="ul" className="niahinsightlist">
                                                                                {Object.values(singlerows.NIAH_Insights).map((insights) => (
                                                                                    <>
                                                                                        <ListItem>
                                                                                            <ListItemIcon>
                                                                                                <SendIcon />
                                                                                            </ListItemIcon>
                                                                                            <ListItemText>{insights}</ListItemText>
                                                                                        </ListItem>
                                                                                    </>
                                                                                ))}
                                                                            </List>
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Box>

                                                        </>
                                                    )
                                                        : ''}
                                                    {singlerows.snapshot ? (
                                                        <>
                                                            <Box className={classes.boxrightheader}
                                                                display="flex"
                                                                flexDirection="column"
                                                                justifyContent="center"
                                                                borderRadius={16}>
                                                                <Box className="boxdetailhead">
                                                                    <Box className="boxdetailtitle">
                                                                        <Typography gutterBottom variant="h5" component="h2">
                                                                            Vulnerability Snapshot
                                  </Typography>
                                                                    </Box>
                                                                    <Box className="boxtitlecontent">
                                                                        <Typography variant="body2" color="textSecondary" component="div">
                                                                            <List component="ul" className="snapshotlist">
                                                                                {Object.entries(singlerows.snapshot).map((snapshot) => (
                                                                                    <>
                                                                                        {snapshot[1] ? (
                                                                                            <>
                                                                                                {snapshot[0] == "Description" ? (
                                                                                                    <ListItem>
                                                                                                        <ListItemText>
                                                                                                            <Box className="snapshot-title">{snapshot[0]} :  </Box>
                                                                                                            <Box className="snapshot-content description"><ShowMoreText
                                                                                                                lines={3}
                                                                                                                more={"Read More"}
                                                                                                                less={"Less More"}
                                                                                                                onClick={onShowMore}
                                                                                                                expanded={expand}
                                                                                                                maxWidth={500}
                                                                                                            >
                                                                                                                {snapshot[1]}
                                                                                                            </ShowMoreText></Box>
                                                                                                        </ListItemText>
                                                                                                    </ListItem>
                                                                                                ) : <ListItem>
                                                                                                    <ListItemText>
                                                                                                        {snapshot[0] == "publishedDate" ? (<>
                                                                                                            <Box className="snapshot-title">Published Date: </Box>
                                                                                                            <Box className="snapshot-content">{moment(snapshot[1]).format('MMM DD, YYYY')}</Box></>) :
                                                                                                            (<>
                                                                                                                <Box className="snapshot-title">{snapshot[0]} : </Box>
                                                                                                                <Box className="snapshot-content">{snapshot[1]}</Box>
                                                                                                            </>)}
                                                                                                    </ListItemText>
                                                                                                </ListItem>}
                                                                                            </>) : ''}
                                                                                    </>
                                                                                ))}
                                                                            </List>
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Box>

                                                        </>
                                                    )
                                                        : ''}
                                                    {singlerows.Exploits ? (
                                                        <>
                                                            <Box className={classes.boxrightheader}
                                                                display="flex"
                                                                flexDirection="column"
                                                                justifyContent="center"
                                                                borderRadius={16}>
                                                                <Box className="boxdetailhead">
                                                                    <Box className="boxdetailtitle">
                                                                        <Typography gutterBottom variant="h5" component="h2">
                                                                            Exploits
                                  </Typography>
                                                                    </Box>
                                                                    <Box className="boxtitlecontent explo-list">
                                                                        <List style={{ width: '100%' }} dense={false}>
                                                                            {Object.keys(singlerows.Exploits).map((cKey, index) =>
                                                                                <ExpansionPanel
                                                                                    key={cKey}
                                                                                    style={{ width: '100%' }}
                                                                                >
                                                                                    <ExpansionPanelSummary
                                                                                        expandIcon={<ExpandMoreIcon />}
                                                                                        aria-controls="panel1a-content"
                                                                                        id="panel1a-header"
                                                                                    >
                                                                                        <Typography component="h2">
                                                                                            {singlerows.Exploits[cKey].Advisory}
                                                                                        </Typography>
                                                                                    </ExpansionPanelSummary>
                                                                                    <ExpansionPanelDetails>
                                                                                        <Typography
                                                                                            variant="caption"
                                                                                            color="textSecondary"
                                                                                        >
                                                                                            {Object.keys(singlerows.Exploits[cKey].Reference).map((rKey) =>
                                                                                                <a target="_blank" style={{ display: 'inline-block' }} href={singlerows.Exploits[cKey].Reference[rKey]}>{singlerows.Exploits[cKey].Reference[rKey]}</a>
                                                                                            )}
                                                                                        </Typography>
                                                                                    </ExpansionPanelDetails>
                                                                                </ExpansionPanel>
                                                                            )}
                                                                        </List>
                                                                    </Box>
                                                                </Box>
                                                            </Box>

                                                        </>
                                                    )
                                                        : ''}

                                                </>
                                            )
                                                : (<> <Box className={classes.boxrightheader}
                                                    display="flex"
                                                    flexDirection="column"
                                                    justifyContent="center"
                                                    borderRadius={16}>
                                                    <Box className="boxdetailhead">
                                                        <Box className="boxdetailtitle">
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                <Skeleton animation="wave" height="20px" width="100%" />
                                                            </Typography>
                                                        </Box>
                                                        <Box className="boxtitlecontent">
                                                            <Skeleton animation="wave" height="100px" width="100%" />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                    <Box className={classes.boxrightheader}
                                                        display="flex"
                                                        flexDirection="column"
                                                        justifyContent="center"
                                                        borderRadius={16}>
                                                        <Box className="boxdetailhead">
                                                            <Box className="boxdetailtitle">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    <Skeleton animation="wave" height="20px" width="100%" />
                                                                </Typography>
                                                            </Box>
                                                            <Box className="boxtitlecontent">
                                                                <Skeleton animation="wave" height="200px" width="100%" />
                                                            </Box>
                                                        </Box>
                                                    </Box> <Box className={classes.boxrightheader}
                                                        display="flex"
                                                        flexDirection="column"
                                                        justifyContent="center"
                                                        borderRadius={16}>
                                                        <Box className="boxdetailhead">
                                                            <Box className="boxdetailtitle">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    <Skeleton animation="wave" height="20px" width="100%" />
                                                                </Typography>
                                                            </Box>
                                                            <Box className="boxtitlecontent">
                                                                <Skeleton animation="wave" height="200px" width="100%" />
                                                            </Box>
                                                        </Box>
                                                    </Box><Box className={classes.boxrightheader}
                                                        display="flex"
                                                        flexDirection="column"
                                                        justifyContent="center"
                                                        borderRadius={16}>
                                                        <Box className="boxdetailhead">
                                                            <Box className="boxdetailtitle">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    <Skeleton animation="wave" height="20px" width="100%" />
                                                                </Typography>
                                                            </Box>
                                                            <Box className="boxtitlecontent">
                                                                <Skeleton animation="wave" height="200px" width="100%" />
                                                            </Box>
                                                        </Box>
                                                    </Box> </>)}
                                        </Box>

                                    </Grid>
                                </div>) : ''}
                            </Grid>
                        </Grid>
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
        </Page>

    );
}

export default ProductDetailVul;