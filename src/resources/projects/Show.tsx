import { Show, useShowController } from 'react-admin';
import { ShowSection } from 'resources/professionals/components/ShowSection';
import { Box } from '@mui/material';
import { Paragraph, SectionTitle } from 'components/ui';
import { Project } from 'types/projects';
import { formatProjectDates } from 'utils';
import AttributesSection from 'components/AttributesSection';
import { AttributeType, ProfessionalResponse } from 'types';
import { ProfessionalsList } from './components/ProfessionalsList';

export const ProjectShow = () => {
  const { record } = useShowController<Project>();

  if (!record) return null;

  const { name, description, from, to, professionals, attributes } = record;
  const projectDate = formatProjectDates(from, to);

  return (
    <Show component="div">
      <Box sx={{ display: 'flex' }}>
        <ShowSection>
          <SectionTitle sx={{ marginBottom: '20px' }} title={name} />
          <Paragraph>{description}</Paragraph>
          <Paragraph sx={{ fontStyle: 'italic' }}>{projectDate}</Paragraph>
          {attributes?.length && (
            <AttributesSection
              attributes={attributes}
              type={AttributeType.PROJECT}
            />
          )}
        </ShowSection>
        <ShowSection>
          <SectionTitle sx={{ marginBottom: '20px' }} title="Professionals" />
          <ProfessionalsList professionals={professionals} />
        </ShowSection>
      </Box>
    </Show>
  );
};
