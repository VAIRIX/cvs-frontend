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
  projects: ProjectResponse[];
};
