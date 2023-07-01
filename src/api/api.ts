import { AxiosResponse } from 'axios';
import { http } from 'api/httpClient';
import { AttributeResponse, CreateAttributeRequest } from 'types';

type GenerateResumeResponse = AxiosResponse<{ resumeUrl: string }>;
type CreateAttributeResponse = AxiosResponse<AttributeResponse>;

const generateResume = async (professionalId: string) => {
  const response: GenerateResumeResponse = await http.post('/resumes', {
    professionalId,
  });

  return response.data;
};

const updateProfessionalProject = async (professionalProjectData: {
  professionalId: string;
  projectId: string;
  exportToDrive: boolean;
}) => {
  const { professionalId, projectId, exportToDrive } = professionalProjectData;
  const response: GenerateResumeResponse = await http.put(
    `/professionals/${professionalId}/project/${projectId}`,
    {
      exportToDrive,
    },
  );

  return response.data;
};

const createAttribute = async (attribute: CreateAttributeRequest) => {
  const response: CreateAttributeResponse = await http.post(
    '/attributes',
    attribute,
  );

  return response.data;
};

export default {
  generateResume,
  createAttribute,
  updateProfessionalProject,
};
