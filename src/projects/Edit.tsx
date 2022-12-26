import React from 'react';

import {
  SimpleForm,
  EditProps,
  Create,
  DateInput,
  TextInput,
} from 'react-admin';

export const ProjectsEdit: React.FC<EditProps> = () => {
  return (
    <Create title="Edit Projects" redirect={false}>
      <SimpleForm>
        <DateInput label="From" source="from" fullWidth required />
        <DateInput label="Duration" source="duration" fullWidth required />
        <TextInput
          label="Description"
          source="description"
          fullWidth
          required
        />
      </SimpleForm>
    </Create>
  );
};
