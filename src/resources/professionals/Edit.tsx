import { FC } from 'react';
import {
  Edit,
  useEditController,
  useNotify,
  useRedirect,
  useUpdate,
} from 'react-admin';
import { ProfessionalRequest, ProfessionalResponse } from 'types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Box } from '@mui/material';
import EditForm from './components/EditForm';
import { Loading, SectionTitle } from 'components/ui';

export const ProfessionalEdit: FC = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const { record, isLoading } = useEditController<ProfessionalResponse>();
  const [update] = useUpdate(undefined, undefined, {
    onSuccess: (data) => {
      notify(`Professional ${data.firstName} ${data.lastName} saved!`);
      redirect('show', 'professionals', data.id);
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

  const { id, projects, attributes } = record;

  const handleSave = async (data: ProfessionalRequest, id: string) => {
    update('professionals', { id: id, data: data });
  };

  const handleRedirectShow = () => {
    redirect('show', 'professionals', id);
  };

  return (
    <Edit title="Professionals" redirect="show" component={Box} actions={false}>
      <EditForm
        save={handleSave}
        professionalId={id}
        projects={projects}
        attributes={attributes}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: '24px',
          }}
        >
          <SectionTitle title="Edit Professional" />
          <Button
            startIcon={<VisibilityIcon />}
            variant="outlined"
            onClick={handleRedirectShow}
          >
            SHOW PROFESSIONAL
          </Button>
        </Box>
      </EditForm>
    </Edit>
  );
};
