import { FC } from 'react';
import { Chip } from 'components/ui';
import { SxProps } from '@mui/material';
import { TEXTS } from 'constants/index';

type IsAllocatedChipProps = {
  value: boolean | undefined;
  sx?: SxProps;
};

const IsAllocatedChipChip: FC<IsAllocatedChipProps> = ({ value, sx }) => {
  const label = value ? TEXTS.ALLOCATED : TEXTS.UNALLOCATED;
  const color = value ? 'error' : 'success';

  return <Chip sx={{ ...sx }} label={label} color={color} />;
};

export default IsAllocatedChipChip;
