import { ProjectAttributeResponse } from './attributes';

export interface ProjectResponse {
  responsibility: string;
  project: Project;
}

export type Project = {
  id: string;
  name: string;
  from: string;
  to: string;
  duration: string;
  description: string;
  attributes: ProjectAttributeResponse[];
};
