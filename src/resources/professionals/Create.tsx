import { FC } from 'react';
import { Create, useNotify, useRedirect, useCreate } from 'react-admin';
import { SectionTitle } from 'components/ui';
import EditForm from './components/EditForm';
import { ProfessionalRequest } from 'types';
import { ACTIONS, RESOURCES } from 'api/resources';
import { TEXTS } from 'constants/index';

export const ProfessionalCreate: FC = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate(undefined, undefined, {
    onSuccess: (data) => {
      notify(`Professional ${data.firstName} ${data.lastName} saved!`);
      redirect(ACTIONS.SHOW, RESOURCES.PROFESSIONALS, data.id);
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
    create(RESOURCES.PROFESSIONALS, { data });
  };

  return (
    <Create title={TEXTS.PROFESSIONALS_TITLE} redirect={ACTIONS.LIST}>
      <EditForm save={handleSave}>
        <SectionTitle title={TEXTS.CREATE_PROFESSIONAL} />
      </EditForm>
    </Create>
  );
};
