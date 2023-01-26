import {
  DateInput,
  Loading,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useGetList,
  useNotify,
  useRedirect,
} from 'react-admin';
import {
  ProjectAttributeResponse,
  ProjectProfessionalResponse,
  ParsedProjectAttribute,
  ParsedProjects,
  ProjectRequest,
  ProfessionalResponse,
} from 'types';
import AddAttributesSection from '../AddAttributesSection';
import { ProfessionalsSection } from '../ProfessionalsSection';
import { FC, PropsWithChildren, useState } from 'react';
import { addSource, formatDate, parseProjectAttributes } from 'utils';
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
  const notify = useNotify();
  const redirect = useRedirect();
  const [projectProfessionals, setProjectProfessionals] =
    useState(professionals);
  const [projectAttributes, setProjectAttributes] = useState(
    parseProjectAttributes(attributes),
  );
  const {
    data: allProfessionals,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetList<ProfessionalResponse>('professionals');

  if (isLoadingProjects) {
    return <Loading />;
  }

  if (errorProjects) {
    notify(`Error: ${errorProjects}`, { type: 'error' });
    redirect('list', 'projects');
    return null;
  }

  const handleSave = (values: unknown) => {
    const parsedValues = values as ParsedProjects;
    const editProfessionalRequest: ProjectRequest = {
      id: parsedValues.id,
      name: parsedValues.name,
      from: parsedValues.from,
      to: parsedValues.to,
      duration: parsedValues.duration,
      description: parsedValues.description,
      attributes: Object.values(projectAttributes)
        .flat()
        .map((attribute: ParsedProjectAttribute) => ({
          attributeId: attribute.id,
          attribute: attribute,
          from: new Date(parsedValues.from),
          to: new Date(parsedValues.to),
        })),
      professionals: projectProfessionals.map((professional) => ({
        professionalId: professional.professional.id,
        professional: professional.professional,
        responsibility: professional.responsibility,
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
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <DateInput
              validate={required()}
              source={addSource<ProjectRequest>('from')}
              sx={{ flex: 1, mr: 1 }}
            />
            <DateInput
              validate={required()}
              source={addSource<ProjectRequest>('to')}
              sx={{ flex: 1, mr: 1 }}
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
              source={addSource<ProjectRequest>('duration')}
              sx={{ flex: 1, mr: 1 }}
            />
          </Box>
          <AddAttributesSection
            projectAttributes={projectAttributes}
            setProjectAttributes={setProjectAttributes}
          />
        </Card>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
          <ProfessionalsSection
            isEdit={true}
            projectId={projectId}
            professionals={projectProfessionals}
            allProfessionals={allProfessionals}
            setProjectProfessionals={setProjectProfessionals}
          />
        </Card>
      </Box>
    </SimpleForm>
  );
};

export default EditForm;
