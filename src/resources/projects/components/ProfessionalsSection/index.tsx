import { FC } from 'react';
import { ProjectProfessionalResponse } from 'types';
import Professional from './Professional';
import { Box } from '@mui/material';
import { SectionTitle } from 'components/ui';

type ProfessionalsSectionProps = {
  professionals: ProjectProfessionalResponse[] | undefined;
};

export const ProfessionalsSection: FC<ProfessionalsSectionProps> = ({
  professionals,
}) => (
  <Box>
    <Box sx={{ display: 'flex' }}>
      <SectionTitle title="Projects:" sx={{ mb: '24px' }} />
    </Box>
    {professionals?.map((professional: ProjectProfessionalResponse) => (
      <Professional
        key={professional?.professional.id}
        professional={professional?.professional}
        responsibility={professional?.responsibility}
      />
    ))}
  </Box>
);
