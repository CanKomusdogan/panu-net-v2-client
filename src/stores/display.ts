import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDisplayStore = defineStore('display', () => {
  const display = ref(null);

  return { display };
});
