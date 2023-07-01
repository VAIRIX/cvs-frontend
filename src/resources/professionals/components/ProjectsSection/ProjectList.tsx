import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ProfessionalProjectResponse } from 'types';
import { Box } from '@mui/material';
import Project from './Project';
import React from 'react';
import { SORTING_OPTIONS } from 'constants/sortingOptions';
import { useUpdateProfessionalProject } from 'hooks/useUpdateProfessionalProject';

type ProjectListProps = {
  projects: ProfessionalProjectResponse[] | undefined;
  sortParam: string;
  isEdit: boolean;
  deleteProject: any;
  setProfessionalProjects?: Dispatch<
    SetStateAction<ProfessionalProjectResponse[]>
  >;
  professionalId?: string | undefined;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

const ProjectList: FC<ProjectListProps> = ({
  projects = [],
  sortParam,
  isEdit,
  deleteProject,
  setProfessionalProjects,
  professionalId,
}) => {
  const [projectsInList, setProjectsInList] =
    useState<ProfessionalProjectResponse[]>(projects);

  const { updateProfessionalProject } = useUpdateProfessionalProject();

  const moveProject = (dragIndex: number, hoverIndex: number) => {
    const draggedProject = projectsInList[dragIndex];
    draggedProject.index = dragIndex;
    const updatedProjects = [...projectsInList];
    updatedProjects.splice(dragIndex, 1);
    updatedProjects.splice(hoverIndex, 0, draggedProject);
    setProjectsInList(updatedProjects);
    if (setProfessionalProjects) {
      setProfessionalProjects(updatedProjects);
    }
  };

  const updateProject = (id: string, exportToDrive: boolean) => {
    if (!professionalId) return;
    updateProfessionalProject({
      projectId: id,
      professionalId: professionalId,
      exportToDrive,
    });
  };

  useEffect(() => {
    setProjectsInList(projects);
  }, []);

  useEffect(() => {
    function handleSortParamChange() {
      let sortedProjects: ProfessionalProjectResponse[] = [];
      if (sortParam === SORTING_OPTIONS.DATE_ASCENDING) {
        sortedProjects = [...projects].sort((a, b) => {
          const dateA = new Date(a.project.from);
          const dateB = new Date(b.project.from);

          return dateA.getDate() - dateB.getDate();
        });
        setProjectsInList(sortedProjects);
        if (setProfessionalProjects) {
          setProfessionalProjects(sortedProjects);
        }
      } else if (sortParam === SORTING_OPTIONS.DATE_DESCENDING) {
        sortedProjects = [...projects].sort((a, b) => {
          const dateA = new Date(a.project.from);
          const dateB = new Date(b.project.from);
          return dateB.getDate() - dateA.getDate();
        });
        setProjectsInList(sortedProjects);
        if (setProfessionalProjects) {
          setProfessionalProjects(sortedProjects);
        }
      } else {
        setProjectsInList([...projects]);
      }
    }

    handleSortParamChange();
  }, [sortParam]);

  const ProjectItem: FC<{
    project: ProfessionalProjectResponse;
    index: number;
  }> = ({ project, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'project',
      item: {
        type: 'project',
        id: project.project.id,
        index,
        project: project.project,
      },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'project',
      hover(item: DragItem) {
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        moveProject(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const ref = React.useRef<HTMLDivElement>(null);
    if (sortParam === SORTING_OPTIONS.MANUAL) {
      drag(drop(ref));
    }

    return (
      <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Project
          exportToDrive={project.exportToDrive}
          isEdit={isEdit}
          project={project.project}
          responsibility={project.responsibility}
          deleteProject={deleteProject}
          key={project.project.id}
          setProjectExport={updateProject}
        />
      </div>
    );
  };

  return (
    <Box>
      {projectsInList.length !== 0 &&
        projectsInList.map((project: ProfessionalProjectResponse, index) => (
          <ProjectItem
            project={project}
            index={index}
            key={project.project.id}
          />
        ))}
    </Box>
  );
};

export default ProjectList;
