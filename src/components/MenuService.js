import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { IMAGE_API_BASE_URL } from '../utils';
import { useCartItems, useSettings } from '../store/MainStoreZustand';

const MenuService = ({ quickSale }) => {
  const navigate = useNavigate();
  const { ean, image } = quickSale;
  const { services, currency } = useSettings();
  const cartItems = useCartItems();
  const isAddedItem = cartItems.findIndex((ci) => ci.ean === ean) >= 0;
  return (
    <Card elevation={0} sx={{ mb: 1, display: 'flex' }} onClick={() => navigate(`/service/${ean}`)}>
      <CardMedia component="div" sx={{ minWidth: 100, width: 100 }} image={image ? `${IMAGE_API_BASE_URL}${image}` : ''} />
      <CardContent sx={{ flexGrow: 1, justifyContent: 'left', textAlign: 'left' }} component={ButtonBase}>
        <Typography variant="body2" color={isAddedItem ? 'success.main' : ''} fontWeight={isAddedItem ? 'bold' : ''}>
          {services[ean].name}{isAddedItem ? '*' : ''}
        </Typography>
      </CardContent>
      <Button sx={{ textTransform: 'unset', minWidth: 80, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
        {services[ean].price} {currency.symbol}
      </Button>
    </Card>
  );
};

export default MenuService;
