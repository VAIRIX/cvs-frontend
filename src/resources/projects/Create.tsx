import {
  EditProps,
  Create,
  useNotify,
  useRedirect,
  useCreate,
} from 'react-admin';
import { ACTIONS, RESOURCES } from 'api/resources';
import { SectionTitle } from 'components/ui';
import React from 'react';
import EditForm from 'resources/projects/components/EditForm';
import { ProjectRequest } from 'types';
import { TEXTS } from 'constants/index';

export const ProjectsCreate: React.FC<EditProps> = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate(undefined, undefined, {
    onSuccess: (data) => {
      notify(`Project ${data.name} saved!`);
      redirect(ACTIONS.SHOW, RESOURCES.PROJECTS, data.id);
    },
    onError: (error) => {
      if (error instanceof Error) {
        notify(`Error: ${error.message}`, { type: 'error' });
      } else {
        notify(`Error: ${error}`, { type: 'error' });
      }
    },
  });

  const handleSave = async (data: ProjectRequest) => {
    create(RESOURCES.PROJECTS, { data });
  };

  return (
    <Create title={TEXTS.PROJECTS_TITLE} redirect={ACTIONS.LIST}>
      <EditForm save={handleSave}>
        <SectionTitle title={TEXTS.CREATE_PROJECT} />
      </EditForm>
    </Create>
  );
};
