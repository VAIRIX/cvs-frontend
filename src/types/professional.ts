import { ProfessionalAttributeResponse } from './attributes';
import { ProjectResponse } from './projects';

export type ProfessionalResponse = {
  id: string;
  firstName: string;
  lastName: string;
  english: number;
  about: string;
  email: string;
  resumeUrl: string;
  headline: string;
  allocated: boolean;
  attributes: ProfessionalAttributeResponse[];
  projects: ProfessionalProjectResponse[];
};

export type ParsedProfessional = {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  allocated: boolean;
  about: string;
  english: number;
  email: string;
  technologies: [];
  skills: [];
};

export type ProfessionalRequest = {
  firstName: string;
  lastName: string;
  english: number;
  about: string;
  email: string;
  headline: string;
  allocated: boolean;
  projects: { responsibility: string; projectId: string }[];
  attributes: { level: number; attributeId: string }[];
};

export interface ProfessionalProjectResponse {
  responsibility: string;
  startDate: string;
  endDate: string;
  project: ProjectResponse;
}
