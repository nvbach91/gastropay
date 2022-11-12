import React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IMAGE_API_BASE_URL } from '../utils';
import { useSettings, useSetSelectedService, useSelectedService, useAddCartItem } from '../store/MainStoreZustand';
import { SlideTransition } from './Transitions';

const SelectedServiceDialog = () => {
  const { services, currency } = useSettings();
  const addCartItem = useAddCartItem();
  const [selectedService, setSelectedService] = [useSelectedService(), useSetSelectedService()];
  return (
    <Dialog fullScreen open={!!selectedService} onClose={() => setSelectedService(null)} TransitionComponent={SlideTransition}>
      {!selectedService ? <></> : (
        <>
          <AppBar color="default" elevation={0} sx={{ backgroundColor: '#fff' }}>
            <Toolbar>
              <IconButton onClick={() => setSelectedService(null)}>
                <ArrowBackIcon />
              </IconButton>
              <Typography noWrap variant="h6">{services[selectedService.ean].name}</Typography>
            </Toolbar>
          </AppBar>
          <Card elevation={0} sx={{ flexGrow: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia component="div" sx={{ height: 240 }} image={`${IMAGE_API_BASE_URL}${selectedService.image}`} />
              <Chip sx={{ fontSize: 20, position: 'absolute', bottom: 10, right: 10 }} label={`${services[selectedService.ean].price} ${currency.symbol}`} color="primary" />
            </Box>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography gutterBottom variant="body1">
                  {services[selectedService.ean].name}
                </Typography>
              </Box>
              <Typography variant="body2">{services[selectedService.ean].description || ''}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                sx={{ minWidth: 300, position: 'fixed', bottom: 20, pt: 1, pb: 1, borderRadius: 20 }}
                disableElevation
                variant="contained"
                size="small"
                onClick={() => {
                  addCartItem(selectedService, 1);
                  setTimeout(() => {
                    setSelectedService(null);
                  }, 300)
                }}
              >Add to basket {services[selectedService.ean].price} {currency.symbol}</Button>
            </CardActions>
          </Card>
        </>
      )}
    </Dialog>
  );
};

export default SelectedServiceDialog;
