import React, { FC } from 'react';
import { ProfessionalResponse } from 'types';
import { Box } from '@mui/material';
import { Paragraph, SectionTitle } from 'components/ui';

type ProfessionalsListProps = {
  professionals: ProfessionalResponse[] | undefined;
};

export const ProfessionalsList: FC<ProfessionalsListProps> = ({
  professionals,
}) => (
  <>
    {professionals?.map((professional: ProfessionalResponse) => (
      <Box key={professional.professional.id}>
        <SectionTitle
          sx={{ fontSize: '20px' }}
          title={professional.responsibility}
        />
        <Paragraph>
          {professional.professional.firstName}{' '}
          {professional.professional.lastName} -{' '}
          <span style={{ fontStyle: 'italic' }}>
            {professional.professional.headline}
          </span>
        </Paragraph>
      </Box>
    ))}
  </>
);
