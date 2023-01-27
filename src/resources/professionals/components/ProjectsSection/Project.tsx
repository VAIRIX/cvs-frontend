import { FC, useCallback } from 'react';
import { Button, Paper } from '@mui/material';
import { formatProjectDates } from 'utils';
import { ProfessionalProjectResponse } from 'types';
import { Chip, Paragraph, SectionTitle, SubsectionTitle } from 'components/ui';
import {
  Delete as DeleteIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { useRedirect } from 'react-admin';
import { TEXTS } from 'constants/index';
import { ACTIONS, RESOURCES } from 'api/resources';

type ProjectProps = ProfessionalProjectResponse & {
  isEdit: boolean;
  deleteProject?: (id: string) => void;
};

const Project: FC<ProjectProps> = ({
  project,
  responsibility,
  isEdit,
  deleteProject,
}) => {
  const redirect = useRedirect();
  const { from, to, name, description, id } = project;
  const projectDate = formatProjectDates(from, to);
  const handleShowProject = useCallback(() => {
    redirect(ACTIONS.SHOW, RESOURCES.PROJECTS, id);
  }, [id]);

  const handleDeleteProject = useCallback(() => {
    if (!deleteProject) return;
    deleteProject(id);
  }, [id, deleteProject]);

  return (
    <Paper
      sx={{
        mb: 2,
        p: 2,
        position: 'relative',
      }}
      elevation={3}
    >
      {isEdit && (
        <DeleteIcon
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: '#d32f2f',
            cursor: 'pointer',
          }}
          onClick={handleDeleteProject}
        />
      )}
      <Button sx={{ p: 0 }} onClick={handleShowProject}>
        <SectionTitle sx={{ fontSize: 20 }} title={name} /> <LaunchIcon />
      </Button>
      <Paragraph sx={{ mt: 1, fontStyle: 'italic' }}>{projectDate}</Paragraph>
      <Paragraph sx={{ my: 1 }}>{description}</Paragraph>
      <SubsectionTitle title={TEXTS.ROLE_LABEL} />
      <Chip sx={{ ml: 1 }} label={responsibility} />
    </Paper>
  );
};

export default Project;
