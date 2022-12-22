import {
  Button,
  DateField,
  EditButton,
  EmailField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useNotify,
} from 'react-admin';
import { http } from '../api/httpClient';
import { useParams } from 'react-router-dom';

export const ProfessionalShow = () => {
  const { id } = useParams(); // this component is rendered in the /books/:id path
  const notify = useNotify();

  const customAction = async () => {
    try {
      const res = await http.post('/resumes', { professionalId: id });
      notify(res.data.resumeUrl);
    } catch (error) {
      notify(error.message);
    }
  };
  const PostShowActions = () => {
    return (
      <TopToolbar>
        <EditButton />
        <Button label="Generate CV" onClick={customAction} />
      </TopToolbar>
    );
  };

  return (
    <Show actions={<PostShowActions />}>
      <SimpleShowLayout>
        <TextField source="id" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <NumberField source="english" />
        <TextField source="about" />
        <EmailField source="email" />
      </SimpleShowLayout>
    </Show>
  );
};
