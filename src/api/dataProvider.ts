import { DataProvider, fetchUtils, Options } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { API_URL } from '../constants';

const httpClient = (
  url: string,
  options: Options = {},
): Promise<{
  status: number;
  headers: Headers;
  body: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: any;
}> => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('accessToken');
  (options.headers as Headers).set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
  ...simpleRestProvider(API_URL, httpClient),
  getList: async (resource, params) => {
    const url = `${API_URL}/${resource}`;

    return httpClient(url).then(({ json }) => {
      if ('total' in json) {
        return {
          data: json.items,
          total: json.total,
        };
      }
      if (Array.isArray(json)) {
        return {
          data: json.map((item, index) => ({
            ...item,
            id: item.id ? item.id : index,
          })),
          total: json.length,
        };
      }
      throw new Error('Invalid response');
    });
  },
};
