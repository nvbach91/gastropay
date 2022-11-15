import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import packageJson from '../../package.json';


const BottomBar = () => {
  return (
    <Box component="footer" sx={{ pt: 5, pb: 5 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        Copyright ©&nbsp;<Link color="inherit" href={`https://${packageJson.app.www}`}>{packageJson.app.www}</Link>&nbsp;{new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default BottomBar;
