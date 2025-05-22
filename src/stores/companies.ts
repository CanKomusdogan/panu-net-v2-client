import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCompaniesStore = defineStore('companies', () => {
  const companies = ref(null);

  return { companies };
});
