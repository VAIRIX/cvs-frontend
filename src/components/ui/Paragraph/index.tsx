import { SxProps, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type ParagraphProps = {
  sx?: SxProps;
};

export const Paragraph: FC<PropsWithChildren<ParagraphProps>> = ({
  children,
  sx,
}) => {
  return <Typography sx={{ fontSize: 14, ...sx }}>{children}</Typography>;
};
