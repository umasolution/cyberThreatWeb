import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import NiahFlexiSubscription from './NiahFlexiSubscription';
import { openFlexiPopup } from 'src/actions/pricingAction';

export default function NiahFlexiPopup() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const popup = useSelector(state => state.pricing.flexiPopup)

  useEffect(() =>{
    setOpen(popup)
  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openFlexiPopup(false))
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        contentStyle={{
          width: '80%',
       }}
       fullWidth={true}
      maxWidth = {'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
            <NiahFlexiSubscription />
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>handleClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
