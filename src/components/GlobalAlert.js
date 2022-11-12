import React from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { useAlertMessage, useSetAlertMessage } from '../store/MainStoreZustand';
import { SlideTransition } from './Transitions';

const GlobalAlert = () => {
  const [alertMessage, setAlertMessage] = [useAlertMessage(), useSetAlertMessage()];
  return (
    <Snackbar open={!!alertMessage} autoHideDuration={6000} onClose={() => setAlertMessage('')} TransitionComponent={SlideTransition}>
      <Alert elevation={6} variant="filled" severity="info" sx={{ width: '100%' }}>
        <AlertTitle>Info</AlertTitle>
        {alertMessage}
      </Alert>
    </Snackbar>
  )
};

export default GlobalAlert