import { LinearProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Feed.css';
import useStyles from './FeedStyle';
import TabsData from './TabsData/TabsData';
import Copy from "../../Util/Copy";
import CONSTANTS from "../../Util/Constants";
import MySnackbar from "../../Shared/Snackbar/MySnackbar";


export const Feed = (/* {   } */) => {

    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);
    const [loadingTabs, setLoadingTabs] = useState(false);
    const [tabsName, setTabsName] = useState([]);
    const [tabsData, setTabsData] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const {feedType} = useParams();

    useEffect(() => {
        fetchFeed();
    }, [feedType]);

    const fetchFeed = async () => {
        try {
            setLoadingTabs(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            const url = "http://cyberthreatinfo.ca/vuln";
            const response = await Axios.get(url);
            if (Object.keys(response.data).length > 0) {
                const tempTabsData = [];
                Object.keys(response.data).forEach(key => {
                    if(key === feedType){
                        tempTabsData.push(response.data[key])
                    }
                })
                setTabsData(tempTabsData);
            }
            setTabsName([feedType]);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
            setLoadingTabs(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
            setLoadingTabs(false);
        }
    }

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const getTabs = () => {
        if (tabsName && tabsName.length > 0) {
            return tabsName.map(tab => {
                return <Tab label={tab} key={tab} />
            })
        }
    }

    const fetchFeedData = async (data, tabIndexParams) => {
        const url = `http://cyberthreatinfo.ca${data.uri}`;;
        const response = await Axios.get(url);
        if (response.data) {
            const copyData = Copy(tabsData);
            const orginalData = copyData[tabIndexParams].find((d) => d.appName === data.appName);
            orginalData.tableData = response.data;
            const linkColumn = orginalData.tableData.columns[0];
            linkColumn.render = (rowData) => {
                return <Link target="_blank" to={`/CVE/${rowData.cve_id}`}>{rowData.cve_id}</Link>
            }
            setTabsData(copyData);
        }
    }

    const expandPanel = (event, expanded, tabData) => {
        console.log(event, expanded, tabData);
        if (expanded && !tabData.tableData) {
            fetchFeedData(tabData, tabIndex);
        }
    }

    const getTabsData = (tab) => {
        return <TabsData tab={tab} tabsData={tabsData} expandPanel={expandPanel} />
    }

    const getLoader = () => {
        if (loadingTabs) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
    }

    const updateSnackbar = (open, message) => {
        setSnackbarOpen(open);
        setSnackbarMessage(message)
    }

    return (
        <div className={classes.root}>
            {loadingTabs ? getLoader() : null}
            {tabsData.length > 0 && getTabsData(tabIndex)}
            <MySnackbar closeSnackbar={() => updateSnackbar(false,'')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />
        </div>
    );
};

export default Feed;