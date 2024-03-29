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
};
