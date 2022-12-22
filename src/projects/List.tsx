import { Datagrid, DateField, List, TextField } from 'react-admin';

export const ProjectList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="name" />
      <DateField source="from" />
      <DateField source="to" />
      <TextField source="duration" />
      <TextField source="description" />
    </Datagrid>
  </List>
);
