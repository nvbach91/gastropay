import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={theme === 'dark' || (prefersDarkMode && theme !== 'light')}
                  onChange={handleChangeTheme} />
              }
              label="Dark mode"
            />
          </FormGroup>
        </Paper>
      </Container>
      <BottomBar />
    </>
  );
};

export default SettingsPage;