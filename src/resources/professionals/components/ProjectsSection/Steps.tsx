import React, { useState, FC, PropsWithChildren, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
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
  DateInput,
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
import { addSource, formatDate, parseProjectAttributes } from 'utils';
import AddAttributesSection from 'resources/projects/components/AddAttributesSection';

type StepsProps = {
  open: boolean;
  handleClose: () => void;
  professionalId: string;
};

const StepsDialog: FC<PropsWithChildren<StepsProps>> = ({
  open,
  handleClose,
  professionalId,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [vairixProject, setVairixProject] = useState(false);
  const steps = ['Step 1', 'Step 2'];

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
      duration: '-',
      vairixProject: String(vairixProject),
      professionals: [
        {
          responsibility: parsedValues.role,
          professionalId: professionalId,
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
      <DialogTitle>Select an option:</DialogTitle>
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
              Vairix project
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleNext();
                setVairixProject(false);
              }}
              data-testid="addProject"
            >
              {'Previous Experience'}
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
                    options={allProjects}
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
                      <DateInput
                        validate={required()}
                        source={addSource<ProjectRequest>('from')}
                        sx={{ flex: 1, mr: 1 }}
                        format={(value) => {
                          if (!value) {
                            return '';
                          }
                          return formatDate(value);
                        }}
                      />
                      <DateInput
                        source={addSource<ProjectRequest>('to')}
                        sx={{ flex: 1, mr: 1 }}
                        format={(value) => {
                          if (!value) {
                            return '';
                          }
                          return formatDate(value);
                        }}
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

        <Stepper
          sx={{ paddingTop: '10px' }}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep !== steps.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <></>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StepsDialog;
