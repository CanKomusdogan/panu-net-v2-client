import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types/User.ts';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);

  return { users };
});
