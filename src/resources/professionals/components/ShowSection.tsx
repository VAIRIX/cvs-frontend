import { Card } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const ShowSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
      {children}
    </Card>
  );
};
