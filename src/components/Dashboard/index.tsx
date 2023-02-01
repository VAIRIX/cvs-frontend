import { Grid } from '@mui/material';
import { TEXTS } from 'constants/index';
import GridItem from './GridItem';
import MainTechnologies from './MainTechnologies';
import TotalBoxNumber from './TotalBoxNumber';
import TotalProfessionals from './TotalProfessionals';

const Dashboard = () => {
  // TODO: get data from analytics endpoint
  const totalClients = 20;
  const totalProjects = 48;
  return (
    <Grid padding={4} container spacing={4}>
      <GridItem title={TEXTS.TOTAL_PROFESSIONALS}>
        <TotalProfessionals />
      </GridItem>
      <GridItem title={TEXTS.TOTAL_CLIENTS}>
        <TotalBoxNumber value={totalClients} />
      </GridItem>
      <GridItem title={TEXTS.TOTAL_PROJECTS}>
        <TotalBoxNumber value={totalProjects} />
      </GridItem>
      <GridItem title={TEXTS.MAIN_TECHNOLOGIES}>
        <MainTechnologies />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
