<script setup lang="ts">
import { VIconBtn } from 'vuetify/labs/components';

defineEmits<{
  (e: 'update:text', value: string): void;
  (e: 'update:error', value: boolean): void;
}>();

defineProps<{
  text: string;
  error: boolean;
}>();
</script>

<template>
  <v-snackbar :model-value="!!text" timer>
    <v-icon v-if="error" icon="mdi-alert-circle-outline mr-1" color="red" />
    {{ text }}
    <template v-slot:actions>
      <v-icon-btn
        icon="mdi-close"
        variant="plain"
        @click="
          $emit('update:text', '');
          $emit('update:error', false);
        "
        aria-label="Uyarıyı kapat"
      />
    </template>
  </v-snackbar>
</template>
