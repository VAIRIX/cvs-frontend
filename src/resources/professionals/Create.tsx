import { FC } from 'react';
import { Create, useNotify, useRedirect, useCreate } from 'react-admin';
import { SectionTitle } from 'components/ui';
import EditForm from './components/EditForm';
import { ProfessionalRequest } from 'types';

export const ProfessionalCreate: FC = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate(undefined, undefined, {
    onSuccess: (data) => {
      notify(`Professional ${data.firstName} ${data.lastName} saved!`);
      redirect('show', 'professionals', data.id);
    },
    onError: (error) => {
      if (error instanceof Error) {
        notify(`Error: ${error.message}`, { type: 'error' });
      } else {
        notify(`Error: ${error}`, { type: 'error' });
      }
    },
  });

  const handleSave = async (data: ProfessionalRequest) => {
    create('professionals', { data });
  };

  return (
    <Create title="Professionals" redirect="list">
      <EditForm save={handleSave}>
        <SectionTitle title="Create New Professional" />
      </EditForm>
    </Create>
  );
};
