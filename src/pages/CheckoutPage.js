import { useEffect } from 'react';
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
import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import ButtonGroup from '@mui/material/ButtonGroup';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import { useCartItems, useSettings, useRemoveCartItem, useDecrementCartItem, useIncrementCartItem } from '../store/MainStoreZustand';
import { useFocusedCartItemId, useSetFocusedCartItemId, useTipPercentage, useSetTipPercentage } from '../store/MainStoreZustand';
import { useTipValueDialogOpen, useSetTipValueDialogOpen, useTipValue, useSetTipValue } from '../store/MainStoreZustand';
import { calculateCart } from '../utils';
import { SlideTransition } from '../components/Transitions';

const CheckoutItemList = () => {
  const { services, currency } = useSettings();
  const navigate = useNavigate();
  const cartItems = useCartItems();
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
          <ListItem key={id} sx={{ py: 0.5, px: 0, flexDirection: 'column' }} onClick={() => toggleFocusedCartItem(id)}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <ListItemText primary={<Typography>{name}</Typography>} secondary={notes ? notes.map((note) => <Typography>{note}</Typography>) : <></>} />
              <Stack direction="row">
                <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'right' }}>{quantity}</Typography>
                <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>&times;</Typography>
                <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'right' }}>{price} {currency.symbol}</Typography>
              </Stack>
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
    </List>
  );
};

const TipValueDialog = () => {
  const amountGroups = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ];
  const { currency } = useSettings();
  const [tipValue, setTipValue] = [useTipValue(), useSetTipValue()];
  const [tipValueDialogOpen, setTipValueDialogOpen] = [useTipValueDialogOpen(), useSetTipValueDialogOpen()];
  return (
    <Dialog maxWidth="xs" fullWidth open={tipValueDialogOpen} onClose={() => setTipValueDialogOpen(false)} TransitionComponent={SlideTransition}>
      <DialogTitle>Tip</DialogTitle>
      <DialogContent>
        <TextField
          onFocus={(e) => e.target.select()}
          required
          autoFocus
          value={tipValue}
          onChange={(e) => setTipValue(parseInt(e.target.value) >= 0 ? parseInt(e.target.value) : 0)}
          label="Tip amount"
          fullWidth
          type="number"
          variant="standard"
          sx={{ input: { textAlign: 'right' } }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{currency.symbol}</InputAdornment>,
          }}
        />
        <Stack alignItems="center">
          {amountGroups.map((amounts, index) => (
            <ButtonGroup key={index} sx={{ mt: 1 }}>
              {amounts.map((amount) => (
                <Button sx={{ textTransform: 'none' }} key={amount} onClick={() => setTipValue(amount)}>{amount} {currency.symbol}</Button>
              ))}
            </ButtonGroup>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setTipValueDialogOpen(false)}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

const TipControl = () => {
  const cartItems = useCartItems();
  const cartInfo = calculateCart(cartItems);
  const { currency } = useSettings();
  const [tipPercentage, setTipPercentage] = [useTipPercentage(), useSetTipPercentage()];
  const [tipValue] = [useTipValue()];
  const [setTipValueDialogOpen] = [useSetTipValueDialogOpen()];
  useEffect(() => {
    if (tipPercentage === currency.symbol) {
      setTipValueDialogOpen(true);
    }
  }, [tipPercentage, setTipValueDialogOpen, currency]);
  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel>Tip {/*tipPercentage === currency.symbol ? '' : `${tipPercentage * 100}%`*/}</FormLabel>
      <Stack direction="row" justifyContent="space-between">
        <RadioGroup row value={tipPercentage} onChange={(e) => setTipPercentage(e.target.value)}>
          {[0, 0.05, 0.1, 0.15, currency.symbol].map((value) => (
            <FormControlLabel
              sx={{ fontSize: 5, mx: 1 }}
              labelPlacement="bottom"
              key={value}
              value={value.toString()}
              control={<Radio sx={{ padding: 0 }} size="small" />}
              label={<Typography sx={{ fontWeight: 700, fontSize: 12 }}>{`${value === currency.symbol ? value : `${value * 100}%`}`}</Typography>}
            />
          ))}
        </RadioGroup>
        <Button sx={{ padding: 0 }} onClick={() => { setTipPercentage(currency.symbol); setTipValueDialogOpen(true); }}>
          <TextField
            type="number"
            value={tipPercentage === currency.symbol ? tipValue : Math.round(cartInfo.totalPrice * tipPercentage)}
            size="small"
            sx={{ width: 100 }}
            InputProps={{
              inputProps: { min: 0 },
              readOnly: true,
              endAdornment: <InputAdornment position="end">{currency.symbol}</InputAdornment>,
            }}
          />
        </Button>
      </Stack>
    </FormControl>
  );
};

const CheckoutTotal = () => {
  const { currency } = useSettings();
  const cartItems = useCartItems();
  const cartInfo = calculateCart(cartItems);
  const tipValue = useTipValue();
  const tipPercentage = useTipPercentage();
  const tip = tipPercentage === currency.symbol ? tipValue : cartInfo.totalPrice * tipPercentage;
  const totalPrice = cartInfo.totalPrice + Math.round(tip);
  return (
    <List>
      <ListItem sx={{ py: 1, px: 0, justifyContent: 'flex-end' }}>
        <Typography variant="subtitle1">Total:&nbsp;</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {totalPrice} {currency.symbol}
        </Typography>
      </ListItem>
    </List>
  );
};

const CheckoutPage = () => {
  const cartItems = useCartItems();
  const cartInfo = calculateCart(cartItems);
  const navigate = useNavigate();
  return (
    <>
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 6 }}>
        <Paper variant="outlined" sx={{ my: { xs: 1, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Basket</Typography>
            <Typography variant="h6">{cartInfo.totalQuantity} item{cartInfo.totalQuantity !== 1 ? 's' : ''}</Typography>
          </Box>
          <Divider />
          <CheckoutItemList />
        </Paper>
        <Paper variant="outlined" sx={{ my: { xs: 1, md: 6 }, p: { xs: 2, md: 3 } }}>
          <TipControl />
        </Paper>
        <CheckoutTotal />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => navigate('/payment')} variant="contained" startIcon={<CreditCardIcon />} size="large">Pay by credit card</Button>
        </Box>
        <BottomBar />
        <TipValueDialog />
      </Container>
    </>
  );
};

export default CheckoutPage;
