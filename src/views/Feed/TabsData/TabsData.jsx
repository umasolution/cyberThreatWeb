import React from 'react';
import {
  Grid,
  List,
  ExpansionPanel,
  ExpansionPanelSummary,
  ListItem,
  ListItemIcon,
  ListItemText,
  ExpansionPanelDetails,
  Container, makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from 'material-table';
import TabPanel from '../TabPanel/TabPanel';


const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: 'inherit' //theme.palette.background.paper,
  }
}));

const TabsData = ({ reportType, tabsData, expandPanel, bgcolor }) => {

  const classes = useStyles();


  const getTable = (tabData) => {
    return (
      <MaterialTable
        title={tabData.appName}
        columns={tabData.tableData.columns}
        data={tabData.tableData.data}
        style={{ width: '100%' }}
      />
    );
  };

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid style={{width: '100%'}} container spacing={1}>
            <List style={{width: '100%'}} dense={false}>
              {tabsData.map((tabData) => {
                return (
                  <ExpansionPanel
                    key={tabData.appName}
                    style={{borderLeft: `15px solid  ${bgcolor}`, width: '100%'}} 
                    onChange={(event, expanded) =>
                      expandPanel(event, expanded, tabData, reportType)
                    }
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <ListItem key={tabData.appName}>
                        <ListItemIcon>
                          <img
                            className="languageImg"
                            src={`${process.env.PUBLIC_URL}/static/images1/${tabData.imageName}`}
                            alt="t"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={tabData.appName}
                          secondary={tabData.description}
                        />
                      </ListItem>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {tabData.tableData
                        ? getTable(tabData)
                        : 'Loading Data...'}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })}
            </List>
      </Grid>
    </Container>
  );
};

export default TabsData;
