import { FC } from 'react';
import { Box, Paper, Button } from '@mui/material';
import { ProjectProfessionalResponse } from 'types';
import { Chip, SectionTitle, SubsectionTitle } from 'components/ui';
import { Launch as LaunchIcon } from '@mui/icons-material';
import { useRedirect } from 'react-admin';

type ProjectProps = ProjectProfessionalResponse;

const Project: FC<ProjectProps> = ({ professional, responsibility }) => {
  const redirect = useRedirect();
  const { firstName, lastName, headline, id } = professional;

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
      elevation={3}
    >
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
