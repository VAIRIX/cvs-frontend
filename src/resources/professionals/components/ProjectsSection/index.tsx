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
import StepsDialog from './Steps';
import { SectionTitle } from 'components/ui';
import { Button, Box } from '@mui/material';
import { useGetList, useRedirect } from 'react-admin';
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

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <SectionTitle
          title={TEXTS.PROJECTS_TITLE}
          sx={{ mb: 2, mr: 2 }}
          data-testid="projectsSection"
        />
        <Box>
          <Button
            variant="outlined"
            onClick={handleAddProject}
            data-testid="addProject"
          >
            {TEXTS.ADD_NEW_PROJECT}
          </Button>
        </Box>
      </Box>
      {projects?.map((project: ProfessionalProjectResponse) => (
        <Project
          startDate={project?.startDate}
          endDate={project?.endDate}
          isEdit={isEdit}
          key={project?.project?.id}
          project={project?.project}
          responsibility={project?.responsibility}
          deleteProject={deleteProject}
        />
      ))}
      {availableProjects && (
        <StepsDialog
          professionalId={professionalId || ''}
          open={isOpen}
          handleClose={handleClose}
        ></StepsDialog>
      )}
    </Box>
  );
};

export default ProjectsSection;
