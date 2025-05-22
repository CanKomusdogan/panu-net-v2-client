<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import RoleIconsInfo from '@/components/RoleIconsInfo.vue';
import type { User } from '@/types/User.ts';

defineProps<{
  rail: boolean;
}>();

defineEmits<{
  (e: 'update:rail'): void;
}>();

const user = ref<User | null>(null);
const dialog = ref(false);

onMounted(() => {
  user.value = { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'superadmin' };
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
  <v-navigation-drawer
    :class="'position-fixed ' + (rail ? '' : 'pa-2')"
    location="left"
    :rail="rail"
    permanent
  >
    <v-list class="pa-2">
      <v-list-item :prepend-icon="userIcon" :title="user?.name" nav>
        <template #append>
          <v-btn
            style="opacity: 60%"
            variant="text"
            id="role-info-activator"
            size="small"
            icon="mdi-information-outline"
            aria-label="Rol ikonları bilgi menüsünü aç"
            @click="dialog = true"
          />
          <v-btn variant="text" size="small" icon="mdi-logout" aria-label="Çıkış Yap" />
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list>
      <v-list-item rounded="xl" prepend-icon="mdi-view-dashboard" title="Panel" to="/" />
    </v-list>

    <v-list @click:open="$emit('update:rail')">
      <v-list-group value="DebtorCreditors">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            rounded="xl"
            prepend-icon="mdi-account-credit-card"
            title="Cari"
          />
        </template>
        <v-list-item
          rounded="xl"
          prepend-icon="mdi-bank-transfer-out"
          title="Borçlular"
          to="/dbcr/debtors"
        />
        <v-list-item
          rounded="xl"
          prepend-icon="mdi-bank-transfer-in"
          title="Alacaklılar"
          to="/dbcr/creditors"
        />
        <v-list-item
          rounded="xl"
          prepend-icon="mdi-chart-pie"
          title="B/A Grafik"
          to="/dbcr/analytics"
        />
      </v-list-group>

      <v-list-group value="Stock">
        <template #activator="{ props }">
          <v-list-item v-bind="props" rounded="xl" prepend-icon="mdi-cube" title="Stok" />
        </template>

        <v-list-item rounded="xl" prepend-icon="mdi-truck" to="/stock/moving-stock">
          <v-list-item-title
            >Hareket <br />
            Görenler
          </v-list-item-title>
        </v-list-item>
        <v-list-item rounded="xl" prepend-icon="mdi-clock" to="/stock/idle-stock">
          <v-list-item-title
            >Hareket <br />
            Görmeyenler
          </v-list-item-title>
        </v-list-item>
        <v-list-item rounded="xl" prepend-icon="mdi-chart-line" to="/stock/stock-profitability">
          <v-list-item-title
            >Stok Bazlı <br />
            Karlılık
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          rounded="xl"
          prepend-icon="mdi-cube-outline"
          title="Fiili Stok"
          to="/stock/physical-stock"
        />
      </v-list-group>
      <v-list-group value="Orders">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            rounded="xl"
            prepend-icon="mdi-clipboard"
            title="Siparişler"
          />
        </template>

        <v-list-item rounded="xl" prepend-icon="mdi-email-arrow-left" to="/orders/received-orders">
          <v-list-item-title>
            Alınan
            <br />
            Siparişler
          </v-list-item-title>
        </v-list-item>
        <v-list-item rounded="xl" prepend-icon="mdi-dolly" to="/orders/received-orders">
          <v-list-item-title>
            Sevk
            <br />
            Edilenler
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group value="Management">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            rounded="xl"
            prepend-icon="mdi-card-bulleted-settings"
            title="Yönetim"
          />
        </template>
        <v-list-item
          rounded="xl"
          prepend-icon="mdi-domain"
          title="Firmalar"
          to="/management/companies"
        />
        <v-list-item
          rounded="xl"
          prepend-icon="mdi-account-group"
          title="Kullanıcılar"
          to="/management/users"
        />
        <v-list-item
          rounded="xl"
          prepend-icon="mdi-view-module"
          title="Modüller"
          to="/management/modules"
        />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <RoleIconsInfo activator="#role-info-activator" />
</template>
