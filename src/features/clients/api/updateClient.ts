import { Client } from '@/features/clients';
import { axios } from '@/services/axios';
import { AxiosResponse } from 'axios';

export const updateClient = async (id: number, data: Client): Promise<Client> => {
  return await axios.put<Client>(`/clients/${id}`, data).then((r: AxiosResponse<Client>) => {
    return r.data;
  });
};
