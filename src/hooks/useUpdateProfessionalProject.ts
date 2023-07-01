import { useNotify } from 'react-admin';
import { ERROR_MESSAGES } from 'constants/index';
import API from 'api/api';
import { useCallback } from 'react';

export const useUpdateProfessionalProject = () => {
  const notify = useNotify();
  const updateProfessionalProject = useCallback(
    async (professionalProjectData: {
      professionalId: string;
      projectId: string;
      exportToDrive: boolean;
    }) => {
      const { professionalId, projectId, exportToDrive } =
        professionalProjectData;
      if (!professionalId) {
        notify(ERROR_MESSAGES.PROFESSIONAL_ID_REQUIRED);
        return;
      }
      try {
        await API.updateProfessionalProject({
          professionalId,
          projectId,
          exportToDrive,
        });
      } catch (error) {
        if (error instanceof Error) {
          notify(error.message);
        } else {
          notify(ERROR_MESSAGES.GENERIC_ERROR);
        }
      }
    },
    [],
  );

  return { updateProfessionalProject };
};
