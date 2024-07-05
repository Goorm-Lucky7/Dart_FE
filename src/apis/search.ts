import { FilterType } from '@/types/gallery';
import instance from './instance';

export const getSearchData = async (params: Pick<FilterType, 'category' | 'keyword'>) => {
  const response = await instance.get(`/api/search`, {
    params,
  });
  return response?.data as { results: string[] };
};
