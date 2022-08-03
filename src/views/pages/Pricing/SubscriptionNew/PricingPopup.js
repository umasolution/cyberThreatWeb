import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import NiahFlexiSubscription from './NiahFlexiSubscription';
import { openFlexiPopup, openPricingPopup } from 'src/actions/pricingAction';
import NiahLite from '../NiahLite';
import NiahEnterprise from '../NiahEnterprise';
import { TabPanel } from '@mui/lab';
import {
  Box,
  TextField,
  Typography
} from '@material-ui/core';

export default function PricingPopup(licenseDetails) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const popup = useSelector(state => state.pricing.pricingPopup)
  useEffect(() => {
    setOpen(popup)
  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openPricingPopup(false))
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent >
          <TextField
            id="outlined-name"
            label="Code"
            value={licenseDetails.licenseDetails.code}
            inputProps={
              { readOnly: true, }
            }
            className='flex-contents'
          />
          <TextField
            id="outlined-name"
            label="Scans"
            value={licenseDetails.licenseDetails.scans}
            inputProps={
              { readOnly: true, }
            }
            className='flex-contents'
          />
          <TextField
            id="outlined-name"
            label="Status"
            value={licenseDetails.licenseDetails.status}
            inputProps={
              { readOnly: true, }
            }
            className='flex-contents'
          // onChange={handleChange}
          />
          <TextField
            id="outlined-name"
            label="Subscription"
            value={licenseDetails.licenseDetails.subscription}
            inputProps={
              { readOnly: true, }
            }
            className='flex-contents'
          />
          <TextField
            id="outlined-name"
            label="Users"
            value={licenseDetails.licenseDetails.users}
            inputProps={
              { readOnly: true, }
            }
            className='flex-contents'
          // onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
