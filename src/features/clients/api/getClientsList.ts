import { axios } from '@/services/axios';
import { type AxiosResponse } from 'axios';
import { Client } from '../types';

export const getClientsList = async (): Promise<Client[]> => {
  return axios.get<Client[]>('/clients').then((r: AxiosResponse<Client[]>) => {
    return r.data;
  });
};
