import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';
import { useCartItems, useSettings } from '../../store/MainStoreZustand';
import { calculateCart } from '../../utils';
import PaymentGatewayDialog from '../../components/PaymentGatewayDialog';

const CheckoutPage = () => {
  const [isPaying, setIsPaying] = useState(false);
  const { services, currency } = useSettings();
  const cartItems = useCartItems();
  const cartInfo = calculateCart(cartItems);
  return (
    <>
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 6 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Checkout</Typography>
            <Typography variant="h6">{cartInfo.totalQuantity} items</Typography>
          </Box>
          <Divider />
          <List disablePadding>
            {cartItems.map(({ ean, price, quantity, notes }, index) => {
              const { name } = services[ean];
              return (
                <ListItem key={index} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={<Typography>{name}</Typography>} secondary={<Box>{(notes || []).map((note) => <Typography>{note}</Typography>)}</Box>} />
                  <Typography variant="body2" sx={{ minWidth: 70, textAlign: 'right' }}>{quantity} &times; {price}</Typography>
                </ListItem>
              )
            })}
            <Divider />
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {cartInfo.totalPrice} {currency.symbol}
              </Typography>
            </ListItem>
          </List>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography variant="h6" gutterBottom>Payment {isPaying ? 'xxx' : 'yyy'}</Typography>
            <Button onClick={() => setIsPaying((prev) => !prev)} variant="contained" startIcon={<CreditCardIcon />} size="large">Pay by credit card</Button>
          </Box>
        </Paper>
        {isPaying && <PaymentGatewayDialog onDialogClose={() => setIsPaying(false)} />}
        <BottomBar />
      </Container>
    </>
  );
};

export default CheckoutPage;
