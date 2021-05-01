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
    LinearProgress

} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        backgroundColor: '#027de7',
        color: 'white',
        width: '100%',
        paddingTop: '5px',
        textAlign: 'center'
    },
    whiteBox: {
        width: '100%',
        height: '30px',
        paddingTop: '5px',
        textAlign: 'center'

    },
    box: {
        height: '20%',
        background: 'linear-gradient(45deg, #99ebff 30%, #e6faff 90%)',
        fontWeight: 'bold'
    },
    grid: {
        margin: '10px',
        backgroundColor: '#f0f0f5'
    },
    link: {
        color: 'white',
        cursor: 'pointer'
    },
    info: {
        paddingBottom: 10
    },
    accordianHeader : {
        marginTop:'0.5%',
        marginLeft:'1%',
     
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


    useEffect(() => {
        // API call
        fetchProductVulnerabilities();
    }, []);


    const fetchProductVulnerabilities = async () => {
        setLoading(true);
        const url = `/details/product`;
        // Below Data is hard coded as this is the only combination which has data. TODO
        const response = await Axios.post(url, { type: "application", application: "tomcat", product: "tomcat" });

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
                            <Typography variant="body2" color="textSecondary" component="p">
                                Python is an interpreted high-level general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant indentation. Its language constructs as well as its object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects
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
                                        <ReportCount header={key} value={header[key]} index={index} gridSize={true} />
                                    )}
                                </>

                            )
                        })
                    }

                </Grid>

                <Grid container spacing={2} className={classes.info}>
                    <Grid item lg={3}
                        sm={6}
                        xs={12}>
                        <Paper elevation={3} className={classes.paperSmall}>
                            <div className={classes.row}>
                                <div className={classes.whiteBox}>
                                    <Typography align="center" variant="caption" >
                                        Latest Version
                         </Typography>
                                </div>
                                <div className={classes.blueBox}>
                                    <Typography align="center" variant="caption" >
                                        <Link className={classes.link}>2.2.3</Link>
                                    </Typography>
                                </div>

                            </div>
                        </Paper>
                    </Grid>

                    <Grid item lg={3}
                        sm={6}
                        xs={12}>
                        <Paper elevation={3} className={classes.paperSmall}>
                            <div className={classes.row}>
                                <div className={classes.whiteBox}>
                                    <Typography align="center" variant="caption" >
                                        Package
                         </Typography>
                                </div>
                                <div className={classes.blueBox}>
                                    <Typography align="center" variant="caption" >
                                        > 5 Years
                         </Typography>
                                </div>

                            </div>
                        </Paper>
                    </Grid>

                    <Grid item lg={3}
                        sm={6}
                        xs={12}>
                        <Paper elevation={3} className={classes.paperSmall}>
                            <div className={classes.row}>
                                <div className={classes.whiteBox}>
                                    <Typography align="center" variant="caption" >
                                        Last Updated
                         </Typography>
                                </div>
                                <div className={classes.blueBox}>
                                    <Typography align="center" variant="caption" >
                                        21st August, 2020
                         </Typography>
                                </div>

                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Accordion square expanded={firstAccordianOpen} onChange={() => { setFirstAccordianOpen(!firstAccordianOpen) }}>
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
                                lg={4}
                                xs={12}
                                className="reports-charts-cwe"
                            >
                                <Grid
                                    item
                                    style={{ marginBottom: 10 }}
                                    lg={12}
                                    xs={12}
                                    className="reports-charts-cwe"
                                >
                                    {
                                        product && product.chart && product.chart.cwe ?
                                            <CWEPieChart title="CWE Chart" cwe={product.chart.cwe} width={400} divId="productVul" /> : ""
                                    }

                                </Grid>
                                <Grid
                                    item
                                    style={{ marginBottom: 10 }}
                                    lg={12}
                                    xs={12}
                                    className="reports-charts-severity"
                                >
                                    {
                                        product && product.chart && product.chart.cwe && product.chart.severity ?
                                            <SeverityBarChart title="Severity Chart" severity={product.chart.severity} width={500} divId="productVul" /> : ""
                                    }

                                </Grid>
                            </Grid>


                            <Grid
                                item
                                style={{ marginBottom: 10 }}
                                lg={8}
                                xs={12}
                                className="reports-charts-cwe"
                            >
                                <PerformanceOverTime chartsMainKey="0" chartsKey="chart3" chartsData={lineChartData} boxHeight={480} />

                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion square
                    expanded={secondAccordianOpen}
                    onChange={() => { setSecondAccordianOpen(!secondAccordianOpen) }}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel2d-header" style={{backgroundColor:'#f6f8fa'}} >
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
                                {tableData ? <LatestProjects project_details={tableData} /> : "Loading ...."}
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