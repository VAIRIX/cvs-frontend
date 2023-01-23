import { ProjectAttributeResponse } from './attributes';
import { ProfessionalResponse } from './professional';

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
  professionals: ProfessionalResponse[];
  attributes: ProjectAttributeResponse[];
};
