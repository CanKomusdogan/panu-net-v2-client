import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { DebtorCreditor } from '@/types/DebtorCreditor.ts';

export const useDebtorsStore = defineStore('debtors', () => {
  const debtors = ref<DebtorCreditor[]>([]);

  return { debtors };
});
