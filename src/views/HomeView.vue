<script setup lang="ts">
const navigations = [
  { label: 'companies', title: 'Şirketler', icon: 'mdi-domain', href: '/management/companies' },
  { label: 'users', title: 'Kullanıcılar', icon: 'mdi-account-group', href: '/management/users' },
  { label: 'debtors', title: 'Borçlular', icon: 'mdi-bank-transfer-out', href: '/dbcr/debtors' },
  {
    label: 'creditors',
    title: 'Alacaklılar',
    icon: 'mdi-bank-transfer-in',
    href: '/dbcr/creditors',
  },
];

const isEven = (n: number) => n % 2 === 0;
</script>

<template>
  <v-row>
    <v-col cols="6" v-for="(navigation, index) in navigations" :key="navigation.label">
      <v-card
        border="md"
        :class="`navigation-card ${isEven(index) ? 'rounded-e-xl' : 'rounded-s-xl'}`"
        :append-icon="isEven(index) ? undefined : navigation.icon"
        :prepend-icon="isEven(index) ? navigation.icon : undefined"
        :to="navigation.href"
      >
        <template #title>
          <v-card-title :class="`d-flex ${isEven(index) ? 'justify-end' : 'justify-start'}`">{{
            navigation.title
          }}</v-card-title>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.navigation-card {
  transition: 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.navigation-card:hover {
  transform: scale(1.02);
}
</style>
