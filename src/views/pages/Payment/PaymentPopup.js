import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCost, openFlexiPopup, openPaymentPopup, setDisablePay, setErrorMsg, setTotalScans, setUsers, updateSubscription } from 'src/actions/pricingAction';
import Payment from './index';
import { useHistory } from 'react-router';
import './paymentPopup.css'

export default function PaymentPopup() {
  const dispatch = useDispatch()
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const popup = useSelector(state => state.pricing.paymentPopup)
  const error = useSelector(state => state.pricing.transactionResponse)
  const licenseError = useSelector(state => state.pricing.errorMsg)
  const selectedModel = useSelector(state => state.pricing.selectedSubscriptionModel)
  useEffect(() =>{
    setOpen(popup)
  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setDisablePay(false))
    dispatch(setErrorMsg({}))
    if(selectedModel == "Free" || selectedModel == "NiahLite"){
      dispatch(setTotalScans(0));
      dispatch(getTotalCost());
      dispatch(setUsers(0));
      dispatch(getTotalCost());
    }
   
    if((error.status == 0 || error.status == 1)){
      dispatch(updateSubscription(true))
    //  history.push('/app/dashboard/pricing')
    }
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
        maxWidth = {selectedModel == 'Free' ? 'sm' : 'md'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
            <Payment />
        </DialogContent>
        <DialogActions>
        {error.status == 0 || error.status == 1  ? (
              <p className={error.status == 0 ? 'status0' : 'status1'} >{error.message}</p>
          ) : <></>} <br></br>
          {licenseError.status || !licenseError.status ? (
              <p className={licenseError.status ? 'status0' : 'status1'} >{licenseError.message}</p>
          ) : <></>}
          <Button onClick={() =>handleClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
