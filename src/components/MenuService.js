import React from 'react';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { IMAGE_API_BASE_URL } from '../utils';
import { useSettings, useSetSelectedService, } from '../store/MainStoreZustand';

const MenuService = ({ quickSale }) => {
  const { ean, image } = quickSale;
  const { services, currency } = useSettings();
  const setSelectedService = useSetSelectedService();
  return (
    <Card elevation={0} sx={{ mb: 1, display: 'flex' }} onClick={() => setSelectedService({ image, ean, price: services[ean].price })}>
      <CardMedia component="div" sx={{ minWidth: 100, width: 100 }} image={image ? `${IMAGE_API_BASE_URL}${image}` : ''} />
      <CardContent sx={{ flexGrow: 1, justifyContent: 'left', textAlign: 'left' }} component={ButtonBase}>
        <Typography variant="body2" >
          {services[ean].name}
        </Typography>
      </CardContent>
      <Button sx={{ textTransform: 'unset', minWidth: 100, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
        {services[ean].price} {currency.symbol}
      </Button>
    </Card>
  );
};

export default MenuService;
