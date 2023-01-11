import { AxiosResponse } from 'axios';
import { http } from 'api/httpClient';

type generateResumeResponse = AxiosResponse<{ resumeUrl: string }>;

const generateResume = async (professionalId: string) => {
  const response: generateResumeResponse = await http.post('/resumes', {
    professionalId,
  });

  return response.data;
};

export default {
  generateResume,
};
