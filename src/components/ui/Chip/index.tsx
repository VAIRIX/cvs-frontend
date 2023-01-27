import { Avatar, Chip as MuiChip, SxProps } from '@mui/material';
import { FC } from 'react';

type ChipProps = {
  label: string;
  value?: string | number;
  sx?: SxProps;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
};

export const Chip: FC<ChipProps> = ({
  label,
  value,
  sx,
  color = 'default',
}) => {
  const chipValue = value ? <Avatar>{value}</Avatar> : undefined;
  return (
    <MuiChip
      sx={{ mr: 1, mb: 1, ...sx }}
      avatar={chipValue}
      label={label}
      color={color}
    />
  );
};
