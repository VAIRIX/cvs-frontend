import { FC } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import { formatProjectDates } from 'utils';
import { ProfessionalProjectResponse } from 'types';
import { Chip, Paragraph, SectionTitle, SubsectionTitle } from 'components/ui';
import {
  Delete as DeleteIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { useRedirect } from 'react-admin';

type ProjectProps = ProfessionalProjectResponse & {
  isEdit: boolean;
  deleteProject?: (id: string) => void;
  setResponsibility?: (id: string, responsibility: string) => void;
};

const Project: FC<ProjectProps> = ({
  project,
  responsibility,
  isEdit,
  deleteProject,
  setResponsibility,
}) => {
  const redirect = useRedirect();
  const { from, to, name, description, id } = project;
  const projectDate = formatProjectDates(from, to);
  const handleShowProject = () => {
    redirect('show', 'projects', id);
  };

  const handleDeleteProject = () => {
    if (!deleteProject) return;
    deleteProject(id);
  };

  const handleSetResponsibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!setResponsibility) return;
    setResponsibility(id, e.target.value);
  };

  return (
    <Paper
      sx={{
        mb: '24px',
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
          }}
          onClick={handleDeleteProject}
        />
      )}
      <Button sx={{ p: '0' }} onClick={handleShowProject}>
        <SectionTitle sx={{ fontSize: 20 }} title={name} />
        <LaunchIcon />
      </Button>
      <Paragraph sx={{ fontStyle: 'italic' }}>{projectDate}</Paragraph>
      <Paragraph>{description}</Paragraph>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {isEdit ? (
          <TextField
            label="Role"
            value={responsibility}
            onChange={handleSetResponsibility}
          />
        ) : (
          <>
            <SubsectionTitle title="Role" />
            <Chip sx={{ ml: '5px' }} label={responsibility} />
          </>
        )}
      </Box>
    </Paper>
  );
};

export default Project;
