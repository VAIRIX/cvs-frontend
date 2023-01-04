import { SxProps, Typography } from '@mui/material';
import { FC } from 'react';

type SectionTitleProps = {
  title?: string;
  sx?: SxProps;
};

export const SectionTitle: FC<SectionTitleProps> = (props) => {
  const { title, sx } = props;
  return (
    <Typography
      sx={{
        fontSize: 28,
        mr: '10px',
        ...sx,
      }}
    >
      {title}
    </Typography>
  );
};
