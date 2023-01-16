import { Typography } from '@mui/material';
import { FC } from 'react';

type SubsectionTitleProps = {
  title: string;
};

export const SubsectionTitle: FC<SubsectionTitleProps> = ({ title }) => {
  return (
    <Typography sx={{ fontSize: 12, fontWeight: 600, mb: '15px' }}>
      {title?.toUpperCase()}:
    </Typography>
  );
};
