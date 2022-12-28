import { Datagrid, List, TextField, DateField } from 'react-admin';

export const ProjectsList = () => (
  <List exporter={false}>
    <Datagrid rowClick="edit">
      <DateField source="from" />
      <DateField source="duration" />
      <TextField source="description" />
    </Datagrid>
  </List>
);
