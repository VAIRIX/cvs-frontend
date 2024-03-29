import { Box, SxProps } from '@mui/material';
import { FC } from 'react';
import { Chip, SubsectionTitle } from 'components/ui';
import { ParsedProfessionalAttribute } from 'types/attributes';

type ProfessionalAttributeProps<T> = {
  title: string;
  attributes: T[];
  sx: SxProps;
};

const ProfessionalAttributes: FC<
  ProfessionalAttributeProps<ParsedProfessionalAttribute>
> = ({ title, attributes, sx }) => {
  if (!attributes || !attributes.length) return null;
  return (
    <Box sx={{ mb: 2, ...sx }}>
      <SubsectionTitle title={title} />
      {attributes.map((attribute) => (
        <Chip
          key={attribute.id}
          label={attribute.name}
          value={attribute.level}
        />
      ))}
    </Box>
  );
};

export default ProfessionalAttributes;
