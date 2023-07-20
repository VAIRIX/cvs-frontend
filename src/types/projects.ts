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
  vairixProject: boolean;
};

export type ProjectProfessionalResponse = {
  professional: Partial<ProfessionalResponse>;
  responsibility: string;
  startDate: string;
  endDate: string;
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
  role?: string;
};

export type ProjectRequest = {
  id: string;
  name: string;
  description: string;
  professionals: ProjectProfessionalResponse[];
  attributes: { attributeId: string }[];
};
