import { Box, SxProps } from '@mui/material';
import { FC } from 'react';
import { Chip, SubsectionTitle } from 'components/ui';
import { ParsedProjectAttribute } from 'types/attributes';

type ProjectAttributeProps<T> = {
  title: string;
  attributes: T[];
  sx: SxProps;
};

const ProjectAttribute: FC<ProjectAttributeProps<ParsedProjectAttribute>> = ({
  title,
  attributes,
  sx,
}) => {
  if (!attributes || !attributes.length) return null;
  return (
    <Box sx={{ mb: 2, ...sx }}>
      <SubsectionTitle title={title} />
      {attributes.map((attribute) => (
        <Chip key={attribute.id} label={attribute.name} />
      ))}
    </Box>
  );
};

export default ProjectAttribute;
