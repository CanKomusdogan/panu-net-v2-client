<script setup lang="ts">
import { useUsersStore } from '@/stores/users.ts';
import { storeToRefs } from 'pinia';
import { VIconBtn } from 'vuetify/labs/components';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

users.value = [
  {
    id: 1,
    name: 'Super Admin Test 1',
    email: 'test1@gmail.com',
    role: 'superadmin'
  }, {
    id: 2,
    name: 'Admin Test 2',
    email: 'test2@gmail.com',
    role: 'admin'
  }, {
    id: 3,
    name: 'User Test 3',
    email: 'test3@gmail.com',
    role: 'user'
  }, {
    id: 4,
    name: 'Admin Test 4',
    email: 'test4@gmail.com',
    role: 'admin'
  }
];
</script>

<template>
  <v-toolbar rounded density="compact" class="mb-3" title="Kullanıcılar">
    <v-btn rounded="lg" class="me-2" border prepend-icon="mdi-account-plus" text="Ekle" />
  </v-toolbar>
  <v-row dense>
    <v-col
      v-for="user in users"
      :key="user.id"
      cols="12"
      sm="6"
      md="4"
    >
      <v-card class="pa-4">
        <v-card-title class="text-h6">{{ user.name }}</v-card-title>
        <v-card-subtitle class="text-body-2">{{ user.email }}</v-card-subtitle>

        <v-card-text class="text-caption text-grey">
          <strong>Rol:</strong> {{ user.role }}
        </v-card-text>

        <v-card-actions class="d-flex justify-end">
          <v-icon-btn color="primary" size="small" icon="mdi-pencil" />
          <v-icon-btn color="error" size="small" icon="mdi-trash-can" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
