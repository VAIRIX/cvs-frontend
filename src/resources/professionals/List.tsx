import { ACTIONS } from 'api/resources';
import { TEXTS } from 'constants/index';
import {
  Datagrid,
  EmailField,
  List,
  NumberField,
  TextField,
  UrlField,
} from 'react-admin';

export const ProfessionalList = () => (
  <List title={TEXTS.PROFESSIONALS_TITLE} exporter={false}>
    <Datagrid rowClick={ACTIONS.SHOW}>
      <TextField source="firstName" />
      <TextField source="lastName" />
      <NumberField source="english" />
      <EmailField source="email" />
      <UrlField target={'_blank'} source="resumeUrl" title="Resume URL" />
    </Datagrid>
  </List>
);
