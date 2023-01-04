import { Box, SxProps } from '@mui/material';
import { FC } from 'react';
import { Chip, SubsectionTitle } from 'components/ui';
import { ParsedProfessionalAttribute } from 'types/attributes';

type ProfessionalAttributeProps<T> = {
  title: string;
  attributes: T[];
  sx: SxProps;
};

const ProfessionalAttribute: FC<
  ProfessionalAttributeProps<ParsedProfessionalAttribute>
> = (props) => {
  const { title, attributes, sx } = props;

  return (
    <Box sx={{ mb: '10px', ...sx }}>
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

export default ProfessionalAttribute;
