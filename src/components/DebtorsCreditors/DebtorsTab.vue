<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

import GixTogglerMenu from '@/components/GixTogglerMenu.vue';
import emitter from '@/services/service-bus';
import { useAsyncGateStore } from '@/stores/async-gate';
import { useCompaniesStore } from '@/stores/companies.ts';
import { useDebtorsStore } from '@/stores/debtors.ts';
import { useDisplayStore } from '@/stores/display.ts';
import type { Company } from '@/types/company.ts';
import type { DataTableHeaders } from '@/types/data-table-headers.ts';

const asyncGate = useAsyncGateStore();

const { mobile } = storeToRefs(useDisplayStore());

const debtorsStore = useDebtorsStore();
const { debtors } = storeToRefs(debtorsStore);
const loading = ref(true);

const companiesStore = useCompaniesStore();
const { selectedCompanyId, selectedCompanyIdLoaded } = storeToRefs(companiesStore);
const selectedCompany = ref<Company | null>(null);

const loadDebtors = async () => {
  if (!selectedCompany.value) return;

  await debtorsStore.loadDebtors({
    companyCode: selectedCompany.value.code,
    periodCode: selectedCompany.value.period,
  });
};

watch(
  [selectedCompanyId, selectedCompanyIdLoaded],
  async ([, loaded]) => {
    if (!loaded) return;
    const instance = companiesStore.getSelectedCompanyInstance();

    if (!instance) {
      await asyncGate.promise;
      loading.value = false;

      emitter.emit('companyNotSelected');
      return;
    }

    selectedCompany.value = instance;
    await loadDebtors();
    loading.value = false;
  },
  { immediate: true },
);

const dataTableHeaders = ref<DataTableHeaders[]>([
  { title: 'Cari Kart Kodu', key: 'code', toggled: true, sortable: true },
  { title: 'Ünvan', key: 'name', toggled: true, sortable: true },
  { title: 'Bakiye', key: 'balance', toggled: true, sortable: true },
  { title: 'Döviz Türü', key: 'currency', toggled: true, sortable: true },
]);

const includedDataTableHeaders = computed(() =>
  dataTableHeaders.value.filter(header => header.toggled),
);
</script>

<template>
  <v-data-table
    :items="debtors"
    item-value="name"
    :loading="loading"
    class="rounded-lg elevation-0 border"
    no-data-text="Borçlular bulunamadı."
    loading-text="Borçlular yükleniyor..."
    items-per-page-text="Sayfa başı borçlular"
    :mobile="mobile.value"
    fixed-header
    :headers="includedDataTableHeaders"
  >
    <template #top>
      <v-toolbar flat rounded class="rounded-b-0">
        <v-toolbar-title>
          <v-icon color="medium-emphasis" icon="mdi-text" size="x-small" start />
          Borçlular
        </v-toolbar-title>

        <GixTogglerMenu
          menu-activator-btn-text="Filtrele"
          menu-activator-btn-class="rounded-lg border me-3"
          menu-activator-btn-icon="mdi-filter-variant"
          v-model:toggle-items="dataTableHeaders"
        />
      </v-toolbar>
    </template>
  </v-data-table>
</template>
