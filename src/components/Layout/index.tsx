import { FC } from 'react';
import {
  LayoutProps,
  AppBar as RaAppBar,
  Layout as RaLayout,
} from 'react-admin';
import { useTheme } from '@mui/material/styles';

const Layout: FC = (props: LayoutProps): JSX.Element => {
  return <RaLayout {...props} appBar={AppBar} />;
};

const AppBar = (): JSX.Element => {
  const theme = useTheme();
  return (
    <RaAppBar
      sx={{
        background: `linear-gradient(112deg,${theme.palette.secondary.main},${theme.palette.secondary.light})`,
      }}
    />
  );
};

export default Layout;
