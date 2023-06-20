import { ACTIONS } from 'api/resources';
import { TEXTS } from 'constants/index';
import { Datagrid, List, TextField, DateField } from 'react-admin';

export const ProjectsList = () => (
  <List
    filter={{ vairixProject: true }}
    title={TEXTS.PROJECTS_TITLE}
    exporter={false}
  >
    <Datagrid rowClick={ACTIONS.SHOW}>
      <DateField source="from" />
      <DateField source="duration" />
      <TextField source="description" />
    </Datagrid>
  </List>
);
