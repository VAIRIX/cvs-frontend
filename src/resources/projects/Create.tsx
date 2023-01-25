import { SectionTitle } from 'components/ui';
import React from 'react';

import {
  EditProps,
  Create,
  useNotify,
  useRedirect,
  useCreate,
} from 'react-admin';
import EditForm from 'resources/projects/components/EditForm';

export const ProjectsCreate: React.FC<EditProps> = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate(undefined, undefined, {
    onSuccess: (data) => {
      notify(`Project ${data.name} saved!`);
      redirect('show', 'projects', data.id);
    },
    onError: (error) => {
      if (error instanceof Error) {
        notify(`Error: ${error.message}`, { type: 'error' });
      } else {
        notify(`Error: ${error}`, { type: 'error' });
      }
    },
  });

  const handleSave = async (data: any) => {
    create('projects', { data });
  };

  return (
    <Create title="Projects" redirect="list">
      <EditForm save={handleSave}>
        <SectionTitle title="Create New Project" />
      </EditForm>
    </Create>
  );
};
