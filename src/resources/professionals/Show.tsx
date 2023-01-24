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

export const ProfessionalShow = () => {
  const redirect = useRedirect();
  const { record, isLoading } = useShowController<ProfessionalResponse>();
  const { generateResume, loading } = useGenerateResume();

  if (!record) return null;

  if (isLoading) return <Loading />;

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
    redirect('edit', 'professionals', id);
  };

  const handleGenerateResume = () => {
    generateResume(id);
  };

  return (
    <Show title="Professionals" component="div" actions={false}>
      <Box sx={{ display: 'flex' }}>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              mb: '24px',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Avatar
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  height: 70,
                  width: 70,
                  mr: '16px',
                }}
              ></Avatar>
              <Box>
                <SectionTitle title={`${firstName} ${lastName}`} />
                <SectionTitle sx={{ fontSize: 20 }} title={headline} />
              </Box>
              <IsAllocatedChipChip value={allocated} />
            </Box>
            <Box>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={handleRedirectEdit}
              >
                EDIT PROFESSIONAL
              </Button>
            </Box>
          </Box>
          <Paragraph>{about}</Paragraph>
          <AttributesSection attributes={attributes} />
          <ProjectsSection projects={projects} professionalId={id} />
        </Card>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={handleGenerateResume}>
              GENERATE NEW CV
            </Button>
          </Box>
          <GoogleDocResume loading={loading} url={resumeUrl} />
        </Card>
      </Box>
    </Show>
  );
};
