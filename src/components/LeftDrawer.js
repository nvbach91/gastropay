import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';
import InfoIcon from '@mui/icons-material/Info';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation, useNavigate } from 'react-router-dom';
import packageJson from '../../package.json';
import { useDrawerOpen, useSetDrawerOpen } from '../store/MainStoreZustand';

const items = [
  {
    path: '/menu',
    name: 'Menu',
    icon: <ViewListIcon />
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <SettingsIcon />
  },
  {
    path: '/about',
    name: 'About',
    icon: <InfoIcon />
  }
];

const DrawerItems = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const setDrawerOpen = useSetDrawerOpen();
  return items.map(({ path, name, icon }) => (
    <ListItem key={path} selected={pathname === path}>
      <ListItemButton onClick={() => { navigate(path); setDrawerOpen(false); }}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  ));
};

const LeftDrawer = () => {
  const [drawerOpen, setDrawerOpen] = [useDrawerOpen(), useSetDrawerOpen()];
  return (
    <SwipeableDrawer anchor="left" open={drawerOpen} onOpen={() => { }} onClose={() => setDrawerOpen(false)}>
      <Stack sx={{ width: 250, height: '100%' }} justifyContent="space-between">
        <List disablePadding>
          <ListItem sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
            <ListItemText primary={`${packageJson.app.name}™`} />
            <IconButton onClick={() => setDrawerOpen(false)}><ChevronLeftIcon /></IconButton>
          </ListItem>
          <DrawerItems />
        </List>
        <List disablePadding>
          <ListItem>
            <ListItemText sx={{ textAlign: 'center' }} secondary={`v${packageJson.version}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText sx={{ textAlign: 'center' }} secondary={`Made with ♡ | © ${packageJson.app.provider}`} />
          </ListItem>
        </List>
      </Stack>
    </SwipeableDrawer>
  );
};

export default LeftDrawer;
