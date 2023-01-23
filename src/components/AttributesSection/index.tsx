import { Box } from '@mui/material';
import { FC } from 'react';
import ProfessionalAttribute from 'components/ProfessionalAttribute';
import {
  AttributeType,
  ProfessionalAttributeResponse,
  ProjectAttributeResponse,
} from 'types';
import { parseProfessionalAttributes, parseProjectAttributes } from 'utils';
import ProjectAttribute from 'components/ProjectAttribute';

export type AttributeResponse =
  | ProfessionalAttributeResponse
  | ProjectAttributeResponse;

type AttributesSectionProps = {
  attributes: AttributeResponse[] | undefined;
  type: AttributeType;
};

const AttributesSection: FC<AttributesSectionProps> = ({
  attributes,
  type,
}) => {
  if (!attributes?.length) return null;

  let parsedAttributes;

  if (type === AttributeType.PROFESSIONAL) {
    parsedAttributes = parseProfessionalAttributes(
      attributes as ProfessionalAttributeResponse[],
    );

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {Object.entries(parsedAttributes).map(([key, value]) => (
          <ProfessionalAttribute
            sx={{ flexBasis: '50%' }}
            key={key}
            title={key}
            attributes={value}
          />
        ))}
      </Box>
    );
  }
  if (type === AttributeType.PROJECT) {
    parsedAttributes = parseProjectAttributes(
      attributes as ProjectAttributeResponse[],
    );

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
  }

  return null;
};

export default AttributesSection;
