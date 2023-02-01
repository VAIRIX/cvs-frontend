import { FC } from 'react';
import { Box } from '@mui/material';
import { Login as RaLogin } from 'react-admin';
import { useTheme } from '@mui/material/styles';
import vairixPng from 'assets/vairix.webp';

const Login: FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: `linear-gradient(112deg,${theme.palette.secondary.light},${theme.palette.secondary.main})`,
      }}
    >
      <RaLogin
        sx={{
          backgroundImage: `url(${vairixPng})`,
          backgroundPosition: '10% 10%',
          backgroundSize: 500,
          bottom: 20,
        }}
      />
    </Box>
  );
};

export default Login;
