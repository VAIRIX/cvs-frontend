import { FC, useCallback } from 'react';
import { Button, Paper } from '@mui/material';
import { ProfessionalProjectResponse, MoveDirection } from 'types';
import { Chip, Paragraph, SectionTitle, SubsectionTitle } from 'components/ui';
import {
  Delete as DeleteIcon,
  Launch as LaunchIcon,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from '@mui/icons-material';
import { useRedirect } from 'react-admin';
import { TEXTS } from 'constants/index';
import { ACTIONS, RESOURCES } from 'api/resources';
import vairixSvg from 'assets/vairix.svg';

type ProjectProps = ProfessionalProjectResponse & {
  isEdit: boolean;
  deleteProject?: (id: string) => void;
  moveProject: (index: number, direction: MoveDirection) => void;
  projectIdx: number;
  totalProjects: number;
};

const Project: FC<ProjectProps> = ({
  project,
  responsibility,
  duration,
  isEdit,
  deleteProject,
  moveProject,
  projectIdx,
  totalProjects,
}) => {
  const redirect = useRedirect();
  const { name, description, id, vairixProject } = project;
  const handleShowProject = useCallback(() => {
    redirect(ACTIONS.SHOW, RESOURCES.PROJECTS, id);
  }, [id]);

  const handleDeleteProject = useCallback(() => {
    if (!deleteProject) return;
    deleteProject(id);
  }, [id, deleteProject]);

  const isFirst = projectIdx === 0;
  const isLast = projectIdx === totalProjects - 1;

  return (
    <Paper
      data-testid={project?.name?.toLowerCase().replace(' ', '-')}
      sx={{
        mb: 2,
        p: 2,
        position: 'relative',
      }}
      elevation={3}
    >
      {isEdit && (
        <div>
          <DeleteIcon
            data-testid={`${project?.name
              ?.toLowerCase()
              .replace(' ', '-')}-delete`}
            sx={{
              position: 'absolute',
              right: 10,
              top: isFirst ? 10 : 45,
              color: '#d32f2f',
              cursor: 'pointer',
            }}
            onClick={handleDeleteProject}
          />
          {!isFirst && (
            <KeyboardDoubleArrowUp
              sx={{
                width: '100%',
                cursor: 'pointer',
                border: '1px solid gray',
                borderRadius: '5px',
              }}
              onClick={() => moveProject(projectIdx, 'up')}
            />
          )}
        </div>
      )}
      <Button sx={{ p: 0 }} onClick={handleShowProject}>
        <SectionTitle sx={{ fontSize: 20 }} title={name} /> <LaunchIcon />
        {vairixProject && (
          <img
            src={vairixSvg}
            alt="vairix icon"
            style={{
              height: '20px',
              width: '20px',
            }}
          />
        )}
      </Button>
      <Paragraph sx={{ mt: 1, fontStyle: 'italic' }}>{duration}</Paragraph>
      <Paragraph sx={{ my: 1 }}>{description}</Paragraph>
      <SubsectionTitle title={TEXTS.ROLE_LABEL} />
      <Chip sx={{ ml: 1 }} label={responsibility} />
      {isEdit && !isLast && (
        <KeyboardDoubleArrowDown
          sx={{
            width: '100%',
            cursor: 'pointer',
            border: '1px solid gray',
            borderRadius: '5px',
          }}
          onClick={() => moveProject(projectIdx, 'down')}
        />
      )}
    </Paper>
  );
};

export default Project;
