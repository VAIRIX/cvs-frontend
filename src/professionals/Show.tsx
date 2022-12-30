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
import { dataProvider } from '../api/dataProvider';
import { useEffect, useState } from 'react';
import { ProfessionalProjectsProps, ProfessionalProps } from './types';

export const ProfessionalShow = () => {
  const { id } = useParams(); // this component is rendered in the /books/:id path
  const notify = useNotify();
  const [professionalData, setProfessionalData] = useState<ProfessionalProps>();

  useEffect(() => {
    dataProvider
      .getOne('professionals', { id: id })
      .then(({ data }) => {
        setProfessionalData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

        <h2>Projects</h2>
        {professionalData?.projects.map(
          (project: ProfessionalProjectsProps) => {
            return (
              <div>
                <h3>{project.project.name}</h3>
                <p>Description: {project.project.description}</p>
                <p>Role: {project.responsibility}</p>
                <p>From: {project.project.from.split('T')[0]}</p>
                <p>To: {project.project.to.split('T')[0]}</p>
              </div>
            );
          },
        )}
      </SimpleShowLayout>
    </Show>
  );
};
