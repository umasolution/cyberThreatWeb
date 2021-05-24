import React,{useState} from 'react';
import {Tooltip,makeStyles,Popover,Typography} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    icon:{
        margin:'3px'
    }

}));

const PopoverContent =() =>{
    const classes =useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
   

    const handleClick = (event) => {
        event.stopPropagation();
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    return (
        <div>
            <Tooltip title="Settings">
                <CreateIcon className={classes.icon} color="action" onClick ={handleClick} />
            </Tooltip>
            <Popover
                
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={(e)=>e.stopPropagation()}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography >The content of the Popover.</Typography>
            </Popover>
        </div>
    )
};

export default PopoverContent;