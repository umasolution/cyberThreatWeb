import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { openRegisterUser, updateRegisteredUser } from 'src/actions/userMasterAction';

export default function RegisterUser({ register }) {

    const dispatch = useDispatch()

    const userMaster = useSelector(state => state.userMaster)

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [displayAction, setDisplayAction] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [user, setUserDetails] = useState({
        firstname: '',
        lastname: '',
        emailid: '',
        password: '',
        address1: '',
        address2: '',
        state: '',
        country: '',
        phone: '',
        city: '',
        pincode: '',
        subscriptrionId: '',
        uniqueId: '',
        companyname: '',
        notificationId: ''
    });

    useEffect(() => {
        setOpen(register)
    }, [])


    const handleClose = () => {
        setOpen(false);
        dispatch(openRegisterUser(false))
        if (error) {
            dispatch(updateRegisteredUser(!userMaster.updateRegisteredUser))
        }
    };

    const onChangeUserDetails = (changedText, item) => {

        setUserDetails({ ...user, [item]: changedText })
    };

    const onRegisterUser = async () => {
        try {
            const url = 'user/register';
            const register = await Axios.post(url, {
                emailAdd: user.emailid,
                passWord: user.password,
                firstname: user.firstname,
                lastname: user.lastname,
                address1: user.address1,
                address2: user.address2,
                state: user.state,
                country: user.country,
                phone: user.phone,
                subscription_id: user.subscriptrionId,
                unique_id: user.uniqueId,
                city: user.city,
                pincode: user.pincode,
                companyname: user.companyname,
                notification_id: user.notificationId

            })
            setError(register.data.response)
            setErrorMsg(register.data.message)
            setDisplayAction(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                contentStyle={{
                    width: '60%',
                }}
                fullWidth={true}
                maxWidth={'sm'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Register User
                </DialogTitle>
                <DialogContent>
                    <div className='user-details'>
                        <TextField
                            id="outlined-basic"
                            label="Email Id"
                            type='email'
                            variant="outlined"
                            fullWidth
                            className='user-textbox'
                            value={user.emailid}
                            onChange={(event) => onChangeUserDetails(event.target.value, 'emailid')}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type='password'
                            fullWidth
                            className='user-textbox'
                            value={user.password}
                            onChange={(event) => onChangeUserDetails(event.target.value, 'password')}
                        />
                        <div className='sub-div'>
                            <TextField
                                id="outlined-basic"
                                label="Firstname"
                                variant="outlined"
                                type='text'
                                fullWidth
                                className='user-textbox flex-contents'
                                value={user.firstname}
                                onChange={(event) => onChangeUserDetails(event.target.value, 'firstname')}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Lastname"
                                variant="outlined"
                                type='text'
                                fullWidth
                                className='user-textbox flex-contents'
                                value={user.lastname}
                                onChange={(event) => onChangeUserDetails(event.target.value, 'lastname')}
                            />
                        </div>
                        <TextField
                            id="outlined-basic"
                            label="Address1"
                            variant="outlined"
                            type='text'
                            fullWidth
                            className='user-textbox'
                            value={user.address1}
                            onChange={(event) => onChangeUserDetails(event.target.value, 'address1')}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Address2"
                            variant="outlined"
                            type='text'
                            fullWidth
                            className='user-textbox'
                            value={user.address2}
                            onChange={(event) => onChangeUserDetails(event.target.value, 'address2')}
                        />
                        <div className='sub-div'>
                            <TextField
                                id="outlined-basic"
                                label="City"
                                variant="outlined"
                                type='text'
                                fullWidth
                                className='user-textbox flex-contents'
                                value={user.city}
                                onChange={(event) => onChangeUserDetails(event.target.value, 'city')}
                            />
                            <TextField
                                id="outlined-basic"
                                label="State"
                                variant="outlined"
                                type='text'
                                fullWidth
                                className='user-textbox flex-contents'
                                value={user.state}
                                onChange={(event) => onChangeUserDetails(event.target.value, 'state')}
                            />
                        </div>
                        <TextField
                            id="outlined-basic"
                            label="Country"
                            variant="outlined"
                            type='text'
                            fullWidth
                            className='user-textbox'
                            value={user.country}
                            onChange={(event) => onChangeUserDetails(event.target.value, 'country')}
                        />
                        <div className='sub-div'>
                            <TextField
                                id="outlined-basic"
                                label="Phone"
                                variant="outlined"
                                type='number'
                                fullWidth
                                className='user-textbox flex-contents'
                                value={user.phone}
                                onChange={(event) => onChangeUserDetails(event.target.value, 'phone')}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Pincode"
                                variant="outlined"
                                type='text'
                                fullWidth
                                className='user-textbox flex-contents'
                                value={user.pincode}
                                onChange={(event) => onChangeUserDetails(event.target.value, 'pincode')}
                            />
                        </div>
                        <TextField
                            id="outlined-basic"
                            label="Subscription Id"
                            variant="outlined"
                            type='text'
                            fullWidth
                            className='user-textbox'
                            value={user.subscriptrionId}
                            onChange={(event) => onChangeUserDetails(event.target.value, 'subscriptrionId')}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Unique Id"
                            variant="outlined"
                            type='text'
                            fullWidth
                            className='user-textbox'
                            value={user.uniqueId}
                            onChange={(event) => onChangeUserDetails(event.target.value, 'uniqueId')}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Company Name"
                            variant="outlined"
                            type='text'
                            fullWidth
                            className='user-textbox'
                            value={user.companyname}
                            onChange={(event) => onChangeUserDetails(event.target.value, 'companyname')}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Notification Id"
                            variant="outlined"
                            type='text'
                            fullWidth
                            className='user-textbox'
                            value={user.notificationId}
                            onChange={(event) => onChangeUserDetails(event.target.value, 'notificationId')}
                        />
                    </div>
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={() => onRegisterUser()}
                    >
                        Register User
                    </Button>

                </DialogContent>
                <DialogActions>
                    {
                        displayAction ? (
                            <div className={!error ? 'has-error' : 'no-error'}>{errorMsg}</div>
                        ) : <></>
                    }
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
