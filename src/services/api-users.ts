import type { User } from '@/types/User.ts';

import myAxios, { cleanPayload } from './api-base';

export const getUsers = async (limit?: number) => {
  const config = limit !== undefined ? { params: { limit } } : undefined;

  const response = await myAxios.get<User[]>('/users', config);
  return response.data;
};

export const getUserById = async (id: string | number) => {
  const response = await myAxios.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: User) => {
  const response = await myAxios.post('/users', data);
  return response.data;
};

export const patchUser = async (id: string | number, data: Partial<User>) => {
  data = cleanPayload(data);
  const response = await myAxios.patch(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string | number) => {
  const response = await myAxios.delete(`/users/${id}`);
  return response.data;
};

export const deleteUsers = async (ids: Array<string | number>) => {
  const response = await myAxios.delete('/users', { data: { ids } });
  return response.data;
};
