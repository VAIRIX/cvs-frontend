import React from 'react';

import { SimpleForm, EditProps, Edit, DateInput, TextInput } from 'react-admin';

export const ProjectsEdit: React.FC<EditProps> = () => {
  return (
    <Edit title="Edit Projects" redirect={false}>
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
    </Edit>
  );
};
