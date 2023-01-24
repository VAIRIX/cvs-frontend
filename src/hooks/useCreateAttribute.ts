import { useNotify, useRefresh } from 'react-admin';
import { ERROR_MESSAGES } from 'constants/index';
import API from 'api/api';
import { useState } from 'react';
import { CreateAttributeRequest } from 'types';

export const useCreateAttribute = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(false);

  const createAttribute = async (attribute: CreateAttributeRequest) => {
    setLoading(true);
    try {
      const createdAttribute = await API.createAttribute(attribute);
      refresh();
      return createdAttribute;
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

  return { createAttribute, loading };
};
