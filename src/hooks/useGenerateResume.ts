import { useNotify, useRefresh } from 'react-admin';
import { ERROR_MESSAGES } from 'constants/index';
import API from 'api/api';
import { useCallback, useState } from 'react';

export const useGenerateResume = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(false);

  const generateResume = useCallback(async (id: string) => {
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
  }, []);

  return { generateResume, loading };
};
