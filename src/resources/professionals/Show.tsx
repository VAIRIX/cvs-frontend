import { Loading, Show, useRedirect, useShowController } from 'react-admin';
import { Box, Button, Avatar, Card } from '@mui/material';
import { useGenerateResume } from 'hooks';
import GoogleDocResume from './components/GoogleDocResume';
import { ProfessionalResponse } from 'types/professional';
import { SectionTitle, Paragraph } from 'components/ui';
import AttributesSection from './components/AttributesSection';
import ProjectsSection from './components/ProjectsSection';
import IsAllocatedChipChip from 'components/IsAllocatedChip';
import EditIcon from '@mui/icons-material/Edit';
import { TEXTS } from 'constants/index';
import { ACTIONS, RESOURCES } from 'api/resources';

export const ProfessionalShow = () => {
  const redirect = useRedirect();
  const { record, isLoading } = useShowController<ProfessionalResponse>();
  const { generateResume, loading } = useGenerateResume();

  if (isLoading) return <Loading />;

  if (!record) return null;

  const {
    id,
    attributes,
    firstName,
    lastName,
    headline,
    allocated,
    about,
    projects,
    resumeUrl,
  } = record;

  const handleRedirectEdit = () => {
    redirect(ACTIONS.EDIT, RESOURCES.PROFESSIONALS, id);
  };

  const handleGenerateResume = () => {
    generateResume(id);
  };

  return (
    <Show title={TEXTS.PROFESSIONALS_TITLE} component="div" actions={false}>
      <Box sx={{ display: 'flex' }}>
        <Card
          data-testid="professionalBox"
          variant="outlined"
          sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}
        >
          <Box
            sx={{
              display: 'flex',
              mb: 2,
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Avatar
                data-testid="professionalAvatar"
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  height: 70,
                  width: 70,
                  mr: 2,
                }}
              ></Avatar>
              <Box data-testid="professionalTitle">
                <SectionTitle title={`${firstName} ${lastName}`} />
                <SectionTitle sx={{ fontSize: 20 }} title={headline} />
              </Box>
              <IsAllocatedChipChip
                data-testid="professionalAllocated"
                value={allocated}
              />
            </Box>
            <Box>
              <Button
                data-testid="editProfessional"
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={handleRedirectEdit}
              >
                {TEXTS.EDIT_PROFESSIONAL}
              </Button>
            </Box>
          </Box>
          <Box data-testid="professionalAbout">
            <Paragraph>{about}</Paragraph>
          </Box>
          <AttributesSection attributes={attributes} />
          <ProjectsSection projects={projects} professionalId={id} />
        </Card>
        <Card variant="outlined" sx={{ m: 0, ml: 1, p: 2, flex: 1 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={handleGenerateResume}>
              {TEXTS.GENERATE_NEW_CV}
            </Button>
          </Box>
          <GoogleDocResume loading={loading} url={resumeUrl} />
        </Card>
      </Box>
    </Show>
  );
};
