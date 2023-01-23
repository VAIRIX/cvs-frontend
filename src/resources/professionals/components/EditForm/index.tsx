import {
  BooleanInput,
  Loading,
  NumberInput,
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
  ProfessionalRequest,
  ParsedProfessionalAttribute,
  ProfessionalAttributeResponse,
  ParsedProfessional,
  ProfessionalProjectResponse,
  ProjectResponse,
} from 'types';
import AddAttributesSection from '../AddAttributesSection';
import ProjectsSection from '../ProjectsSection';
import { FC, PropsWithChildren, useState } from 'react';
import { addSource, parseProfessionalAttributes } from 'utils';
import { Card, Box } from '@mui/material';

type EditFormProps = {
  save: (data: ProfessionalRequest, id: string) => void;
  professionalId?: string;
  attributes?: ProfessionalAttributeResponse[];
  projects?: ProfessionalProjectResponse[];
};

const EditForm: FC<PropsWithChildren<EditFormProps>> = ({
  save,
  professionalId,
  projects = [],
  attributes = [],
  children,
}) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [professionalProjects, setProfessionalProjects] = useState(projects);
  const [professionalAttributes, setProfessionalAttributes] = useState(
    parseProfessionalAttributes(attributes),
  );
  const {
    data: allProjects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetList<ProjectResponse>('projects');

  if (isLoadingProjects) {
    return <Loading />;
  }

  if (errorProjects) {
    notify(`Error: ${errorProjects}`, { type: 'error' });
    redirect('list', 'professionals');
    return null;
  }

  const handleSave = (values: unknown) => {
    const parsedValues = values as ParsedProfessional;
    const editProfessionalRequest: ProfessionalRequest = {
      about: parsedValues.about,
      email: parsedValues.email,
      english: Number(parsedValues.english),
      firstName: parsedValues.firstName,
      lastName: parsedValues.lastName,
      headline: parsedValues.headline,
      allocated: parsedValues.allocated,
      attributes: Object.values(professionalAttributes)
        .flat()
        .map((attribute: ParsedProfessionalAttribute) => ({
          attributeId: attribute.id,
          level: attribute.level,
        })),
      projects: professionalProjects.map((project) => ({
        projectId: project.project.id,
        responsibility: project.responsibility,
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
              source={addSource<ProfessionalRequest>('firstName')}
              sx={{ flex: 1, mr: 1 }}
              validate={required()}
            />
            <TextInput
              validate={required()}
              source={addSource<ProfessionalRequest>('lastName')}
              sx={{ flex: 1, ml: 1 }}
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
              source={addSource<ProfessionalRequest>('headline')}
              sx={{ flex: 1, mr: 1 }}
            />
            <BooleanInput
              sx={{
                flex: 1,
                ml: 1,
              }}
              label="Allocated"
              source={addSource<ProfessionalRequest>('allocated')}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              validate={required()}
              source={addSource<ProfessionalRequest>('email')}
              sx={{ flex: 1, mr: 1 }}
            />
            <NumberInput
              label="English level"
              min={1}
              max={5}
              source={addSource<ProfessionalRequest>('english')}
              sx={{ flex: 1, mr: 1 }}
              validate={required()}
            />
          </Box>

          <TextInput
            validate={required()}
            source={addSource<ProfessionalRequest>('about')}
            multiline
            fullWidth
            rows={6}
          />
          <AddAttributesSection
            professionalAttributes={professionalAttributes}
            setProfessionalAttributes={setProfessionalAttributes}
          />
        </Card>
        <Card variant="outlined" sx={{ m: 0, mr: 1, p: '25px', flex: 1 }}>
          <ProjectsSection
            projects={professionalProjects}
            isEdit
            setProfessionalProjects={setProfessionalProjects}
            allProjects={allProjects}
            professionalId={professionalId}
          />
        </Card>
      </Box>
    </SimpleForm>
  );
};

export default EditForm;