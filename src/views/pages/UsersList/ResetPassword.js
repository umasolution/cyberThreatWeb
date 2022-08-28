import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { openResetPassword } from 'src/actions/userMasterAction';


export default function ResetPassword({ reset, user }) {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [respError, setRespError] = useState(false);
    const [respErrorMsg, setRespErrorMsg] = useState('');
    const [displayAction, setDisplayAction] = useState(false);

    useEffect(() => {
        setOpen(reset)
    }, [])


    const handleClose = () => {
        setOpen(false);
        dispatch(openResetPassword(false))
    };

    const handleClickShowPassword = (type) => {
        type == 'new' ? setShowPassword(!showPassword) : setConfirmShowPassword(!showConfirmPassword)
    }

    const resetPassword = async () => {
        if (newPassword == confirmPassword) {
            const url = 'user/register/password'
            const response = await Axios.post(url, {
                userid: user.uuid,
                password: confirmPassword
            })
            setError(false)
            setRespError(response.data.error)
            setRespErrorMsg(response.data.message)
            setDisplayAction(true)
        } else {
            setError(true)
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'xs'}
                overlayStyle={{ backgroundColor: 'transparent' }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Reset Password
                </DialogTitle>
                <DialogContent>
                    <div className='password-text'>
                        <TextField
                            label="New Password"
                            margin="normal"
                            placeholder=''
                            name="New Password"
                            type={showPassword ? 'text' : "password"}
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            variant="outlined"
                            className='user-password'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleClickShowPassword('new')} edge="end">
                                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            margin="normal"
                            placeholder=''
                            name="Confirm Password"
                            type={showConfirmPassword ? 'text' : "password"}
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            variant="outlined"
                            className='user-password'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleClickShowPassword('confirm')} edge="end">
                                            <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>

                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={resetPassword}
                    >
                        Reset Password
                    </Button>

                </DialogContent>
                <DialogActions>
                    {
                        error ? (
                            <div className='has-error'>Password does not match</div>
                        ) : <></>
                    }
                    {
                        displayAction ? (
                            <div className={!respError ? 'has-error' : 'no-error'}>{respErrorMsg}</div>
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
