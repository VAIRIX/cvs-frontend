import { FC } from 'react';
import { Chip } from 'components/ui';

type IsAllocatedChipProps = {
  value: boolean | undefined;
};

const IsAllocatedChipChip: FC<IsAllocatedChipProps> = ({ value }) => {
  const label = value ? 'Allocated' : 'Unallocated';
  const color = value ? 'error' : 'success';

  return <Chip sx={{ ml: '24px', fontSize: 20 }} label={label} color={color} />;
};

export default IsAllocatedChipChip;
