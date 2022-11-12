import React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SlideTransition } from './Transitions';
import { Typography } from '@mui/material';

const PaymentGatewayDialog = ({ onDialogClose }) => {
  return (
    <Dialog open={true} fullScreen onClose={onDialogClose} TransitionComponent={SlideTransition}>
      <AppBar color="default" elevation={0} sx={{ backgroundColor: '#fff' }}>
        <Toolbar>
          <IconButton onClick={onDialogClose}>
            <ArrowBackIcon />
          </IconButton>
          <Typography noWrap variant="h6">Payment</Typography>
        </Toolbar>
      </AppBar>
      <iframe title="payment-gateway" style={{ border: 'none', flexGrow: 1 }} src="https://www.comgate.cz/platebni-brana"></iframe>
    </Dialog>
  );
};

export default PaymentGatewayDialog;
