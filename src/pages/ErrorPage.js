import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import { useRouteError } from 'react-router-dom';
import BottomBar from '../components/BottomBar';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <AppBar color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit">Error</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 8 }}>
        <Typography variant="h2" gutterBottom>Opps!</Typography>
        <Typography variant="body1" gutterBottom>Sorry, an unexpected error has occurred.</Typography>
        <Typography variant="body1" gutterBottom>{error.statusText || error.message}</Typography>
      </Container>
      <BottomBar />
    </>
  );
};

export default ErrorPage;
