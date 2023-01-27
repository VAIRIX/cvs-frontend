import { FC, useCallback } from 'react';
import { Box, Paper, Button } from '@mui/material';
import { ProfessionalResponse } from 'types';
import { Chip, SectionTitle, SubsectionTitle } from 'components/ui';
import {
  Launch as LaunchIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useRedirect } from 'react-admin';

type ProjectProps = {
  professional: ProfessionalResponse;
  responsibility: string;
  deleteProfessional: (id: string) => void;
  isEdit: boolean;
};

const Project: FC<ProjectProps> = ({
  professional,
  responsibility,
  deleteProfessional,
  isEdit,
}) => {
  const redirect = useRedirect();
  const { firstName, lastName, headline, id } = professional;

  const handleDeleteProfessional = useCallback(() => {
    if (!deleteProfessional) return;
    deleteProfessional(id);
  }, [id, deleteProfessional]);

  const handleShowProfessional = () => {
    redirect('show', 'professionals', id);
  };

  return (
    <Paper
      sx={{
        mb: '24px',
        p: 2,
        position: 'relative',
      }}
      elevation={1}
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
        <Button sx={{ p: '0' }} onClick={handleShowProfessional}>
          <SectionTitle
            sx={{ fontSize: 20 }}
            title={`${firstName} ${lastName} - ${headline}`}
          />
          <LaunchIcon />
        </Button>
        <SubsectionTitle title="Role" />
        <Chip sx={{ ml: '5px' }} label={responsibility} />
      </Box>
    </Paper>
  );
};

export default Project;
