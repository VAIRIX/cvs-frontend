import { Box } from '@mui/material';
import { FC } from 'react';
import ProjectAttribute from './ProjectAttribute';
import { ProjectAttributeResponse } from 'types';
import { parseProjectAttributes } from 'utils';

type AttributesSectionProps = {
  attributes: ProjectAttributeResponse[] | undefined;
};

const AttributesSection: FC<AttributesSectionProps> = ({ attributes = [] }) => {
  const parsedAttributes = parseProjectAttributes(attributes);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(parsedAttributes).map(([key, value]) => (
        <ProjectAttribute
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
