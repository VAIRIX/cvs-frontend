import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ProfessionalProjectResponse, ProjectResponse } from 'types';
import Project from './Project';
import { SectionTitle } from 'components/ui';
import {
  Autocomplete,
  Button,
  TextField,
  DialogContentText,
  AutocompleteRenderInputParams,
  Box,
} from '@mui/material';
import { useGetList, useRedirect } from 'react-admin';
import Dialog from 'components/Dialog';
import { ACTIONS, RESOURCES } from 'api/resources';
import { TEXTS } from 'constants/index';

type ProjectsSectionProps = {
  projects: ProfessionalProjectResponse[] | undefined;
  isEdit?: boolean;
  setProfessionalProjects?: Dispatch<
    SetStateAction<ProfessionalProjectResponse[]>
  >;
  professionalId?: string;
};

const ProjectsSection: FC<ProjectsSectionProps> = ({
  projects = [],
  isEdit = false,
  setProfessionalProjects,
  professionalId,
}) => {
  const redirect = useRedirect();
  const [selectedProject, setSelectedProject] =
    useState<ProjectResponse | null>(null);
  const [professionalRole, setProfessionalRole] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data: allProjects } = useGetList<ProjectResponse>(RESOURCES.PROJECTS);

  const availableProjects = useMemo(
    () =>
      allProjects?.filter(
        (project) => !projects?.find((p) => p.project.id === project.id),
      ),
    [allProjects, projects],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (!setProfessionalProjects) return;
    if (!selectedProject) return;
    if (!professionalRole) return;
    const newProfessionalProject: ProfessionalProjectResponse = {
      responsibility: professionalRole,
      project: selectedProject,
    };
    setProfessionalProjects((prev) => [...prev, newProfessionalProject]);
    setIsOpen(false);
    setSelectedProject(null);
  }, [selectedProject, setProfessionalProjects, professionalRole]);

  const deleteProject = (id: string) => {
    if (!setProfessionalProjects) return;
    setProfessionalProjects((prev) =>
      prev.filter((project) => project.project.id !== id),
    );
  };

  const handleAddProject = () => {
    if (isEdit) {
      setIsOpen(true);
    } else {
      redirect(ACTIONS.EDIT, RESOURCES.PROFESSIONALS, professionalId);
    }
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

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <SectionTitle title={TEXTS.PROJECTS_TITLE} sx={{ mb: 2, mr: 2 }} />
        <Box>
          <Button variant="outlined" onClick={handleAddProject}>
            {TEXTS.ADD_NEW_PROJECT}
          </Button>
        </Box>
      </Box>
      {projects?.map((project: ProfessionalProjectResponse) => (
        <Project
          isEdit={isEdit}
          key={project?.project?.id}
          project={project?.project}
          responsibility={project?.responsibility}
          deleteProject={deleteProject}
        />
      ))}
      {availableProjects && (
        <Dialog
          closeText={TEXTS.CANCEL}
          submitText={TEXTS.ADD}
          dialogTitle={TEXTS.ADD_NEW_PROJECT}
          close={handleClose}
          isOpen={isOpen}
          submit={handleSubmit}
        >
          <DialogContentText>{TEXTS.SEARCH_PROJECT_DIALOG}</DialogContentText>
          <Autocomplete
            value={selectedProject}
            onChange={handleOnChangeAutocomplete}
            options={availableProjects}
            getOptionLabel={handleGetOptionLabel}
            renderInput={handleRenderInputAutocomplete}
          />
          <TextField
            label={TEXTS.ROLE_LABEL}
            onChange={handleRoleChange}
            sx={{ flex: 1, mr: 1 }}
          />
        </Dialog>
      )}
    </Box>
  );
};

export default ProjectsSection;
