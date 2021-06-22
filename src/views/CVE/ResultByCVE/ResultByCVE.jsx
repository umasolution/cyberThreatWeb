import React from 'react';
import {
    Box, Container, Divider, Grid, LinearProgress, makeStyles, TextField, Typography,
    List,
    ExpansionPanel,
    ExpansionPanelSummary,
    ListItem,
    ListItemIcon,
    ListItemText,
    ExpansionPanelDetails,
    Paper,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import './ResultByCVE.css';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import isEmpty from './../../../Util/Util';


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
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.primary,
        overflow: 'auto',
    },
    title: {
        color: theme.palette.primary.light,
        display: 'inline',
        marginRight: '5px',
        textTransform: 'capitalize'
    },
    // borderDiv: {
    //     border: '1px',
    //     borderStyle: 'solid',
    //     borderRadius: '10px',
    //     borderColor: 'brown',
    //     marginTop: '5px',
    //     overflow: 'auto',
    //     scrollBehavior: 'auto',
    //     padding: '10px'
    // }
}));

const ResultByCVE = ({ cveNVDDetails, cveTables, cve }) => {

    const classes = useStyles();


    const getCVEExpansionPanel = (Items) => {
        if (cveTables && cveTables.length > 0) {
            return cveTables.map((table) => {
                return (
                    <div key={table} style={{ margin: '16px 0 10px 0' }}>
                        {
                            table.data.map(data => {
                                return (
                                    // <div key={data} className={classes.borderDiv} style={{ width: '100%' }}>
                                    <Paper className="paper paper-border">
                                        <div className="background-shadow background-margin">
                                            {table.tableHeader}
                                        </div>
                                        {Object.keys(data).map(lan => {
                                            return (
                                                <p key={lan} className="odd-even-background">
                                                    <span style={{ marginRight: '10px' }}>


                                                        <Typography
                                                            variant="h6"
                                                            className={classes.title}
                                                        >
                                                            {lan}
                                                        </Typography>

                                                    </span>
                                                    <Typography
                                                        className={classes.secondaryText}
                                                    >
                                                        {!(data[lan].includes && (data[lan].includes('https://') || data[lan].includes('http://'))) ? (data[lan]) :
                                                            (
                                                                <a target="_blank" rel="noopener noreferrer" href={data[lan]}>{data[lan]}</a>
                                                            )}
                                                    </Typography>

                                                </p>
                                            )
                                        })}
                                    </Paper>
                                    // {/* </div> */ }
                                )
                            })
                        }
                    </div>

                );

            });
        }
        return null;
    }

    const getCVEHeaderGrid12 = () => {
        return (
            <Grid item xs={12}
            >
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Paper color="primary.main"  className={[classes.paper, 'paper-border'].join(' ')}>
                            <div className="flex">
                                <div className="background-shadow background-margin">
                                    C
                            </div>
                                <Typography className="secondaryText right-p" >
                                    {cve}
                                </Typography>
                            </div>

                        </Paper>
                    </Grid>
                    {
                        cveNVDDetails.Product ? (
                            <Grid item xs={4}>
                                <Paper  className={[classes.paper, 'paper-border'].join(' ')}>
                                    <div className="flex">
                                        <div className="background-shadow background-margin">
                                            P
                            </div>
                                        <Typography className="secondaryText right-p" >
                                            {cveNVDDetails.Product}
                                        </Typography>
                                    </div>

                                </Paper>
                            </Grid>
                        )
                            : null
                    }
                    {
                        cveNVDDetails.Vendor ? (
                            <Grid item xs={4}>
                                <Paper   className={[classes.paper, 'paper-border'].join(' ')}>
                                    <div className="flex">
                                        <div className="background-shadow background-margin">
                                            V
                            </div>
                                        <Typography className="secondaryText right-p" >
                                            {cveNVDDetails.Vendor}
                                        </Typography>
                                    </div>
                                </Paper>
                            </Grid>
                        )
                            : null
                    }
                </Grid>

            </Grid>
        );
    }
   

    const getReference = (References) => {
        return (
        <Grid item xs={12}
        className="accordian-sec mb-3"  
        >
            <Typography
              variant="h5"
              color="textSecondary"
            >
              Reference 
            </Typography>
            <ExpansionPanel
                    key='References'
                    style={{ width: '100%' }}
                    className="accordian-block"
                  > 
                  <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="references-content"
                      id="references-header"
                    >
                    <Typography variant="h3" component="h2">
                        Reference 
                    </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                       <Typography
                            variant="caption"
                            color="textSecondary"
                          >
                            {References.split(',').map(url => <a target="_blank" style={{ display: 'inline-block' }} href={url}>{url}</a>)}
                          </Typography>
                    </ExpansionPanelDetails>
               </ExpansionPanel>
            
        </Grid>                
        )
    }

    const getCVVScoreDetail = (cveNVDDetails) => {
        return (
        <Grid item xs={12}
        className="accordian-sec mb-3" 
        >
            <Typography
              variant="h5"
              color="textSecondary"
            >
              CVSS Score Details 
            </Typography>
            <ExpansionPanel
                    key='References'
                    style={{ width: '100%' }}
                    className="accordian-block"
                  > 
                  <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="references-content"
                      id="references-header"
                    >
                    <Typography variant="h3" component="h2">
                        CVSS 2.0 
                    </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                       <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableBody>
                                 {Object.entries(cveNVDDetails.CVSS20).map(([key, value]) => (
                                   <TableRow key={key}>
                                      <TableCell component="th" scope="row">
                                        {key}
                                      </TableCell>
                                      <TableCell align="right">{value}</TableCell>
                                    </TableRow>
                                ))}                                
                            </TableBody>
                          </Table>
                        </TableContainer>
                    </ExpansionPanelDetails>
               </ExpansionPanel>
              <ExpansionPanel
                    key='References'
                    style={{ width: '100%' }}
                    className="accordian-block"
                  > 
                  <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="references-content"
                      id="references-header"
                    >
                    <Typography variant="h3" component="h2">
                        CVSS 3.0 
                    </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                       <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="simple table">
                            <TableBody>
                                 {Object.entries(cveNVDDetails.CVSS30).map(([key, value]) => (
                                   <TableRow key={key}>
                                      <TableCell component="th" scope="row">
                                        {key}
                                      </TableCell>
                                      <TableCell align="right">{value}</TableCell>
                                    </TableRow>
                                ))}                                
                            </TableBody>
                          </Table>
                        </TableContainer>
                    </ExpansionPanelDetails>
               </ExpansionPanel> 
            
        </Grid>                
        )
    }

    

    const getExploits = (cveNVDDetails) => {
        return (
            <Grid item xs={12}>
                <Typography
                  variant="h5"
                  color="textSecondary"
                >
                  Exploits 
                </Typography>
                <List style={{ width: '100%' }} dense={false}>
                   {!isEmpty(cveNVDDetails.Exploits) ? Object.keys(cveNVDDetails.Exploits).map((cKey, index) => 
                       <ExpansionPanel
                            key={cKey}
                            style={{ width: '100%' }}
                          > 
                          <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                            <Typography variant="h5" component="h5" style={{marginBottom:"5px"}}>
                                {cveNVDDetails.Exploits[cKey].Advisory}
                            </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                               <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    {Object.keys(cveNVDDetails.Exploits[cKey].Reference).map((rKey) =>
                                        <a target="_blank" style={{ display: 'inline-block' }} href={cveNVDDetails.Exploits[cKey].Reference[rKey]}>{cveNVDDetails.Exploits[cKey].Reference[rKey]}</a>
                                    )}
                                  </Typography>
                            </ExpansionPanelDetails>
                       </ExpansionPanel>
                   ) :''}  
                </List>
            </Grid>
        )
    }

    const getProducts = (productsdata) => {
        return (
            <Grid item xs={12}
            className="cve-product-table"
            >
                <MaterialTable
                    title="Products"
                    columns={productsdata.columns}
                    data={productsdata.data}
                    style={{ width: '100%' }}
                    className="secondary table-inner"
                    options={{
                      toolbarStyle: {
                        fontSize: 19,
                        fontFamily: '"Montserrat",sans-serif !important',
                        fontWeight: 600,
                  
                      },
                      cellStyle: {
                        fontSize: 19,
                        fontFamily: '"Montserrat",sans-serif !important',
                        fontWeight: 600
                      },
                      headerStyle: {
                        fontSize: 19,
                        fontFamily: '"Montserrat",sans-serif !important',
                        color: '#546e7a',
                        fontWeight: 600,
                        borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        marginBottom:'5px'
                      },
                      rowStyle: x => {
                        if (x.tableData.id % 2 === 0) {
                           
                        }
                    }
                    }}
                  />
            </Grid>
        )
    }

    const getAdvisory = (Advisorydata) => {
        return (
            <Grid item xs={12}
            className="cve-product-table"
            >
                <MaterialTable
                    title={Advisorydata.title}
                    columns={Advisorydata.columns}
                    data={Advisorydata.data}
                    style={{ width: '100%' }}
                    className="secondary"
                    options={{
                      toolbarStyle: {
                        fontSize: 19,
                        fontFamily: '"Montserrat",sans-serif !important',
                        fontWeight: 600
                      },
                      cellStyle: {
                        fontSize: 19,
                        fontFamily: '"Montserrat",sans-serif !important',
                        fontWeight: 600
                      },
                      headerStyle: {
                        fontSize: 19,
                        fontFamily: '"Montserrat",sans-serif !important',
                        color: '#546e7a',
                        fontWeight: 600,
                        borderBottom: '1px solid rgba(224, 224, 224, 1)'
                      },
                      rowStyle: x => {
                        if (x.tableData.id % 2 === 0) {
                            
                        }
                    }
                    }}
                  />
            </Grid>
        )
    }


    const getCVENVDDetails = () => {
        return (
            <div>
                <Grid container spacing={1}
                className="cve-detail-main"
                >
                    <Grid item xs={12}
                        className="datepub-block mb-5"
                    >
                        <Grid container spacing={1}
                            className="box-shadow"
                        >
                            <Grid item xs={12}
                                className="pubdate-title"
                            >
                                <Typography variant="h1" component="h2">
                                    {cve}
                                </Typography>
                                {cveNVDDetails.pub_date ? (
                                    <>
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                            className="pub_date"
                                        >
                                            Date Published : {moment(cveNVDDetails.pub_date).fromNow()}
                                        </Typography>
                                    </>
                                )
                                    : ''}

                            </Grid>
                            <Grid item xs={12}
                                className="pubdate-button"
                            >
                                {cveNVDDetails.CVSS30.attackVector ? (
                                    <>
                                        <Typography
                                            variant="h5"
                                            color="textSecondary"
                                            className="acce-vact"
                                        >
                                            AccessVector
                                  </Typography>
                                        <Typography
                                            variant="h5"
                                            color="textSecondary"
                                            className={classes.attackVector}
                                        >
                                            {cveNVDDetails.CVSS30.attackVector}
                                        </Typography>
                                    </>
                                )
                                    : ''}
                            </Grid>
                        </Grid>
                      


                    </Grid>
                
                    <Grid item xs={12}
                    className="mb-5"
                    >
                        <Grid container spacing={4}>
                            {cveNVDDetails.CVSS30['baseScore'] ? (
                                <>  
                                    <Grid item xs={4}
                                     className="baseScore-block" 
                                    >
                                    <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} elevation={3} className={[classes.paper, 'baseScore-block-inner'].join(' ')}>
                                        <div className="baseScore-box">
                                            <div className="baseScore-block-title">
                                                CVSS 3.0 Score
                                            </div>
                                            <Typography
                                                variant="h1"
                                                color="secondary"
                                                className="base-score-value"
                                            >
                                                {cveNVDDetails.CVSS30['baseScore']}
                                            </Typography>
                                        </div>
                                    </Paper>
                                    </Grid>
                                </>
                            )
                                : ''}
                            {cveNVDDetails.CVSS20['baseScore'] ? (
                                <>  
                                    <Grid item xs={4}
                                    className="baseScore-block"
                                    >
                                    <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} elevation={3} className={[classes.paper, 'baseScore-block-inner'].join(' ')}>
                                        <div className="baseScore-box">
                                            <div className="baseScore-block-title">
                                                CVSS 2.0 Score
                                            </div>
                                            <Typography
                                                variant="h1"
                                                color="secondary"
                                                className="base-score-value"
                                            >
                                                {cveNVDDetails.CVSS20['baseScore']}
                                            </Typography>
                                        </div>
                                    </Paper>
                                    </Grid>
                                </>
                            )
                                : ''}
                            {cveNVDDetails.CWE ? (
                                <>  
                                    <Grid item xs={4}
                                    className="baseScore-block"
                                    >
                                    <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} elevation={3} className={[classes.paper, 'baseScore-block-inner'].join(' ')}>
                                        <div className="baseScore-box">
                                            <div className="baseScore-block-title">
                                                CWE
                                            </div>
                                            <Typography
                                                variant="h1"
                                                color="secondary"
                                                className="base-score-value"
                                            >
                                                {cveNVDDetails.CWE}
                                            </Typography>
                                        </div>
                                    </Paper>
                                    </Grid>
                                </>
                            )
                                : ''}
                                
                            {cveNVDDetails.vulnerabilitytype ? (
                                <>  
                                    <Grid item xs={4}
                                    className="baseScore-block"
                                    >
                                    <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} elevation={3} className={[classes.paper, 'baseScore-block-inner'].join(' ')}>
                                        <div className="baseScore-box">
                                            <div className="baseScore-block-title">
                                                Vulnerability Type(s)
                                            </div>
                                            <Typography
                                                variant="h1"
                                                color="secondary"
                                                className="base-score-value"
                                            >
                                                {cveNVDDetails.vulnerabilitytype}
                                            </Typography>
                                        </div>
                                    </Paper>
                                    </Grid>
                                </>
                            )
                                : ''}            
                        </Grid>        
                    </Grid>
                    
                    {cveNVDDetails.title ? (
                        <>
                         <Grid item xs={12} className="cve-title mb-3">
                            <Typography
                              variant="h5"
                              color="textSecondary"
                            >
                              Title 
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textPrimary"
                            >
                              {cveNVDDetails.title}
                            </Typography>
                         </Grid>
                        </>
                        
                    )
                        : ''}
                    {cveNVDDetails.description ? (
                        <>
                        <Grid item xs={12}
                        className="mb-3 cve-descp"
                        >
                            <Typography
                              variant="h5"
                              color="textSecondary"
                            >
                              Description 
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textPrimary"
                            >
                              {cveNVDDetails.description}
                            </Typography>
                         </Grid>
                        </>
                        
                    )
                        : ''}
                    {!isEmpty(cveNVDDetails.Exploits)?getExploits(cveNVDDetails):''}       
                    {!isEmpty(cveNVDDetails.Reference) ? getReference(cveNVDDetails.Reference) : ''}
                    {getCVVScoreDetail(cveNVDDetails)}
                    {!isEmpty(cveNVDDetails.Products) ? getProducts(cveNVDDetails.Products) : ''}
                    {!isEmpty(cveNVDDetails.microsoft_advisory) ? getAdvisory(cveNVDDetails.microsoft_advisory) : ''}
                    {!isEmpty(cveNVDDetails.library_advisory) ? getAdvisory(cveNVDDetails.library_advisory) : ''}
                    {!isEmpty(cveNVDDetails.plugin_advisory) ? getAdvisory(cveNVDDetails.plugin_advisory) : ''}
                    {!isEmpty(cveNVDDetails.application_advisory) ? getAdvisory(cveNVDDetails.application_advisory) : ''}
                    {!isEmpty(cveNVDDetails.platform_advisory) ? getAdvisory(cveNVDDetails.platform_advisory) : ''}
                    
                </Grid>
            </div>
        );
    }
    const noCVENVDDetails = () => {
        return (
           
                <Grid container spacing={1}
                className="cve-detail-main"
                >
                    <Grid item xs={12}
                    className="datepub-block mb-5"
                    >
                        <Grid container spacing={1} 
                        className="box-shadow"  
                        >
                            <Grid item xs={4}
                            className="pubdate-title"   
                            >
                                <Typography variant="h1" component="h2">
                                    <Skeleton animation="wave" height="20px" width="100%" />
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    className="pub_date"
                                  >
                                   <Skeleton animation="wave" height="20px" width="100%" />
                                </Typography>
                            </Grid>
                            <Grid item xs={5}
                            className="pubdate-button"
                            >
                                <Typography
                                    variant="h5"
                                    color="textSecondary"
                                    className="acce-vact"
                                  >
                                    <Skeleton animation="wave" height="20px" width="100%" />
                                  </Typography>
                                <Typography
                                    variant="h5"
                                    color="textSecondary"
                                    className={classes.attackVector}
                                  >
                                    <Skeleton animation="wave" height="20px" width="100%" />
                                  </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}
                    className="mb-5"
                    >
                        <Grid container spacing={4}>
                                <Grid item xs={3}
                                 className="baseScore-block" 
                                >
                                <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} elevation={3} className={[classes.paper, 'baseScore-block-inner'].join(' ')}>
                                    <div className="baseScore-box">
                                        <div className="baseScore-block-title">
                                            <Skeleton animation="wave" height="20px" width="100%" />
                                        </div>
                                        <Typography
                                            variant="h1"
                                            color="secondary"
                                            className="base-score-value"
                                        >
                                            <Skeleton animation="wave" height="20px" width="100%" />
                                        </Typography>
                                    </div>
                                </Paper>
                                </Grid>
                                <Grid item xs={3}
                                 className="baseScore-block" 
                                >
                                <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} elevation={3} className={[classes.paper, 'baseScore-block-inner'].join(' ')}>
                                    <div className="baseScore-box">
                                        <div className="baseScore-block-title">
                                            <Skeleton animation="wave" height="20px" width="100%" />
                                        </div>
                                        <Typography
                                            variant="h1"
                                            color="secondary"
                                            className="base-score-value"
                                        >
                                            <Skeleton animation="wave" height="20px" width="100%" />
                                        </Typography>
                                    </div>
                                </Paper>
                                </Grid>
                                <Grid item xs={3}
                                 className="baseScore-block" 
                                >
                                <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} elevation={3} className={[classes.paper, 'baseScore-block-inner'].join(' ')}>
                                    <div className="baseScore-box">
                                        <div className="baseScore-block-title">
                                            <Skeleton animation="wave" height="20px" width="100%" />
                                        </div>
                                        <Typography
                                            variant="h1"
                                            color="secondary"
                                            className="base-score-value"
                                        >
                                            <Skeleton animation="wave" height="20px" width="100%" />
                                        </Typography>
                                    </div>
                                </Paper>
                                </Grid>
                                <Grid item xs={3}
                                 className="baseScore-block" 
                                >
                                <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} elevation={3} className={[classes.paper, 'baseScore-block-inner'].join(' ')}>
                                    <div className="baseScore-box">
                                        <div className="baseScore-block-title">
                                            <Skeleton animation="wave" height="20px" width="100%" />
                                        </div>
                                        <Typography
                                            variant="h1"
                                            color="secondary"
                                            className="base-score-value"
                                        >
                                            <Skeleton animation="wave" height="20px" width="100%" />
                                        </Typography>
                                    </div>
                                </Paper>
                                </Grid>
                                
                                      
                        </Grid>        
                    </Grid>
                    
                    
                     <Grid item xs={12} className="cve-title mb-3">
                        <Typography
                          variant="h5"
                          color="textSecondary"
                        >
                           <Skeleton animation="wave" height="20px" width="100%" /> 
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                        >
                           <Skeleton animation="wave" height="20px" width="100%" />
                        </Typography>
                     </Grid>
                        
                    <Grid item xs={12} className="cve-title mb-3">
                        <Typography
                          variant="h5"
                          color="textSecondary"
                        >
                           <Skeleton animation="wave" height="20px" width="100%" /> 
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                        >
                           <Skeleton animation="wave" height="20px" width="100%" />
                        </Typography>
                     </Grid> 

                     <Grid item xs={12} className="cve-title mb-3">
                        <Typography
                          variant="h5"
                          color="textSecondary"
                        >
                           <Skeleton animation="wave" height="20px" width="100%" /> 
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                        >
                           <Skeleton animation="wave" height="20px" width="100%" />
                        </Typography>
                     </Grid> 

                     <Grid item xs={12} className="cve-title mb-3">
                        <Typography
                          variant="h5"
                          color="textSecondary"
                        >
                           <Skeleton animation="wave" height="20px" width="100%" /> 
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                        >
                           <Skeleton animation="wave" height="20px" width="100%" />
                        </Typography>
                     </Grid>    

                </Grid>
           
        );
    }

    const getByCVEData = () => {
        return (
            <>
                {cveNVDDetails ? (<>
                    <div>
                        {getCVENVDDetails()}
                    </div>
                    <div style={{ margin: '10px 0 10px 0', width: '100%' }} >
                        {getCVEExpansionPanel(cveNVDDetails.Products)}
                    </div>
                </>)
                    :
                    noCVENVDDetails()
                    }
                
            </>
        )
    }

    return (
        getByCVEData()
    );
};

export default ResultByCVE;