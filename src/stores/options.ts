import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOptionsStore = defineStore('options', () => {
  const options = ref(null);

  return { options };
});
