<script setup lang="ts">
import { computed } from 'vue';
import { VIconBtn } from 'vuetify/labs/components';

const emit = defineEmits<{
  (e: 'update:snackbar', value: boolean): void;
  (e: 'update:text', value: string): void;
  (e: 'update:error', value: boolean): void;
}>();

const props = defineProps<{
  snackbar: boolean;
  text: string;
  error: boolean;
}>();

const internalSnackbar = computed({
  get: () => props.snackbar,
  set: newValue => emit('update:snackbar', newValue),
});
</script>

<template>
  <v-snackbar v-model="internalSnackbar" timer>
    <v-icon v-if="error" icon="mdi-alert-circle-outline mr-1" color="red" />
    {{ text }}
    <template #actions>
      <v-icon-btn
        icon="mdi-close"
        variant="plain"
        @click="
          $emit('update:snackbar', false);
          $emit('update:text', '');
          $emit('update:error', false);
        "
        aria-label="Uyarıyı kapat"
      />
    </template>
  </v-snackbar>
</template>
