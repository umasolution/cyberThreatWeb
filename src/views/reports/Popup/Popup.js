import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { Formik } from 'formik';
import {
    Box,
    InputLabel,
    Select,
    TextField,
    Typography,
    FormControl,
    MenuItem,
    ListItemText,
    List,
    ListItem,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import './popup.css'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closeBetweenPages, setOpenPopup, setPopUpDetails } from 'src/actions/popupAction';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function PopUp(openPop) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [ssl, setSSL] = React.useState(false);
    const [fireware, setFireWare] = React.useState('');
    const [signup, setSignup] = React.useState('');
    const [activate, setActivate] = React.useState('');
    const [feed, setFeed] = React.useState('');
    const [checkbox, setCheckBox] = React.useState('');
    const [domain, setDomain] = React.useState([]);
    const [domainInput, setDomainInput] = React.useState('');
    const [responseMsg, setResponseMsg] = React.useState('');
    const [error, setError] = React.useState(false);
    const profileDetails = useSelector(state => state.popup.details)
    const popupOpen = useSelector(state => state.popup)

    React.useEffect(() => {
        if(popupOpen.enable){
            setError(false)
            setResponseMsg('')
            setOpen(popupOpen.open)
            setFireWare(profileDetails.auto_firware_update)
            setSignup(profileDetails.auto_signup)
            setActivate(profileDetails.activation_by_email)
            setFeed(profileDetails.auto_update_feed_signature)
            setDomain(profileDetails.allow_domains)
            setCheckBox(profileDetails.niah_config_pop_up)
            setSSL(profileDetails.email_ssl)
        }
    }, [popupOpen.open, popupOpen.close])

    
    const handleClose = () => {
        setOpen(false);
        dispatch(closeBetweenPages(true))
        dispatch(setOpenPopup(false))
    };


    const handleChangeActivate = (event) => {
        setActivate(event.target.value)
    }
    const handleChangeFeed = (event) => {
        setFeed(event.target.value)
    }
    const handleChangeFireware = (event) => {
        setFireWare(event.target.value)
    }
    const handleChangeSignup = (event) => {
        setSignup(event.target.value)
    }
    const handleChangeSSL = (event) => {
        setSSL(event.target.value)
    }

    const handleCheckbox = async (event) => {
        console.log(event.currentTarget.checked)
        if (event.currentTarget.checked == false) {
            setCheckBox('disable')
            const url = "niah/profile/pop_up"
            const response = await Axios.post(url,{
                status: 'disable'
            }
            )
        }else {
            setCheckBox('enable')
            const url = "niah/profile/pop_up"
            const response = await Axios.post(url,{
                status: 'enable'
            }
            )
        }
        
    }

    const postDomainValues = () => {
        if(domainInput != ""){
        setDomain([...domain, domainInput])
        setDomainInput('')
        }
    }

    const postPopupValues = async (values) => {
        console.log(checkbox)
        const url = "niah/profile"
        const response = await Axios.post(url,
            {
                celery_ip: values.celery_ip,
                celery_username: values.celery_username,
                celery_password: values.celery_password,
                celery_vhost: values.celery_vhost,
                auto_signup: signup,
                allow_domain: domain,
                activation_by_email: activate,
                email_server: values.email_server,
                email_port: values.email_port,
                email_username: values.email_username,
                email_password: values.email_password,
                email_ssl: ssl,
                auto_update_feed_signature: feed,
                auto_firware_update: fireware,
                niah_config_pop_up: checkbox
            }
        )
        setError(response.data.error)
        setResponseMsg(response.data.message)

    }

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>

                </BootstrapDialogTitle>
                <DialogContent dividers>
                   
                    <Formik
                        initialValues={{
                            celery_ip: profileDetails.celery_ip,
                            celery_username: profileDetails.celery_username,
                            celery_password: profileDetails.celery_password,
                            celery_vhost: profileDetails.celery_vhost,
                            // auto_signup: profileDetails.auto_signup,
                            // allow_domains: profileDetails.allow_domains,
                            // activation_by_email: profileDetails.activation_by_email,
                            email_server: profileDetails.celery_username,
                            email_port: profileDetails.email_server,
                            email_username: profileDetails.email_username,
                            email_password: profileDetails.email_password,
                            email_ssl: profileDetails.email_ssl,
                            // auto_update_feed_signature: profileDetails.auto_update_feed_signature,
                            // auto_firware_update: profileDetails.auto_firware_update,
                            // niah_config_pop_up: profileDetails.niah_config_pop_up,
                            celery_ip: profileDetails.celery_ip,
                        }}

                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            touched,
                            values
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                            >
                                <div className='main-div'>
                                    <div className='content-div'>
                                        <div>
                                            <h3 className='section-title'>Celery Setting</h3>
                                            <div className='section-contents-input'>
                                            <div className='sub-div'>
                                    <TextField
                                            fullWidth
                                            label="Celery Ip"
                                            margin="normal"
                                            name="celery_ip"
                                            type="text"
                                            className='flex-contents'
                                            value={values.celery_ip}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            variant="outlined"
                                            //error={Boolean(errors.companyName && touched.companyName)}
                                            //helperText={touched.companyName && errors.companyName}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Celery Username"
                                            margin="normal"
                                            name="celery_username"
                                            type="text"
                                            className='flex-contents'
                                            value={values.celery_username}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                    </div>
                                    <div className='sub-div'>
                                    <TextField
                                            fullWidth
                                            label="Celery Password"
                                            margin="normal"
                                            name="celery_password"
                                            type="password"
                                            className='flex-contents'
                                            value={values.celery_password}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Celery Vhost"
                                            margin="normal"
                                            name="celery_vhost"
                                            type="text"
                                            className='flex-contents'
                                            value={values.celery_vhost}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                    </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='section-title'>Email Setting</h3>
                                            <div className='section-contents-input'>
                                            <TextField
                                            fullWidth
                                            label="Email Server"
                                            margin="normal"
                                            name="email_server"
                                            type="text"
                                            value={values.email_server}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                        <div className='sub-div'>
                                            <TextField
                                                fullWidth
                                                label="Email Username"
                                                margin="normal"
                                                name="email_username"
                                                type="text"
                                                className='flex-contents'
                                                value={values.email_username}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                label="Email Password"
                                                margin="normal"
                                                name="email_password"
                                                type="password"
                                                fullWidth
                                                className='flex-contents'
                                                value={values.email_password}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className='sub-div'>
                                            <TextField
                                                fullWidth
                                                label="Email Port"
                                                margin="normal"
                                                name="values"
                                                type="tetx"
                                                value={values.email_port}
                                                className='flex-contents'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                             <Box sx={{ minWidth: 240 }} className='flex-contents-select single-select'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-select-small"
                                                    >Email SSL</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small"
                                                        id="demo-select-small"
                                                        value={ssl}
                                                        label="activation_by_email"
                                                        onChange={(event) => handleChangeSSL(event)}
                                                    >
                                                        <MenuItem value={'true'}>True</MenuItem>
                                                        <MenuItem value={'false'}>False</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='section-title'>Signup Setting</h3>
                                            <div className='section-contents-input'>
                                                
                                        <div className='sub-div'>
                                            <TextField
                                                label="Allow Domains"
                                                margin="normal"
                                                className='flex-contents domain'
                                                name="domain_input"
                                                type="text"
                                                value={domainInput}
                                                onBlur={handleBlur}
                                                onChange={(event) => setDomainInput(event.target.value)}
                                                variant="outlined"
                                            />
                                            <Box mt={2}>
                                                <LoadingButton
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    onClick={() => postDomainValues(values)}
                                                >
                                                    Add
                                                </LoadingButton>
                                            </Box>
                                            <div className='flex-contents-allow'>
                                            {
                                                        domain.map(val => (
                                                            <div className='flex-contents-domain'>
                                                               {val} 
                                                            <br></br>
                                                            </div>
                                                        ))
                                                    }

                                            </div>
                                            
                                        </div>

                                        <div className='sub-div select-groups'>
                                            <Box sx={{ minWidth: 240 }} className='flex-contents-select'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-select-small"
                                                    >Activation By Email</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small"
                                                        id="demo-select-small"
                                                        value={activate}
                                                        label="activation_by_email"
                                                        onChange={(event) => handleChangeActivate(event)}
                                                    >
                                                        <MenuItem value={'yes'}>Yes</MenuItem>
                                                        <MenuItem value={'no'}>No</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box sx={{ minWidth: 240 }} className='flex-contents-select'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-select-small"
                                                    >Auto Signup</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small"
                                                        id="demo-select-small"
                                                        value={signup}
                                                        label="auto_signup"
                                                        onChange={(event) => handleChangeSignup(event)}
                                                    >
                                                        <MenuItem value={'yes'}>Yes</MenuItem>
                                                        <MenuItem value={'no'}>No</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='section-title'>Update Setting</h3>
                                            <div className='section-contents-input'>
                                            <div className='sub-div select-groups'>
                                            <Box sx={{ minWidth: 240 }} className='flex-contents-select'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-select-small"
                                                    >Auto Fire Update</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small"
                                                        id="demo-select-small"
                                                        value={fireware}
                                                        label="auto_firware_update"
                                                        onChange={(event) => handleChangeFireware(event)}
                                                    >
                                                        <MenuItem value={'yes'}>Yes</MenuItem>
                                                        <MenuItem value={'no'}>No</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box sx={{ minWidth: 240 }} className='flex-contents-select'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-select-small"
                                                    >Auto Update Feed Signature</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small"
                                                        id="demo-select-small"
                                                        value={feed}
                                                        label="auto_update_feed_signature"
                                                        onChange={(event) => handleChangeFeed(event)}
                                                    >
                                                        <MenuItem value={'yes'}>Yes</MenuItem>
                                                        <MenuItem value={'no'}>No</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>
                                            </div>
                                       
                                        </div>
                                        
                                        <FormControlLabel control={<Checkbox 
                                        defaultChecked={profileDetails.niah_config_pop_up == "disable" ? false : true}
                                         />}
                                            label="Do you need open popup all the time of admin user login ?"
                                            onChange={(event) => handleCheckbox(event)}
                                        />
                                        <Box mt={2}>
                                            <LoadingButton
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                onClick={() => postPopupValues(values)}
                                            >
                                                Update Changes
                                            </LoadingButton>
                                        </Box>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    {
                        responseMsg != "" ?
                            <p className={error ? 'hasError' : 'noError'}>{responseMsg}</p> : <></>
                    }
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
