import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';

import packageJson from '../../package.json';
import { useCartItems, useSetAlertMessage, useSettings, useSetDrawerOpen } from '../store/MainStoreZustand';
import { calculateCart } from '../utils';

const backNavigations = {
  '/checkout': '/menu',
};

const topBarTitles = {
  '/checkout': 'Checkout',
  '/menu': '',
};

const TopBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const settings = useSettings();
  const cartItems = useCartItems();
  const cartInfo = calculateCart(cartItems);
  const setAlertMessage = useSetAlertMessage();
  const setDrawerOpen = useSetDrawerOpen();
  const handleNavigateToCheckout = () => {
    if (!cartInfo.totalQuantity) {
      return setAlertMessage('Please choose a service first');
    }
    navigate('/checkout');
  };
  return (
    <AppBar color="default" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center">
          {backNavigations[pathname] ? (
            <IconButton onClick={() => navigate(backNavigations[pathname])}>
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <IconButton edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6">{topBarTitles[pathname] || (settings.business ? settings.business.name : packageJson.app.name)}</Typography>
        </Stack>
        <IconButton onClick={handleNavigateToCheckout}>
          <Badge badgeContent={cartInfo.totalQuantity} color="secondary">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
