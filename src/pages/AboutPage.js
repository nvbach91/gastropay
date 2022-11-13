import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as React from 'react';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import LeftDrawer from '../components/LeftDrawer';

const AboutPage = () => {

  return (
    <>
      <LeftDrawer />
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 8, justifyContent: 'center' }}>
        <Typography variant="h6">About</Typography>
      </Container>
      <BottomBar />
    </>
  );
};

export default AboutPage;