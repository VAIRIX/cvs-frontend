import {
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from 'react-admin';
import {
  ProjectAttributeResponse,
  ProjectProfessionalResponse,
  ParsedProjectAttribute,
  ParsedProjects,
  ProjectRequest,
} from 'types';
import AddAttributesSection from '../AddAttributesSection';
import { ProfessionalsSection } from '../ProfessionalsSection';
import { FC, PropsWithChildren, useState } from 'react';
import { addSource, parseProjectAttributes } from 'utils';
import { Card, Box } from '@mui/material';

type EditFormProps = {
  save: (data: ProjectRequest, id: string) => void;
  projectId?: string;
  attributes?: ProjectAttributeResponse[];
  professionals?: ProjectProfessionalResponse[];
};

const EditForm: FC<PropsWithChildren<EditFormProps>> = ({
  save,
  projectId,
  professionals = [],
  attributes = [],
  children,
}) => {
  const [projectProfessionals, setProjectProfessionals] =
    useState(professionals);
  const [projectAttributes, setProjectAttributes] = useState(
    parseProjectAttributes(attributes),
  );

  const handleSave = (values: unknown) => {
    const parsedValues = values as ParsedProjects;
    const editProfessionalRequest: ProjectRequest = {
      id: parsedValues.id,
      name: parsedValues.name,
      description: parsedValues.description,
      attributes: Object.values(projectAttributes)
        .flat()
        .map((attribute: ParsedProjectAttribute) => ({
          attributeId: attribute.id,
          attribute: attribute,
        })),
      professionals: projectProfessionals.map((professional) => ({
        professionalId: professional.professional.id,
        professional: professional.professional,
        responsibility: professional.responsibility,
        startDate: professional.startDate,
        endDate: professional.endDate,
      })),
    };

    save(editProfessionalRequest, parsedValues.id);
  };

  return (
    <SimpleForm
      component={Box}
      onSubmit={handleSave}
      toolbar={
        <Toolbar>
          <SaveButton alwaysEnable />
        </Toolbar>
      }
    >
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: 2, flex: 1 }}>
          {children}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              source={addSource<ProjectRequest>('name')}
              sx={{ flex: 1, mr: 1 }}
              validate={required()}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextInput
              validate={required()}
              source={addSource<ProjectRequest>('description')}
              sx={{ flex: 1, mr: 1 }}
            />
          </Box>
          <AddAttributesSection
            projectAttributes={projectAttributes}
            setProjectAttributes={setProjectAttributes}
          />
        </Card>
        <Card variant="outlined" sx={{ m: 0, ml: 1, p: 2, flex: 1 }}>
          <ProfessionalsSection
            isEdit
            projectId={projectId}
            professionals={projectProfessionals}
            setProjectProfessionals={setProjectProfessionals}
          />
        </Card>
      </Box>
    </SimpleForm>
  );
};

export default EditForm;
