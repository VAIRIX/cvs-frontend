import {
  Button,
  DateField,
  EditButton,
  EmailField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useNotify,
  WithRecord,
} from 'react-admin';
import { http } from '../api/httpClient';
import { useParams } from 'react-router-dom';
import { ProfessionalProjectsProps } from './types';
import { Box, Typography, Stack, Grid } from '@mui/material';

export const ProfessionalShow = () => {
  const { id } = useParams(); // this component is rendered in the /books/:id path
  const notify = useNotify();

  const generateCv = async () => {
    try {
      const res = await http.post('/resumes', { professionalId: id });
      notify(res.data.resumeUrl);
    } catch (error) {
      notify(error.message);
    }
  };
  const PostShowActions = () => {
    return (
      <TopToolbar>
        <EditButton />
        <Button label="Generate CV" onClick={generateCv} />
      </TopToolbar>
    );
  };

  return (
    <Show actions={<PostShowActions />}>
      <SimpleShowLayout>
        <TextField source="id" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <NumberField source="english" />
        <TextField source="about" />
        <EmailField source="email" />

        <WithRecord
          label="Projects"
          render={(record) =>
            record.projects.map((project: ProfessionalProjectsProps) => {
              return (
                <Grid
                  justifyContent="left"
                  direction="column"
                  gap={2}
                  container
                  mb={2}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {project.project.name}
                  </Typography>
                  <Grid xs={4} item>
                    <Typography fontWeight="bold">Description:</Typography>
                    <Typography>{project.project.description}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography fontWeight="bold">Role: </Typography>
                    <Typography>{project.responsibility}</Typography>
                  </Grid>
                  <Grid xs={4} item>
                    <Typography fontWeight="bold">From: </Typography>
                    <Typography>
                      {project.project.from.split('T')[0]}
                    </Typography>
                  </Grid>
                  <Grid xs={4} item>
                    <Typography fontWeight="bold">To:</Typography>
                    <Typography> {project.project.to.split('T')[0]}</Typography>
                  </Grid>
                </Grid>
              );
            })
          }
        />
      </SimpleShowLayout>
    </Show>
  );
};
