import { Datagrid, List, TextField, DateField } from 'react-admin';

export const ProjectsList = () => (
  <List title="Projects" exporter={false}>
    <Datagrid rowClick="show">
      <DateField source="from" />
      <DateField source="duration" />
      <TextField source="description" />
    </Datagrid>
  </List>
);
