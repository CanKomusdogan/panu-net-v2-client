<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { useDebtorsStore } from '@/stores/debtors.ts';
import type { DebtorCreditor } from '@/types/DebtorCreditor.ts';

const debtorsStore = useDebtorsStore();

const { debtors } = storeToRefs(debtorsStore);

const selected = ref<DebtorCreditor | null>(null);
</script>

<template>
  <v-data-table :items="debtors" v-model="selected" show-select />
</template>
