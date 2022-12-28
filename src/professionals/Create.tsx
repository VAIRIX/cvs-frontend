import React from 'react';

import {
  SimpleForm,
  EditProps,
  Create,
  TextInput,
  NumberInput,
} from 'react-admin';

export const ProfessionalCreate: React.FC<EditProps> = () => {
  return (
    <Create title="Create Professional" redirect={false}>
      <SimpleForm>
        <TextInput label="First Name" source="firstName" fullWidth required />
        <TextInput label="Last Name" source="lastName" fullWidth required />
        <NumberInput label="english" source="english" fullWidth required />
        <TextInput label="Email" source="email" fullWidth required />
        <TextInput label="About" source="about" fullWidth required />
        <TextInput label="Headline" source="headline" fullWidth required />
      </SimpleForm>
    </Create>
  );
};
