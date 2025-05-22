<script setup lang="ts">
import { ref } from 'vue';

import emitter from '@/services/serviceBus.ts';

const snackbar = ref(false);
const snackbarText = ref('');

emitter.on('cacheHit', (ttl: number | null) => {
  console.log('cacheHit');
  snackbar.value = true;
  snackbarText.value =
    'Önbellekte bulunan veriler getirildi' +
    (ttl ? ', ' + ttl + ' saniye sonra yenilenecek.' : '.');
});
</script>

<template>
  <v-snackbar v-model="snackbar">
    {{ snackbarText }}
  </v-snackbar>
</template>
