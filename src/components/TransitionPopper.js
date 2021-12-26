import * as React from 'react';
import {Box, Fade, Popper} from '@material-ui/core';


import InfoIcon from '@material-ui/icons/Info';
import { DataUsageRounded } from '@material-ui/icons';

export default function TransitionsPopper({callback,data}) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
     <InfoIcon style={{color:'gray',marginLeft:'5px'}}onClick={handleClick}/>
      <Popper id={id} open={open} anchorEl={anchorEl} transition style={{zIndex:999999,
                                                                backgroundColor:'rgb(2, 136, 209)',
                                                                fontSize:'.70rem', 
                                                                borderRadius:'4px',
                                                                fontFamily:'Roboto, Helvetica, Arial, sans-serif',
                                                                fontWeight:'0.80rem',
                                                                color:'rgb(255, 255, 255)'
                                                                }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{ border: 1, p: 1 }}>
              {callback(data)}
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}