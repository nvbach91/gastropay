import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import LeftDrawer from '../components/LeftDrawer';
import { useTheme, useSetTheme } from '../store/MainStoreZustand';

const SettingsPage = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = [useTheme(), useSetTheme()];
  const handleChangeTheme = (e) => {
    const t = e.target.checked ? 'dark' : 'light';
    setTheme(t);
    localStorage.setItem('theme', t);
  };
  return (
    <>
      <LeftDrawer />
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 8, justifyContent: 'center' }}>
        <Typography variant="h6">Settings</Typography>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Dark mode</Typography>
            <Switch checked={theme === 'dark' || (prefersDarkMode && theme !== 'light')} onChange={handleChangeTheme} />
          </Stack>

        </Paper>
      </Container>
      <BottomBar />
    </>
  );
};

export default SettingsPage;