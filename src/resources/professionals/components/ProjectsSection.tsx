import { FC } from 'react';
import { ProjectResponse } from 'types';
import { Project } from 'components/Project';
import { Box } from '@mui/system';
import { SectionTitle } from 'components/ui';
import { Divider } from '@mui/material';

type ProjectsSectionProps = {
  projects: ProjectResponse[] | undefined;
};

const ProjectsSection: FC<ProjectsSectionProps> = (props) => {
  const { projects } = props;

  if (!projects) return null;

  return (
    <Box>
      <Divider sx={{ my: '24px' }} />
      <SectionTitle title="Projects" sx={{ mb: '24px' }} />
      {projects?.map((project: ProjectResponse) => (
        <Project
          key={project?.project?.id}
          project={project?.project}
          responsibility={project?.responsibility}
        />
      ))}
    </Box>
  );
};

export default ProjectsSection;
