import React from 'react';
import { Typography, Grid } from '@mui/material';
import { ProfessionalProjectsProps } from './types';

export const ProfessionalProject = ({
  project,
  responsibility,
}: ProfessionalProjectsProps) => {
  return (
    <Grid justifyContent="left" direction="column" gap={2} container mb={2}>
      <Typography variant="h6" fontWeight="bold">
        {project.name}
      </Typography>
      <Grid xs={4} item>
        <Typography fontWeight="bold">Description:</Typography>
        <Typography>{project?.description}</Typography>
      </Grid>
      <Grid item>
        <Typography fontWeight="bold">Role: </Typography>
        <Typography>{responsibility}</Typography>
      </Grid>
      <Grid xs={4} item>
        <Typography fontWeight="bold">From: </Typography>
        <Typography>{project.from.split('T')[0]}</Typography>
      </Grid>
      <Grid xs={4} item>
        <Typography fontWeight="bold">To:</Typography>
        <Typography> {project.to.split('T')[0]}</Typography>
      </Grid>
    </Grid>
  );
};
