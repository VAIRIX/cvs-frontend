import { Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const ProfessionalEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <NumberInput source="english" />
      <TextInput source="about" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);
