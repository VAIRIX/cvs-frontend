import { FC } from 'react';
import { Box } from '@mui/material';
import { formatProjectDates } from 'utils';
import { ProjectResponse } from 'types';
import { Chip, Paragraph, SectionTitle, SubsectionTitle } from 'components/ui';

type ProjectProps = ProjectResponse;

export const Project: FC<ProjectProps> = ({ project, responsibility }) => {
  if (!project) return null;
  const { from, to, name, description } = project;
  const projectDate = formatProjectDates(from, to);
  return (
    <Box sx={{ mb: '24px' }}>
      <SectionTitle sx={{ fontSize: 20 }} title={name} />
      <Paragraph sx={{ fontStyle: 'italic' }}>{projectDate}</Paragraph>
      <Paragraph>{description}</Paragraph>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <SubsectionTitle title="Role" />
        <Chip sx={{ ml: '5px' }} label={responsibility} />
      </Box>
    </Box>
  );
};
