import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getUsers } from '@/services/api-users';
import type { User } from '@/types/User.ts';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);

  const loadUsers = async (limit?: number) => (users.value = await getUsers(limit));

  const addUserToList = (user: User) => users.value.push(user);

  const updateUserById = (id: string | number, data: Partial<User>) =>
    (users.value = users.value.map(user => (user.id === id ? { ...user, ...data } : user)));

  const removeUsersById = (ids: Array<string | number>) => {
    const idSet = new Set(ids);

    users.value = users.value.filter(user => !idSet.has(user.id ?? -1));
  };

  return { users, loadUsers, addUserToList, updateUserById, removeUsersById };
});
