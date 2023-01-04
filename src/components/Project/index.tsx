import { FC } from 'react';
import { Box } from '@mui/material';
import { formatProjectDates } from 'utils';
import { ProjectResponse } from 'types';
import { Chip, Paragraph, SectionTitle, SubsectionTitle } from 'components/ui';

type ProjectProps = ProjectResponse;

export const Project: FC<ProjectProps> = (props) => {
  const { project, responsibility } = props;
  return (
    <Box sx={{ mb: '24px' }}>
      <SectionTitle sx={{ fontSize: 20 }} title={project.name} />
      <Paragraph sx={{ fontStyle: 'italic' }}>
        {formatProjectDates(project?.from, project?.to)}
      </Paragraph>
      <Paragraph>{project?.description}</Paragraph>
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
