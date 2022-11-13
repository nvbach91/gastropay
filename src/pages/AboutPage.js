import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as React from 'react';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import LeftDrawer from '../components/LeftDrawer';
import { useSettings } from '../store/MainStoreZustand';

const AboutPage = () => {
  const settings = useSettings();
  return (
    <>
      <LeftDrawer />
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 8, justifyContent: 'center' }}>
        <Typography variant="h6">About</Typography>
        <Typography variant="body1">{settings.business?.name}</Typography>
      </Container>
      <BottomBar />
    </>
  );
};

export default AboutPage;