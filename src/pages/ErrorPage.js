import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouteError } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 8 }}>
        <Typography variant="h2" gutterBottom>Opps!</Typography>
        <Typography variant="body1" gutterBottom>Sorry, an unexpected error has occurred.</Typography>
        <Typography variant="body1" gutterBottom>{error ? (error.statusText || error.message || '') : ''}</Typography>
      </Container>
      <BottomBar />
    </>
  );
};

export default ErrorPage;
