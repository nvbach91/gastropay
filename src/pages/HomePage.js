import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Promise from 'bluebird';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { nanoid } from 'nanoid';
import { useSettings, useSetSettings } from '../store/MainStoreZustand';
import { axios } from '../utils';
import packageJson from '../../package.json';


const HomePage = () => {
  const [settings, setSettings] = [useSettings(), useSetSettings()];
  const { registerId } = useParams();
  const navigate = useNavigate();
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
          newServices[qs.ean].image = qs.image || newServices[qs.ean].image;
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
      document.title = `${resp.data.msg.business.name} | ${packageJson.app.name}`;
    }).catch((err) => {
      // setError(err.msg || 'API_ERROR');
      navigate('/error');
    });
  }, [setSettings, registerId, navigate]);

  useEffect(() => {
    if (settings.registerId) {
      navigate('/menu');
    }
  }, [settings.registerId, navigate])
  return (
    <>
      <Skeleton variant="rectangle" animation="wave" height={60} />
      <Stack spacing={1} sx={{ px: 2, py: 2 }} direction="row">
        <Skeleton variant="rounded" animation="wave" height={60} width={200} />
        <Skeleton variant="rounded" animation="wave" height={60} width={200} />
        <Skeleton variant="rounded" animation="wave" height={60} width={200} />
      </Stack>
      <Stack spacing={1} sx={{ px: 2 }}>
        <Skeleton variant="rounded" animation="wave" height={60} />
        <Skeleton variant="rounded" animation="wave" height={60} />
        <Skeleton variant="rounded" animation="wave" height={60} />
        <Skeleton variant="rounded" animation="wave" height={60} />
        <Skeleton variant="rounded" animation="wave" height={60} />
        <Skeleton variant="rounded" animation="wave" height={60} />
        <Skeleton variant="rounded" animation="wave" height={60} />
      </Stack>
    </>
  );
};

export default HomePage;
