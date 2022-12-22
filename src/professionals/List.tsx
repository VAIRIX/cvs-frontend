import {
  Datagrid,
  DateField,
  EmailField,
  List,
  NumberField,
  TextField,
} from 'react-admin';

export const ProfessionalList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <NumberField source="english" />
      <TextField source="about" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);
