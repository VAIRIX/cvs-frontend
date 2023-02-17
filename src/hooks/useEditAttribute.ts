import { useNotify, useRefresh } from 'react-admin';
import { ERROR_MESSAGES } from 'constants/index';
import API from 'api/api';
import { useState } from 'react';

export type EditAttributeRequest = {
  id: string;
  typeId: string;
  name: string;
};

export const useEditAttribute = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(false);

  const editAttribute = async ({ id, typeId, name }: EditAttributeRequest) => {
    setLoading(true);
    try {
      const editedAttribute = await API.editAttribute({ id, typeId, name });
      refresh();
      return editedAttribute;
    } catch (error) {
      if (error instanceof Error) {
        notify(error.message);
      } else {
        notify(ERROR_MESSAGES.GENERIC_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  return { editAttribute, loading };
};
