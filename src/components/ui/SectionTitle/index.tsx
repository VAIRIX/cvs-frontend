import { SxProps, Typography } from '@mui/material';
import { FC } from 'react';

type SectionTitleProps = {
  title?: string;
  sx?: SxProps;
};

export const SectionTitle: FC<SectionTitleProps> = ({ title, sx }) => {
  return (
    <Typography
      sx={{
        fontSize: 28,
        ...sx,
      }}
    >
      {title}
    </Typography>
  );
};
