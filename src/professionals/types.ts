export interface ProfessionalProps {
  projects: ProfessionalProjectsProps[];
}

export interface ProfessionalProjectsProps {
  responsibility: string;
  project: ProjectProps;
}

export interface ProjectProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  from: string;
  to: string;
  duration: string;
  description: string;
}
