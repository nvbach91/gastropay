import { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import MenuPage from './pages/MenuPage';
import ErrorPage from './pages/ErrorPage';
// import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import SettingsPage from './pages/SettingsPage';

import { useTheme } from './store/MainStoreZustand';
import './_assets/css/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:registerId',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/error',
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/menu',
    element: <MenuPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/payment',
    element: <PaymentPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/service/:serviceId',
    element: <ServicePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
    errorElement: <ErrorPage />,
  },
]);


const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useTheme();
  const theTheme = useMemo(() => {
    const palette = theme ? { mode: theme } : { mode: prefersDarkMode ? 'dark' : 'light' };
    return createTheme({ palette });
  }, [prefersDarkMode, theme]);

  return (
    <ThemeProvider theme={theTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
