import React from 'react';
import { Typography, Grid } from '@mui/material';
import { ProfessionalProjectsProps } from './types';
import { formatDate } from '../utils';

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
        <Typography>{formatDate(project?.from)}</Typography>
      </Grid>
      <Grid xs={4} item>
        <Typography fontWeight="bold">To:</Typography>
        <Typography>{formatDate(project?.to)}</Typography>
      </Grid>
    </Grid>
  );
};
