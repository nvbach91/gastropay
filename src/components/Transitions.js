import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';

export const SlideTransition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});
