import { SxProps, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type ParagraphProps = {
  sx?: SxProps;
};

export const Paragraph: FC<PropsWithChildren<ParagraphProps>> = (props) => {
  const { children, sx } = props;
  return (
    <Typography sx={{ fontSize: 14, mb: '18px', ...sx }}>{children}</Typography>
  );
};
