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
import { ACTIONS, RESOURCES } from 'api/resources';
import { TEXTS } from 'constants/index';

export const ProjectsEdit: FC = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const { record, isLoading } = useEditController<ProjectResponse>();
  const [update] = useUpdate(undefined, undefined, {
    onSuccess: (data) => {
      notify(`Project ${data.name} saved!`);
      redirect(ACTIONS.SHOW, RESOURCES.PROJECTS, data.id);
    },
    onError: (error) => {
      if (error instanceof Error) {
        notify(`Error: ${error.message}`, { type: 'error' });
      } else {
        notify(`Error: ${error}`, { type: 'error' });
      }
    },
  });

  if (isLoading) return <Loading />;

  if (!record) return null;

  const { id, professionals, attributes } = record;

  const handleSave = async (data: ProjectRequest, id: string) => {
    update(RESOURCES.PROJECTS, { id: id, data: data });
  };

  const handleRedirectShow = () => {
    redirect(ACTIONS.SHOW, RESOURCES.PROJECTS, id);
  };

  return (
    <Edit
      title={TEXTS.PROJECTS_TITLE}
      redirect={ACTIONS.SHOW}
      component={Box}
      actions={false}
    >
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
            mb: 2,
          }}
        >
          <SectionTitle title={TEXTS.EDIT_PROJECT} />
          <Box>
            <Button
              startIcon={<VisibilityIcon />}
              variant="outlined"
              onClick={handleRedirectShow}
            >
              {TEXTS.SHOW_PROJECT}
            </Button>
          </Box>
        </Box>
      </EditForm>
    </Edit>
  );
};
