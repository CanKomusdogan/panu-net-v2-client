<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { DebtorCreditor } from '@/types/DebtorCreditor.ts';
import { useCreditorsStore } from '@/stores/creditors.ts';

const creditorsStore = useCreditorsStore();

const { creditors } = storeToRefs(creditorsStore);

const selected = ref<DebtorCreditor | null>(null);
</script>

<template>
  <v-data-table :items="creditors" v-model="selected" show-select />
</template>
