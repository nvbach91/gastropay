import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { QrReader } from 'react-qr-reader';
import { useRouteError } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import { Stack } from '@mui/material';

const ErrorPage = () => {
  const [isActiveScanner, setIsActiveScanner] = useState(false);
  // const [qrCode, setQrCode] = useState('');
  const error = useRouteError();
  console.error(error);
  const onScannerRead = (result, error) => {
    if (!!result) {
      // setQrCode(result.text);
      window.location.replace(result.text);
    }
    if (!!error) {
      console.error(error);
    }
  };
  return (
    <>
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 8 }}>
        <Typography variant="h2" gutterBottom>Opps!</Typography>
        <Typography variant="body1" gutterBottom>Sorry, an unexpected error has occurred. Please scan the QR code again.</Typography>
        <Stack>
          <Button startIcon={<QrCodeScannerIcon />} variant="contained" onClick={() => setIsActiveScanner((prev) => !prev)}>
            Scan QR code
          </Button>
        </Stack>
        {/* <Typography variant="body2" gutterBottom>{error ? (error.statusText || error.message || '') : ''}</Typography> */}
        {/* <Typography>{qrCode}</Typography> */}
        {isActiveScanner && <QrReader onResult={onScannerRead} constraints={{ facingMode: 'environment' }} />}
      </Container>
      <BottomBar />
    </>
  );
};

export default ErrorPage;
