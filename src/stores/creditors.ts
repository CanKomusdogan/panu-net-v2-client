import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { DebtorCreditor } from '@/types/DebtorCreditor.ts';

export const useCreditorsStore = defineStore('creditors', () => {
  const creditors = ref<DebtorCreditor[]>([]);

  return { creditors };
});
