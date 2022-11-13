import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import { useCartItems, useSettings, useRemoveCartItem, useDecrementCartItem, useIncrementCartItem, useFocusedCartItemId, useSetFocusedCartItemId } from '../store/MainStoreZustand';
import { calculateCart } from '../utils';
import PaymentGatewayDialog from '../components/PaymentGatewayDialog';

const CheckoutItemList = () => {
  const { services, currency } = useSettings();
  const navigate = useNavigate();
  const cartItems = useCartItems();
  const cartInfo = calculateCart(cartItems);
  const removeCartItem = useRemoveCartItem();
  const incrementCartItem = useIncrementCartItem();
  const decrementCartItem = useDecrementCartItem();
  const [focusedCartItemId, setFocusedCartItemId] = [useFocusedCartItemId(), useSetFocusedCartItemId()];
  const toggleFocusedCartItem = (id) => {
    if (id === focusedCartItemId) {
      setFocusedCartItemId('');
    } else {
      setFocusedCartItemId(id);
    }
  };
  useEffect(() => {
    setFocusedCartItemId('');
  }, [setFocusedCartItemId])
  return (
    <List disablePadding>
      {cartItems.map(({ id, ean, price, quantity, notes }) => {
        const { name } = services[ean];
        return (
          <ListItem key={id} sx={{ py: 1, px: 0, flexDirection: 'column' }} onClick={() => toggleFocusedCartItem(id)}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <ListItemText primary={<Typography>{name}</Typography>} secondary={notes ? notes.map((note) => <Typography>{note}</Typography>) : <></>} />
              <Typography variant="body2" sx={{ minWidth: 70, textAlign: 'right' }}>{quantity} &times; {price} {currency.symbol}</Typography>
            </Box>
            {focusedCartItemId === id && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }} onClick={(e) => e.stopPropagation()}>
                <IconButton onClick={() => removeCartItem(id, navigate)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => decrementCartItem(id, navigate)}>
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => incrementCartItem(id, navigate)}>
                  <AddIcon />
                </IconButton>
              </Box>
            )}
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
  );
};

const CheckoutPage = () => {
  const [isPaying, setIsPaying] = useState(false);
  const cartItems = useCartItems();
  const cartInfo = calculateCart(cartItems);
  return (
    <>
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 6 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Basket</Typography>
            <Typography variant="h6">{cartInfo.totalQuantity} item{cartInfo.totalQuantity !== 1 ? 's' : ''}</Typography>
          </Box>
          <Divider />
          <CheckoutItemList />
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography variant="h6" gutterBottom>Payment</Typography>
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
