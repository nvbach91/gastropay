import { useEffect, useState } from 'react';
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
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { IMAGE_API_BASE_URL } from '../utils';
import { useSettings, useAddCartItem, useSelectedServiceQuantity, useSetSelectedServiceQuantity, useCartItems } from '../store/MainStoreZustand';
import { SlideTransition } from '../components/Transitions';

const ServiceQuantityControls = ({ serviceId, handleCloseModal }) => {
  const { services, currency } = useSettings();
  const service = services[serviceId];
  const addCartItem = useAddCartItem();
  const [selectedServiceQuantity, setSelectedServiceQuantity] = [useSelectedServiceQuantity(), useSetSelectedServiceQuantity()];

  useEffect(() => {
    setSelectedServiceQuantity(1);
  }, [setSelectedServiceQuantity]);

  const [minQuantity, maxQuantity] = [1, 99];
  const handleSetQuantity = (sign) => () => {
    let newQuantity = selectedServiceQuantity + sign;
    if (sign === 1 && newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }
    if (sign === -1 && newQuantity < minQuantity) {
      newQuantity = minQuantity;
    }
    setSelectedServiceQuantity(newQuantity);
  };

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 80, width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography gutterBottom>Quantity</Typography>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button disabled={selectedServiceQuantity === minQuantity} onClick={handleSetQuantity(-1)}>
            <RemoveIcon />
          </Button>
          <Button style={{ minWidth: 50 }}>{selectedServiceQuantity}</Button>
          <Button disabled={selectedServiceQuantity === maxQuantity} onClick={handleSetQuantity(1)}>
            <AddIcon />
          </Button>
        </ButtonGroup>
      </Box>

      <Button
        sx={{ width: 300, position: 'fixed', bottom: 20, py: 1, borderRadius: 20 }}
        variant="contained"
        onClick={() => {
          addCartItem({ ...service, ean: serviceId }, selectedServiceQuantity);
          setTimeout(handleCloseModal, 300)
        }}
      >Add to basket {selectedServiceQuantity * service.price} {currency.symbol}</Button>
    </>
  )
};

const ServicePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { services, currency } = useSettings();
  const service = services[serviceId];
  const [isModalOpen, setIsModalOpen] = useState(true);
  const cartItems = useCartItems();
  const addedItem = cartItems.find((ci) => ci.ean === serviceId);
  const addedItemQuantity = addedItem ? addedItem.quantity : 0;
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const transitionProps = {
    onExited: () => {
      if (!isModalOpen) {
        navigate('/menu');
      }
    }
  };
  return (
    <Dialog fullScreen open={isModalOpen} onClose={handleCloseModal} TransitionComponent={SlideTransition} TransitionProps={transitionProps}>
      <AppBar color="default" elevation={0}>
        <Toolbar>
          <IconButton onClick={handleCloseModal}><ArrowBackIcon /></IconButton>
          {/* <Typography noWrap variant="h6">{service.name}</Typography> */}
        </Toolbar>
      </AppBar>
      <Card elevation={0} sx={{ flexGrow: 1 }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia component="div" sx={{ height: 240 }} image={service.image ? `${IMAGE_API_BASE_URL}${service.image}` : ''} />
          <Chip sx={{ fontSize: 20, position: 'absolute', bottom: 10, right: 10 }} label={`${service.price} ${currency.symbol}`} color="primary" />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6">{service.name}</Typography>
          <Typography variant="body2">{service.description || ''}</Typography>
          {addedItemQuantity ? <Typography color="success.main">You have added {addedItemQuantity} of this item in the basket</Typography> : <></>}
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <ServiceQuantityControls serviceId={serviceId} handleCloseModal={handleCloseModal} />
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default ServicePage;
