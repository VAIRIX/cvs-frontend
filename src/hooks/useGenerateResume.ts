import { useNotify, useRefresh } from 'react-admin';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import API from '../api/api';
import { useCallback, useState } from 'react';

export const useGenerateResume = (id: string | undefined) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(false);

  const generateResume = useCallback(async () => {
    if (!id) {
      notify(ERROR_MESSAGES.PROFESSIONAL_ID_REQUIRED);
      return;
    }
    setLoading(true);
    try {
      const data = await API.generateResume(id);
      notify(data.resumeUrl);
      refresh();
    } catch (error) {
      if (error instanceof Error) {
        notify(error.message);
      } else {
        notify(ERROR_MESSAGES.GENERIC_ERROR);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { generateResume, loading };
};
