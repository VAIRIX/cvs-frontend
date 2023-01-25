import { ProjectAttributeResponse } from './attributes';
import { ProfessionalResponse } from './professional';

export type ProjectResponse = {
  id: string;
  name: string;
  from: string;
  to: string;
  duration: string;
  description: string;
  professionals: ProjectProfessionalResponse[];
  attributes: ProjectAttributeResponse[];
};

export type ProjectProfessionalResponse = {
  professional: ProfessionalResponse;
  responsibility: string;
};

export type ParsedProjects = {
  id: string;
  name: string;
  from: string;
  to: string;
  duration: string;
  description: string;
  professionals: ProjectProfessionalResponse[];
  attributes: ProjectAttributeResponse[];
};

export type ProjectRequest = {
  id: string;
  name: string;
  from: string;
  to: string;
  duration: string;
  description: string;
  professionals: ProjectProfessionalResponse[];
  attributes: ProjectAttributeResponse[];
};
