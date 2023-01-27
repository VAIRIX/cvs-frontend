import { FC } from 'react';
import {
  Edit,
  useEditController,
  useNotify,
  useRedirect,
  useUpdate,
} from 'react-admin';
import { ProjectRequest, ProjectResponse } from 'types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Box } from '@mui/material';
import EditForm from './components/EditForm';
import { Loading, SectionTitle } from 'components/ui';

export const ProjectsEdit: FC = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const { record, isLoading } = useEditController<ProjectResponse>();
  const [update] = useUpdate(undefined, undefined, {
    onSuccess: (data) => {
      notify(`Project ${data.name} saved!`);
      redirect('show', 'projects', data.id);
    },
    onError: (error) => {
      if (error instanceof Error) {
        notify(`Error: ${error.message}`, { type: 'error' });
      } else {
        notify(`Error: ${error}`, { type: 'error' });
      }
    },
  });

  if (!record) return null;

  if (isLoading) return <Loading />;

  const { id, professionals, attributes } = record;

  const handleSave = async (data: ProjectRequest, id: string) => {
    update('projects', { id: id, data: data });
  };

  const handleRedirectShow = () => {
    redirect('show', 'projects', id);
  };

  return (
    <Edit title="Projects" redirect="show" component={Box} actions={false}>
      <EditForm
        save={handleSave}
        projectId={id}
        professionals={professionals}
        attributes={attributes}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: '24px',
          }}
        >
          <SectionTitle title="Edit Project" />
          <Button
            startIcon={<VisibilityIcon />}
            variant="outlined"
            onClick={handleRedirectShow}
          >
            SHOW PROJECT
          </Button>
        </Box>
      </EditForm>
    </Edit>
  );
};
