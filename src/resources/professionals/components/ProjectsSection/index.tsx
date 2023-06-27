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
import PositionedMenu from './Menu';
import ProjectList from './ProjectList';

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

  const [sortingOption, setSortingOption] = useState('');

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
        {isEdit && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              variant="outlined"
              onClick={handleAddProject}
              data-testid="addProject"
            >
              {TEXTS.ADD_NEW_PROJECT}
            </Button>
            <PositionedMenu setSortingOption={setSortingOption} />
          </Box>
        )}
      </Box>
      <ProjectList
        projects={projects}
        isEdit={isEdit}
        sortParam={sortingOption}
        deleteProject={deleteProject}
      ></ProjectList>
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
