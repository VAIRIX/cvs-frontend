import { Loading, Show, useRedirect, useShowController } from 'react-admin';
import { Box, Card, Button } from '@mui/material';
import { Paragraph, SectionTitle } from 'components/ui';
import { ProjectResponse } from 'types/projects';
import { formatProjectDates } from 'utils';
import { ProfessionalsSection } from './components/ProfessionalsSection';
import AttributesSection from './components/AttributesSection';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback } from 'react';

export const ProjectShow = () => {
  const { record, isLoading } = useShowController<ProjectResponse>();
  const redirect = useRedirect();

  if (!record) return null;

  if (isLoading) return <Loading />;

  const { id, name, description, from, to, professionals, attributes } = record;
  const projectDate = formatProjectDates(from, to);

  const handleRedirectEdit = useCallback(() => {
    redirect('edit', 'professionals', id);
  }, [redirect, id]);

  return (
    <Show title="Projects" component="div" actions={false}>
      <Box sx={{ display: 'flex' }}>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              mb: '24px',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <SectionTitle title={name} />
              <Paragraph sx={{ fontStyle: 'italic' }}>{projectDate}</Paragraph>
              <Paragraph>{description}</Paragraph>
              <AttributesSection attributes={attributes} />
            </Box>
            <Box>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={handleRedirectEdit}
              >
                EDIT PROJECT
              </Button>
            </Box>
          </Box>
        </Card>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
          <ProfessionalsSection professionals={professionals} />
        </Card>
      </Box>
    </Show>
  );
};
