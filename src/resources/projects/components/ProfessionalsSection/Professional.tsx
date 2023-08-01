import { FC, useCallback } from 'react';
import { Box, Paper, Button } from '@mui/material';
import { ProfessionalResponse } from 'types';
import { Chip, SectionTitle, SubsectionTitle, Paragraph } from 'components/ui';
import {
  Launch as LaunchIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useRedirect } from 'react-admin';
import { ACTIONS, RESOURCES } from 'api/resources';
import { TEXTS } from 'constants/index';

type ProjectProps = {
  professional: ProfessionalResponse;
  responsibility: string;
  deleteProfessional: (id: string) => void;
  isEdit: boolean;
  duration: string;
};

const Professional: FC<ProjectProps> = ({
  professional,
  responsibility,
  deleteProfessional,
  isEdit,
  duration,
}) => {
  const redirect = useRedirect();
  const { firstName, lastName, headline, id } = professional;

  const handleDeleteProfessional = useCallback(() => {
    if (!deleteProfessional) return;
    deleteProfessional(id);
  }, [id, deleteProfessional]);

  const handleShowProfessional = () => {
    redirect(ACTIONS.SHOW, RESOURCES.PROFESSIONALS, id);
  };

  return (
    <Paper
      sx={{
        mb: 2,
        p: 2,
        position: 'relative',
      }}
      elevation={3}
    >
      {isEdit && (
        <DeleteIcon
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: '#d32f2f',
            cursor: 'pointer',
          }}
          onClick={handleDeleteProfessional}
        />
      )}
      <Box>
        <Button sx={{ p: 0 }} onClick={handleShowProfessional}>
          <SectionTitle
            sx={{ fontSize: 20 }}
            title={`${firstName} ${lastName} - ${headline}`}
          />
          <LaunchIcon />
        </Button>
        <Paragraph sx={{ fontStyle: 'italic' }}>{duration}</Paragraph>
        <SubsectionTitle title={TEXTS.ROLE_LABEL} />
        <Chip sx={{ ml: 2 }} label={responsibility} />
      </Box>
    </Paper>
  );
};

export default Professional;
