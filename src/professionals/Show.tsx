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
  WithRecord,
} from 'react-admin';
import { http } from '../api/httpClient';
import { useParams } from 'react-router-dom';
import { ProfessionalProjectsProps } from './types';
import { ProfessionalProject } from './ProfessionalProject';

export const ProfessionalShow = () => {
  const { id } = useParams(); // this component is rendered in the /books/:id path
  const notify = useNotify();

  const generateCv = async () => {
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
        <Button label="Generate CV" onClick={generateCv} />
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

        <WithRecord
          label="Projects"
          render={(record) =>
            record.projects.map((project: ProfessionalProjectsProps) => (
              <ProfessionalProject
                project={project.project}
                responsibility={project.responsibility}
              />
            ))
          }
        />
      </SimpleShowLayout>
    </Show>
  );
};
