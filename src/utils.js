import Axios from 'axios';

export const isDev = window.location.hostname === 'localhost' || window.location.hostname.includes('10.0.0.180');

export const urlParams = {};
const params = new URLSearchParams(window.location.search);
const keys = params.keys();
for (const key of keys) {
  urlParams[key] = params.get(key);
}

export const IMAGE_API_BASE_URL = 'https://res.cloudinary.com/gokasacz/image/upload/';
export const API_BASE_URL = !isDev ? 'https://trafika.vcap.me:3000' : 'https://api.gokasa.cz';

export const axios = Axios.create({ baseURL: API_BASE_URL });

export const calculateCart = (cartItems) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.quantity * parseFloat(item.price);
    totalQuantity += item.quantity;
  });

  return {
    totalQuantity,
    totalPrice: Math.round(totalPrice),
  };
}

