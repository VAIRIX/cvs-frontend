import React, { useState, FC, PropsWithChildren, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Autocomplete,
  AutocompleteRenderInputParams,
} from '@mui/material';
import {
  Create,
  TextInput,
  useGetList,
  required,
  SimpleForm,
  useCreate,
  useNotify,
  useRedirect,
  useUpdate,
  Toolbar,
  useGetOne,
} from 'react-admin';
import {
  ParsedProjectAttribute,
  ParsedProjects,
  ProjectResponse,
  ProjectRequest,
  ProfessionalResponse,
} from 'types';
import { ACTIONS, RESOURCES } from 'api/resources';
import { TEXTS } from 'constants/texts';
import { addSource, parseProjectAttributes } from 'utils';
import AddAttributesSection from 'resources/projects/components/AddAttributesSection';

type StepsProps = {
  open: boolean;
  handleClose: () => void;
  professionalId: string;
  ownProjectsId: string[];
};

const StepsDialog: FC<PropsWithChildren<StepsProps>> = ({
  open,
  handleClose,
  professionalId,
  ownProjectsId,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [vairixProject, setVairixProject] = useState(false);
  const steps = ['Project Type', 'Details'];

  const [selectedProject, setSelectedProject] =
    useState<ProjectResponse | null>(null);
  const [professionalRole, setProfessionalRole] = useState('');
  const notify = useNotify();
  const redirect = useRedirect();

  const { data: allProjects } = useGetList<ProjectResponse>(
    RESOURCES.PROJECTS,
    {
      filter: {
        vairixProject: true,
      },
    },
  );

  const [projectAttributes, setProjectAttributes] = useState(
    parseProjectAttributes(undefined),
  );

  const [create] = useCreate(undefined, undefined, {
    onSuccess: (data) => {
      notify(`Project ${data.name} saved!`);
      redirect(ACTIONS.SHOW, RESOURCES.PROFESSIONALS, professionalId);
    },
    onError: (error) => {
      if (error instanceof Error) {
        notify(`Error: ${error.message}`, { type: 'error' });
      } else {
        notify(`Error: ${error}`, { type: 'error' });
      }
    },
  });

  const [update] = useUpdate(undefined, undefined, {
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

  const { data: professionalData } = useGetOne<ProfessionalResponse>(
    RESOURCES.PROFESSIONALS,
    {
      id: professionalId,
    },
  );

  type VairixProjectData = {
    responsibility: string;
    duration: string;
  };
  const handleSave = async (payload: unknown) => {
    if (vairixProject) {
      if (!selectedProject) return;
      if (!professionalRole) return;
      if (!professionalData) return;

      const parsedValues = payload as VairixProjectData;
      const editProfessionalRequest = {
        ...professionalData,
        projects: professionalData.projects.map((project) => ({
          projectId: project.project.id,
          responsibility: project.responsibility,
          duration: project.duration,
        })),
        attributes: Object.values(professionalData.attributes)
          .flat()
          .map((attribute) => ({
            attributeId: attribute.attribute.id,
            level: attribute.level,
          })),
      };

      editProfessionalRequest.projects.push({
        projectId: selectedProject.id,
        responsibility: parsedValues.responsibility,
        duration: parsedValues.duration,
      });

      update(RESOURCES.PROFESSIONALS, {
        id: professionalId,
        data: editProfessionalRequest,
      });
      return;
    }

    const parsedValues = payload as ParsedProjects;
    const data = {
      ...parsedValues,
      vairixProject: String(vairixProject),
      professionals: [
        {
          responsibility: parsedValues.role,
          professionalId: professionalId,
          duration: parsedValues.duration,
        },
      ],
      attributes: Object.values(projectAttributes)
        .flat()
        .map((attribute: ParsedProjectAttribute) => ({
          attributeId: attribute.id,
          attribute: attribute,
          from: new Date(parsedValues.from),
          to: new Date(parsedValues.to),
        })),
    };
    create(RESOURCES.PROJECTS, { data });
  };

  const handleGetOptionLabel = useCallback(
    (option: ProjectResponse): string => {
      return `${option.name}`;
    },
    [],
  );

  const handleOnChangeAutocomplete = useCallback(
    (_: unknown, newValue: ProjectResponse | null) => {
      setSelectedProject(newValue);
    },
    [],
  );

  const handleRenderInputAutocomplete = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField {...params} label={TEXTS.SEARCH_PROJECT} fullWidth />
    ),
    [],
  );

  const handleRoleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfessionalRole(e.target.value);
    },
    [],
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          minWidth: '500px',
          minHeight: '300px',
          display: 'flex',
          'align-items': 'center',
          ' flex-direction': 'column',
          'justify-content': 'space-between',
        }}
      >
        <Stepper
          sx={{ paddingTop: '10px', width: '400px' }}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Box
            sx={{
              display: 'flex',
              height: '200px',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleNext();
                setVairixProject(true);
              }}
              data-testid="addProject"
            >
              Vairix Project
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleNext();
                setVairixProject(false);
              }}
              data-testid="addProject"
            >
              External Project
            </Button>
          </Box>
        )}
        {activeStep === 1 &&
          (vairixProject && allProjects ? (
            <Create>
              <SimpleForm noValidate={true} onSubmit={handleSave}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                  }}
                >
                  <Autocomplete
                    data-testid="search-project"
                    value={selectedProject}
                    onChange={handleOnChangeAutocomplete}
                    options={allProjects.filter(
                      (project) => !ownProjectsId.includes(project.id),
                    )}
                    getOptionLabel={handleGetOptionLabel}
                    renderInput={handleRenderInputAutocomplete}
                  />
                  <TextInput
                    source={'responsibility'}
                    validate={required()}
                    label={TEXTS.ROLE_LABEL}
                    onChange={handleRoleChange}
                    sx={{ flex: 1, mr: 1 }}
                  />
                  <TextInput
                    source={'duration'}
                    sx={{ flex: 1, mr: 1 }}
                    validate={required()}
                  />
                </Box>
              </SimpleForm>
            </Create>
          ) : (
            <div>
              <Create>
                <SimpleForm toolbar={<Toolbar />} onSubmit={handleSave}>
                  <Card variant="outlined" sx={{ m: 0, mr: 1, p: 2, flex: 1 }}>
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
                        multiline
                        resettable
                        fullWidth
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
                        source={addSource('role')}
                        sx={{ flex: 1, mr: 1 }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TextInput
                        source={'duration'}
                        sx={{ flex: 1, mr: 1 }}
                        validate={required()}
                      />
                    </Box>
                    <AddAttributesSection
                      projectAttributes={projectAttributes}
                      setProjectAttributes={setProjectAttributes}
                    />
                  </Card>
                </SimpleForm>
              </Create>
            </div>
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default StepsDialog;
