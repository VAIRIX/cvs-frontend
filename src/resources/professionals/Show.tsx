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
  UrlField,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import { ProfessionalProjectsProps } from '../../professionals/types';
import { useGenerateResume } from '../../hooks';
import { ProfessionalProject } from '../../professionals/ProfessionalProject';

export const ProfessionalShow = () => {
  const { id } = useParams();
  const { generateResume, loading } = useGenerateResume(id);

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

        <WithRecord
          label="Projects"
          render={(record) =>
            record?.projects?.map((project: ProfessionalProjectsProps) => (
              <ProfessionalProject
                project={project.project}
                responsibility={project?.responsibility}
              />
            ))
          }
        />
        <UrlField target={'_blank'} source="resumeUrl" />
        {loading && <p>Generating resume...</p>}
      </SimpleShowLayout>
    </Show>
  );
};
