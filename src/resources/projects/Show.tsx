import { Show, useShowController } from 'react-admin';
import { Box, Card } from '@mui/material';
import { Paragraph, SectionTitle } from 'components/ui';
import { ProjectResponse } from 'types/projects';
import { formatProjectDates } from 'utils';
import { ProfessionalsSection } from './components/ProfessionalsSection';
import AttributesSection from './components/AttributesSection';

export const ProjectShow = () => {
  const { record } = useShowController<ProjectResponse>();

  if (!record) return null;

  const { name, description, from, to, professionals, attributes } = record;
  const projectDate = formatProjectDates(from, to);

  return (
    <Show title="Projects" component="div">
      <Box sx={{ display: 'flex' }}>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
          <SectionTitle title={name} />
          <Paragraph sx={{ fontStyle: 'italic' }}>{projectDate}</Paragraph>
          <Paragraph>{description}</Paragraph>
          <AttributesSection attributes={attributes} />
        </Card>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
          <ProfessionalsSection professionals={professionals} />
        </Card>
      </Box>
    </Show>
  );
};
