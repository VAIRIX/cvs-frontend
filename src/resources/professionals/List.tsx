import {
  Datagrid,
  EmailField,
  List,
  NumberField,
  TextField,
  UrlField,
} from 'react-admin';

export const ProfessionalList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <NumberField source="english" />
      <EmailField source="email" />
      <UrlField target={'_blank'} source="resumeUrl" title="Resume URL" />
    </Datagrid>
  </List>
);
