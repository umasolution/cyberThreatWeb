import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import './Login.css'

export default function LicenseDialog() {
  const [open, setOpen] = useState(false);
  const license = useSelector(state => state.license)

  useEffect(() =>{
    if(license.subscriptionMsg.status == 1 || license.subscriptionMsg.status == 1 ){
        handleClickOpen()
    }
  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className={license.subscrptionStatus ? 
          'noError': 'hasError'}>
         {license.subscriptionMsg.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>handleClose()}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
