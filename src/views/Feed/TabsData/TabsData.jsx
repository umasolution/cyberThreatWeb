import React from 'react';
import {
  Grid,
  List,
  ExpansionPanel,
  ExpansionPanelSummary,
  ListItem,
  ListItemIcon,
  ListItemText,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from 'material-table';
import TabPanel from '../TabPanel/TabPanel';

const TabsData = ({ tab, tabsData, expandPanel }) => {
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
    <TabPanel value={tab} index={tab}>
      <Grid container spacing={1}>
            <List style={{width: '100%'}} dense={false}>
              {tabsData.map((tabData) => {
                return (
                  <ExpansionPanel
                    key={tabData.appName}
                    onChange={(event, expanded) =>
                      expandPanel(event, expanded, tabData)
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
    </TabPanel>
  );
};

export default TabsData;
