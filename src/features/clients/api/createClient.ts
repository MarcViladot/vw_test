import { Client } from '@/features/clients';
import { axios } from '@/services/axios';
import { AxiosResponse } from 'axios';

export const createClient = async (data: Partial<Client>): Promise<Client> => {
  return await axios.post<Client>(`/clients`, data).then((r: AxiosResponse<Client>) => {
    return r.data;
  });
};
