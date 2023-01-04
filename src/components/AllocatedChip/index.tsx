import { FC } from 'react';
import { Chip } from 'components/ui';

type AllocatedChipProps = {
  value: boolean | undefined;
};

export const AllocatedChipChip: FC<AllocatedChipProps> = (props) => {
  const { value } = props;

  const label = value ? 'Allocated' : 'Unallocated';
  const color = value ? 'error' : 'success';

  return <Chip sx={{ ml: '24px', fontSize: 20 }} label={label} color={color} />;
};
