import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { AccountCard } from '@/types/account-card.ts';

export const useCreditorsStore = defineStore('creditors', () => {
  const creditors = ref<AccountCard[]>([]);

  return { creditors };
});
