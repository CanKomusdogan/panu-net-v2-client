import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSnackbarStore = defineStore('snackbar', () => {
  const snackbar = ref(false);
  const snackbarText = ref('');
  const snackbarError = ref(false);

  return { snackbar, snackbarText, snackbarError };
});
