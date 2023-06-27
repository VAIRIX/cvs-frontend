import { FC, useEffect, useState } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ProfessionalProjectResponse } from 'types';
import { Box } from '@mui/material';
import Project from './Project';
import React from 'react';

type ProjectListProps = {
  projects: ProfessionalProjectResponse[] | undefined;
  sortParam: string;
  isEdit: boolean;
  deleteProject: any;
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
}) => {
  const [testProjects, setTestProjects] =
    useState<ProfessionalProjectResponse[]>(projects);

  const moveProject = (dragIndex: number, hoverIndex: number) => {
    const draggedProject = testProjects[dragIndex];
    const updatedProjects = [...testProjects];
    updatedProjects.splice(dragIndex, 1);
    updatedProjects.splice(hoverIndex, 0, draggedProject);
    setTestProjects(updatedProjects);
  };

  useEffect(() => {
    function handleSortParamChange() {
      let sortedProjects: ProfessionalProjectResponse[] = [];

      if (sortParam === 'DATE_ASCENDING') {
        sortedProjects = projects.sort((a, b) => {
          const dateA = new Date(a.project.from);
          const dateB = new Date(b.project.from);

          return dateA.getDate() - dateB.getDate();
        });
        console.log(sortedProjects);
        setTestProjects(sortedProjects);
      } else if (sortParam === 'DATE_DESCENDING') {
        sortedProjects = projects.sort((a, b) => {
          const dateA = new Date(a.project.from);
          const dateB = new Date(b.project.from);
          return dateB.getDate() - dateA.getDate();
        });
        setTestProjects(sortedProjects);
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
      item: { type: 'project', id: project.project.id, index },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'project',
      hover(item: any, monitor: DropTargetMonitor) {
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
    if (sortParam === 'MANUAL') {
      drag(drop(ref));
    }

    return (
      <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Project
          isEdit={isEdit}
          project={project.project}
          responsibility={project.responsibility}
          deleteProject={deleteProject}
          key={project.project.id}
        />
      </div>
    );
  };

  return (
    <Box>
      {testProjects.length !== 0 &&
        testProjects.map((project: ProfessionalProjectResponse, index) => (
          <ProjectItem
            project={project}
            index={index}
            // eslint-disable-next-line react/prop-types
            key={project.project.id}
          />
        ))}
    </Box>
  );
};

export default ProjectList;
