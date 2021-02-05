import Typography from '@material-ui/core/Typography';
import React from 'react';
import Box from '@material-ui/core/Box';

const TabPanel = ({
  children, value, index, ...other
}) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
      style={{width: '100%', backgroundColor: '#fafafc'}}
      
    >
      {value === index && <Box p={3} className="tabs-content-inner">{children}</Box>}
    </Typography>
  );
};

export default TabPanel;
