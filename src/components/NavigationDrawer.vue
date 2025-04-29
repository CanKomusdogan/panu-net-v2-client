<script setup lang="ts">

import { computed, onMounted, ref } from 'vue';
import type { User } from '@/types/User.ts';
import { VIconBtn } from 'vuetify/labs/VIconBtn';
import RoleIconsInfo from '@/components/RoleIconsInfo.vue';

defineProps<{
  rail: boolean
}>();

const user = ref<User | null>(null);
const dialog = ref(false);

onMounted(() => {
  user.value = { id: '1', name: 'John Doe', email: 'johndoe@example.com', role: 'superadmin' };
});

const userIcon = computed(() => {
  if (user.value?.role === 'superadmin') {
    return 'mdi-key-chain';
  }
  if (user.value?.role === 'admin') {
    return 'mdi-key';
  }
  return 'mdi-account';
});
</script>

<template>
  <v-navigation-drawer :class="rail ? '' : 'pa-2'" location="left" :rail="rail" permanent>
    <v-list class="pa-2">
      <v-list-item
        :prepend-icon="userIcon"
        :title="user?.name"
        nav
      >
        <template #append>
          <v-icon-btn id="role-info-activator" icon="mdi-information-symbol"
                      @click="dialog = true" />
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list>
      <v-list-item rounded="xl" prepend-icon="mdi-view-dashboard" title="Panel" to="/" />
    </v-list>

    <v-list>
      <v-list-group value="DebtorCreditors">
        <template #activator="{ props }">
          <v-list-item v-bind="props" rounded="xl" prepend-icon="mdi-account-credit-card"
                       title="Cari" />
        </template>
        <v-list-item rounded="xl" prepend-icon="mdi-bank-transfer-out" title="Borçlular"
                     to="dbcr/debtors" />
        <v-list-item rounded="xl" prepend-icon="mdi-bank-transfer-in" title="Alacaklılar"
                     to="dbcr/creditors" />
      </v-list-group>

      <v-list-group value="Stock">
        <template #activator="{ props }">
          <v-list-item v-bind="props" rounded="xl" prepend-icon="mdi-cube" title="Stok" />
        </template>

        <v-list-item rounded="xl" prepend-icon="mdi-truck" title="Hareket Görenler" to="/stock/moving-stock" />
        <v-list-item rounded="xl" prepend-icon="mdi-clock" title="Hareket Görmeyenler" to="/stock/idle-stock" />
        <v-list-item rounded="xl" prepend-icon="mdi-chart-line" title="Stok Bazlı Karlılık" to="/stock/stock-profitability" />
        <v-list-item rounded="xl" prepend-icon="mdi-cube-outline" title="Fiili Stok" to="/stock/physical-stock" />
      </v-list-group>

      <v-list-group value="Management">
        <template #activator="{ props }">
          <v-list-item v-bind="props" rounded="xl" prepend-icon="mdi-card-bulleted-settings"
                       title="Yönetim" />
        </template>
        <v-list-item rounded="xl" prepend-icon="mdi-account-group"
                     title="Kullanıcılar"
                     to="management/users" />

      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <RoleIconsInfo activator="#role-info-activator" />
</template>

