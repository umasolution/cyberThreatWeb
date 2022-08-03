import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { openFlexiPopup, openPaymentPopup } from 'src/actions/pricingAction';
import Payment from './index';

export default function PaymentPopup() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const popup = useSelector(state => state.pricing.paymentPopup)

  useEffect(() =>{
    setOpen(popup)
  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(openPaymentPopup(false))
  };

  return (
    <div>
      <Dialog
        open={open}
        contentStyle={{
            width: '80%',
         }}
         fullWidth={true}
        maxWidth = {'md'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
            <Payment />
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
