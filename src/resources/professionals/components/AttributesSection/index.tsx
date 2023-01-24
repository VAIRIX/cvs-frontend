import { Box } from '@mui/material';
import { FC, useMemo } from 'react';
import ProfessionalAttributes from './ProfessionalAttributes';
import { ProfessionalAttributeResponse } from 'types';
import { parseProfessionalAttributes } from 'utils';

type AttributesSectionProps = {
  attributes: ProfessionalAttributeResponse[] | undefined;
};

const AttributesSection: FC<AttributesSectionProps> = ({ attributes = [] }) => {
  const parsedAttributes = useMemo(
    () => parseProfessionalAttributes(attributes),
    [attributes],
  );
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(parsedAttributes).map(([key, value]) => (
        <ProfessionalAttributes
          sx={{ flexBasis: '50%' }}
          key={key}
          title={key}
          attributes={value}
        />
      ))}
    </Box>
  );
};

export default AttributesSection;
