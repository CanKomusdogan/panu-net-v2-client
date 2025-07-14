<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { useCreditorsStore } from '@/stores/creditors.ts';
import type { AccountCard } from '@/types/account-card.ts';

const creditorsStore = useCreditorsStore();

const { creditors } = storeToRefs(creditorsStore);

const selected = ref<AccountCard | null>(null);
</script>

<template>
  <v-data-table :items="creditors" v-model="selected" show-select />
</template>
