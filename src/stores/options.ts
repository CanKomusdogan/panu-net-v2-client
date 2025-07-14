import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { AppOptions } from '@/types/app-options.ts';

export const useAppOptionsStore = defineStore('appOptions', () => {
  const appOptions = ref<AppOptions>({ giveCacheFeedback: true });

  return { appOptions };
});
