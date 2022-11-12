import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';
import GlobalAlert from '../../components/GlobalAlert';
import MenuService from '../../components/MenuService';
import { calculateCart } from '../../utils';
import { useSettings, useCartItems } from '../../store/MainStoreZustand';

const MenuPage = () => {
  const navigate = useNavigate();
  const { serviceTabs, currency } = useSettings();
  const cartItems = useCartItems();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const renderTabContent = (quickSales, index) => {
    return (
      <Paper elevation={0} key={index} sx={{ backgroundColor: '#f1f1f1' }}>
        {quickSales.map((qs, index) => <MenuService key={index} quickSale={qs} />)}
      </Paper>
    );
  };
  const cartInfo = calculateCart(cartItems);
  return (
    <>
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 8, justifyContent: 'center' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
          <Tabs value={selectedTabIndex} onChange={(e, index) => setSelectedTabIndex(index)} variant="scrollable">
            {serviceTabs.map((tab, index) => {
              const { name } = tab;
              return <Tab wrapped key={index} label={name} sx={{ width: 140 }} />;
            })}
          </Tabs>
        </Box>
        <SwipeableViews axis="x" index={selectedTabIndex} onChangeIndex={(index) => setSelectedTabIndex(index)}>
          {serviceTabs.map((tab, index) => renderTabContent(tab.quickSales, index))}
        </SwipeableViews>
        {cartInfo.totalQuantity < 1 ? <></> : (
          <Box sx={{ position: 'fixed', width: '100%', left: 0, bottom: 20, justifyContent: 'center', display: 'flex' }}>
            <Button sx={{ textTransform: 'unset', borderRadius: 10, minWidth: 300, pl: 1, pt: 1, pb: 1, justifyContent: 'space-between' }} variant="contained" onClick={() => navigate('/checkout')}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box variant="contained" sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.3)', mr: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                  <ShoppingBasketIcon fontSize="small" />
                </Box>
                BASKET ({cartInfo.totalQuantity})
              </Box>
              <Box>{cartInfo.totalPrice} {currency.symbol}</Box>
            </Button>
          </Box>
        )}
      </Container>
      <BottomBar />
      <GlobalAlert />
    </>
  );
};

export default MenuPage;
