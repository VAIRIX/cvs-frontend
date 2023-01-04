import { DateField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const ProjectShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="name" />
      <DateField source="from" />
      <DateField source="to" />
      <TextField source="duration" />
      <TextField source="description" />
    </SimpleShowLayout>
  </Show>
);
