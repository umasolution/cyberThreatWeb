import React,{useState} from 'react';
import {Tooltip,makeStyles,Popover,Typography,FormControl,FormLabel,FormGroup,FormControlLabel,Checkbox,Box} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    icon:{
        margin:'7px'
    },
    formControl: {
        margin: theme.spacing(3),
    }

}));

const PopoverContent =() =>{
    const classes =useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const [state, setState] = useState({
        metadata: false,
        poc: false,
        advUpdated: false,
        platformModified:false,
        newReference:false,
        newTweets:false

      });

      const { metadata,poc,advUpdated,platformModified,newReference,newTweets } = state;
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
   

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
                <CreateIcon fontSize="small" className={classes.icon} color="disabled" onClick ={handleClick} />
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
                <Box>
                <FormControl required component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Choose one</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox color="default" checked={metadata} onChange={handleChange} name="metadata" />}
                            label="MetaData"
                        />
                        <FormControlLabel
                            control={<Checkbox color="default" checked={poc} onChange={handleChange} name="poc" />}
                            label="New/Updated Proof of Concept"
                        />
                        <FormControlLabel
                            control={<Checkbox color="default" checked={advUpdated} onChange={handleChange} name="advUpdated" />}
                            label="Advisory Updated"
                        />
                        <FormControlLabel
                            control={<Checkbox color="default" checked={platformModified} onChange={handleChange} name="platformModified" />}
                            label="Platform Modified"
                        />
                        <FormControlLabel
                            control={<Checkbox color="default" checked={newReference} onChange={handleChange} name="newReference" />}
                            label="New Reference"
                        />
                        <FormControlLabel
                            control={<Checkbox color="default" checked={newTweets} onChange={handleChange} name="newTweets" />}
                            label="New Tweets"
                        />
                    </FormGroup>
                   
                </FormControl>
                </Box>
            </Popover>
        </div>
    )
};

export default PopoverContent;