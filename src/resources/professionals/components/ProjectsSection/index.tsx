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
import { useRedirect } from 'react-admin';
import Dialog from 'components/Dialog';

type ProjectsSectionProps = {
  projects: ProfessionalProjectResponse[] | undefined;
  allProjects?: ProjectResponse[] | undefined;
  isEdit?: boolean;
  setProfessionalProjects?: Dispatch<
    SetStateAction<ProfessionalProjectResponse[]>
  >;
  professionalId?: string;
};

const ProjectsSection: FC<ProjectsSectionProps> = ({
  projects = [],
  isEdit = false,
  allProjects,
  setProfessionalProjects,
  professionalId,
}) => {
  const redirect = useRedirect();
  const [selectedProject, setSelectedProject] =
    useState<ProjectResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
    const newProfessionalProject: ProfessionalProjectResponse = {
      responsibility: '',
      project: selectedProject,
    };
    setProfessionalProjects((prev) => [...prev, newProfessionalProject]);
    setIsOpen(false);
    setSelectedProject(null);
  }, [selectedProject, setProfessionalProjects]);

  const deleteProject = (id: string) => {
    if (!setProfessionalProjects) return;
    setProfessionalProjects((prev) =>
      prev.filter((project) => project.project.id !== id),
    );
  };

  const setResponsibility = (id: string, responsibility: string) => {
    if (!setProfessionalProjects) return;
    setProfessionalProjects((prev) =>
      prev.map((project) => {
        if (project.project.id === id) {
          return {
            ...project,
            responsibility,
          };
        }
        return project;
      }),
    );
  };

  const handleAddProject = () => {
    if (isEdit) {
      setIsOpen(true);
    } else {
      redirect('edit', 'professionals', professionalId);
    }
  };

  const handleGetOptionLabel = useCallback(
    (option: ProjectResponse): string => {
      return `${option.name} - ${option.name}`;
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
      <TextField {...params} label="Search project" fullWidth />
    ),
    [],
  );

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <SectionTitle title="Projects:" sx={{ mb: '24px' }} />
        <Box>
          <Button variant="outlined" onClick={handleAddProject}>
            Add Project
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
          setResponsibility={setResponsibility}
        />
      ))}
      {availableProjects && (
        <Dialog
          closeText="Cancel"
          submitText="Add"
          dialogTitle="Add new project"
          close={handleClose}
          isOpen={isOpen}
          submit={handleSubmit}
        >
          <DialogContentText>
            Search projects by project name or company name
          </DialogContentText>
          <Autocomplete
            value={selectedProject}
            onChange={handleOnChangeAutocomplete}
            options={availableProjects}
            getOptionLabel={handleGetOptionLabel}
            renderInput={handleRenderInputAutocomplete}
          />
        </Dialog>
      )}
    </Box>
  );
};

export default ProjectsSection;
