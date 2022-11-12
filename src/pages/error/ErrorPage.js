import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <AppBar position="absolute" color="default" elevation={0}
        sx={{
          backgroundColor: '#fff',
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Error
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 8 }}>
        <Typography variant="h2" gutterBottom>Opps!</Typography>
        <Typography variant="body1" gutterBottom>Sorry, an unexpected error has occurred.</Typography>
        <Typography variant="body1" gutterBottom>{error.statusText || error.message}</Typography>
      </Container>
    </>
  );
};
