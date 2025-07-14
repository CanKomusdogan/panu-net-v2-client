import { defineStore } from 'pinia';
import { ref } from 'vue';

import { getUsers, type UserServerDataTableOptions } from '@/services/api/users';
import type { User } from '@/types/user.ts';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const totalUsersCount = ref(0);

  const loadUsers = async (params?: UserServerDataTableOptions) => {
    const response = await getUsers(params);

    users.value = response.users;
    totalUsersCount.value = response.total;
  };

  const addUserToList = (user: User, addToStart = false) => {
    if (addToStart) {
      users.value.unshift(user);
      return;
    }

    users.value.push(user);
  };

  const updateUserById = (id: string | number, data: Partial<User>) => {
    users.value = users.value.map(user => (user.id === id ? { ...user, ...data } : user));
  };

  const removeUsersById = (ids: Array<string | number>) => {
    const idSet = new Set(ids);

    users.value = users.value.filter(user => !idSet.has(user.id ?? -1));
  };

  return { users, totalUsersCount, loadUsers, addUserToList, updateUserById, removeUsersById };
});
