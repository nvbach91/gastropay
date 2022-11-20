import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSettings, useCartItems, useTipValue, useTipPercentage } from '../store/MainStoreZustand';
import { SlideTransition } from '../components/Transitions';
import { calculateCart } from '../utils';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { currency } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const cartItems = useCartItems();
  const cartInfo = calculateCart(cartItems);
  const tipValue = useTipValue();
  const tipPercentage = useTipPercentage();
  const tip = tipPercentage === currency.symbol ? tipValue : cartInfo.totalPrice * tipPercentage;
  const totalPrice = cartInfo.totalPrice + Math.round(tip);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const transitionProps = {
    onExited: () => {
      if (!isModalOpen) {
        navigate('/checkout');
      }
    }
  };
  return (
    <Dialog fullScreen open={isModalOpen} onClose={handleCloseModal} TransitionComponent={SlideTransition} TransitionProps={transitionProps}>
      <AppBar color="default" elevation={0}>
        <Toolbar>
          <IconButton onClick={handleCloseModal}><ArrowBackIcon /></IconButton>
          <Typography variant="h6">Payment {totalPrice} {currency.symbol}</Typography>
        </Toolbar>
      </AppBar>
      <iframe title="payment-gateway" style={{ border: 'none', flexGrow: 1 }} src="https://www.comgate.cz/platebni-brana"></iframe>
    </Dialog>
  );
};

export default PaymentPage;
