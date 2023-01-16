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
  return (
    <MuiChip
      sx={{ mr: '8px', mb: '8px', ...sx }}
      avatar={value ? <Avatar>{value}</Avatar> : undefined}
      label={label}
      color={color}
    />
  );
};
