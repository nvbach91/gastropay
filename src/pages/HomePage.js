import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Promise from 'bluebird';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSettings, useSetSettings } from '../store/MainStoreZustand';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import { axios } from '../utils';
import { nanoid } from 'nanoid';


const HomePage = () => {
  const [error, setError] = useState('');
  const [settings, setSettings] = [useSettings(), useSetSettings()];
  const { registerId } = useParams();
  const navigate = useNavigate();
  const handleApiError = (err) => {
    setError(err.msg || 'API_ERROR');
  };
  useEffect(() => {
    Promise.delay(0).then(() => {
      if (!/^[0-9a-fA-F]{24}$/.test(registerId)) {
        const e = { msg: 'client_invalid_key' };
        throw e;
      }
      return axios.post(`/public/verify-booking-key`, { key: registerId })
    }).then((resp) => {
      if (!resp.data.success) {
        throw resp.data;
      }
      return axios.get(`/public/booking-resources?key=${registerId}`);
    }).then((resp) => {
      if (!resp.data.success) {
        throw resp.data;
      }
      const newServices = {};
      Object.keys(resp.data.msg.services).forEach((ean) => {
        newServices[ean] = resp.data.msg.services[ean];
        newServices[ean].price = newServices[ean].price.replace(/\.00$/, '');
      });
      resp.data.msg.serviceTabs.forEach((tab) => {
        tab.id = nanoid();
        tab.quickSales.forEach((qs) => {
          qs.id = nanoid();
          newServices[qs.ean].tabName = tab.name;
          newServices[qs.ean].image = qs.image;
        });
      });
      setSettings({
        ...resp.data.msg.settings,
        services: newServices,
        serviceTabs: resp.data.msg.serviceTabs,
        currency: resp.data.msg.currency,
        registerId,
        business: resp.data.msg.business,
      });
    }).catch(handleApiError);
  }, [setSettings, registerId]);

  useEffect(() => {
    if (settings.registerId) {
      navigate('/menu');
    }
  }, [settings.registerId, navigate])
  return (
    <>
      <TopBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 8 }}>
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        ) : (
          <Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center', pt: 20, pb: 20 }}>
            <CircularProgress />
          </Paper>
        )}
      </Container>
      <BottomBar />
    </>
  );
};

export default HomePage;
