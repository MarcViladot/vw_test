import { Client } from '@/features/clients';
import { axios } from '@/services/axios';
import { AxiosResponse } from 'axios';

export const deleteClient = async (id: number): Promise<Client> => {
  return await axios.delete<Client>(`/clients/${id}`).then((r: AxiosResponse<Client>) => {
    return r.data;
  });
};
