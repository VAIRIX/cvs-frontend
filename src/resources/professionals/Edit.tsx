import { FC, useState } from 'react';
import {
  Edit,
  useEditController,
  useNotify,
  useRedirect,
  useUpdate,
} from 'react-admin';
import Dialog from 'components/Dialog';
import { ProfessionalRequest, ProfessionalResponse } from 'types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Box, Typography } from '@mui/material';
import EditForm from './components/EditForm';
import { Loading, SectionTitle } from 'components/ui';
import { ACTIONS, RESOURCES } from 'api/resources';
import { TEXTS } from 'constants/index';

export const ProfessionalEdit: FC = () => {
  const [isExitConfirmationOpen, setIsExitConfirmationOpen] = useState(false);
  const notify = useNotify();
  const redirect = useRedirect();
  const { record, isLoading } = useEditController<ProfessionalResponse>();
  const [update] = useUpdate(undefined, undefined, {
    onSuccess: (data) => {
      notify(`Professional ${data.firstName} ${data.lastName} saved!`);
      redirect(ACTIONS.SHOW, RESOURCES.PROFESSIONALS, data.id);
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

  const { id, projects, attributes } = record;

  const handleSave = async (data: ProfessionalRequest, id: string) => {
    update(RESOURCES.PROFESSIONALS, { id: id, data: data });
  };

  const handleRedirectShow = () => {
    redirect(ACTIONS.SHOW, RESOURCES.PROFESSIONALS, id);
  };

  return (
    <>
      <Edit
        title={TEXTS.PROFESSIONALS_TITLE}
        redirect={ACTIONS.SHOW}
        component="div"
        actions={false}
      >
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
              mb: 2,
            }}
          >
            <SectionTitle title={TEXTS.EDIT_PROFESSIONAL} />
            <Box>
              <Button
                startIcon={<VisibilityIcon />}
                variant="outlined"
                onClick={() => setIsExitConfirmationOpen(true)}
              >
                {TEXTS.SHOW_PROFESSIONAL}
              </Button>
            </Box>
          </Box>
        </EditForm>
      </Edit>
      <Dialog
        closeText="Cancel"
        submitText="OK"
        dialogTitle="Are you sure you want to exit edit mode?"
        close={() => setIsExitConfirmationOpen(false)}
        isOpen={isExitConfirmationOpen}
        submit={handleRedirectShow}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Changes will be lost
        </Typography>
      </Dialog>
    </>
  );
};
