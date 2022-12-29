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
  UrlField,
  useNotify,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import API from '../../api/api';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

export const ProfessionalShow = () => {
  const { id } = useParams();
  const notify = useNotify();

  const generateResume = async () => {
    if (!id) return;
    try {
      const { resumeUrl } = await API.generateResume(id);
      notify(resumeUrl);
    } catch (error) {
      if (error instanceof Error) {
        notify(error.message);
      } else {
        notify(ERROR_MESSAGES.GENERIC_ERROR);
      }
    }
  };
  const PostShowActions = () => {
    return (
      <TopToolbar>
        <EditButton />
        <Button label="Generate Resume" onClick={generateResume} />
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
        <UrlField target={'_blank'} source="resumeUrl" />
      </SimpleShowLayout>
    </Show>
  );
};
