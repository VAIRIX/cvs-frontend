import { Loading, Show, useRedirect, useShowController } from 'react-admin';
import { Box, Card, Button } from '@mui/material';
import { Paragraph, SectionTitle } from 'components/ui';
import { ProjectResponse } from 'types/projects';
import { ProfessionalsSection } from './components/ProfessionalsSection';
import AttributesSection from './components/AttributesSection';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback } from 'react';
import { TEXTS } from 'constants/index';
import { ACTIONS, RESOURCES } from 'api/resources';

export const ProjectShow = () => {
  const { record, isLoading } = useShowController<ProjectResponse>();
  const redirect = useRedirect();

  const handleRedirectEdit = useCallback(() => {
    redirect(ACTIONS.EDIT, RESOURCES.PROJECTS, record?.id);
  }, [redirect, record?.id]);

  if (isLoading) return <Loading />;

  if (!record) return null;

  const { name, description, professionals, attributes } = record;

  return (
    <Show title={TEXTS.PROJECTS_TITLE} component="div" actions={false}>
      <Box sx={{ display: 'flex' }}>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: 2, flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              mb: 2,
              justifyContent: 'space-between',
            }}
          >
            <SectionTitle title={name} />
            <Box>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={handleRedirectEdit}
              >
                {TEXTS.EDIT_PROJECT}
              </Button>
            </Box>
          </Box>
          <Paragraph>{description}</Paragraph>
          <AttributesSection attributes={attributes} />
        </Card>
        <Card variant="outlined" sx={{ m: 0, ml: 1, p: 2, flex: 1 }}>
          <ProfessionalsSection professionals={professionals} />
        </Card>
      </Box>
    </Show>
  );
};
