import { Show, useShowController } from 'react-admin';
import { Box, Button, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGenerateResume } from 'hooks';
import GoogleDocResume from './components/GoogleDocResume';
import { ProfessionalResponse } from 'types/professional';
import { SectionTitle, Paragraph } from 'components/ui';
import { ShowSection } from './components/ShowSection';
import AttributesSection from './components/AttributesSection';
import ProjectsSection from './components/ProjectsSection';
import { AllocatedChipChip } from 'components/AllocatedChip';

export const ProfessionalShow = () => {
  const { id } = useParams();
  const { generateResume, loading } = useGenerateResume(id);

  const { record } = useShowController<ProfessionalResponse>();

  return (
    <Show component="div">
      <Box sx={{ display: 'flex' }}>
        <ShowSection>
          <Box sx={{ display: 'flex', mb: '24px' }}>
            <Avatar
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                height: 70,
                width: 70,
                mr: '16px',
              }}
            ></Avatar>
            <Box>
              <SectionTitle
                title={`${record?.firstName} ${record?.lastName}`}
              />
              <SectionTitle sx={{ fontSize: 20 }} title={record?.headline} />
            </Box>
            <AllocatedChipChip value={record?.allocated} />
          </Box>
          <Paragraph>{record?.about}</Paragraph>
          <AttributesSection attributes={record?.attributes} />
          <ProjectsSection projects={record?.projects} />
        </ShowSection>
        <ShowSection>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <SectionTitle title="CV" />
            <Button variant="contained" size="small" onClick={generateResume}>
              GENERATE NEW CV
            </Button>
          </Box>
          <GoogleDocResume loading={loading} url={record?.resumeUrl} />
        </ShowSection>
      </Box>
    </Show>
  );
};
