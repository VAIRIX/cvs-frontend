import { DateInput, Edit, SimpleForm, TextInput } from 'react-admin';

export const ProjectEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <DateInput source="createdAt" />
      <DateInput source="updatedAt" />
      <TextInput source="name" />
      <DateInput source="from" />
      <DateInput source="to" />
      <TextInput source="duration" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);
