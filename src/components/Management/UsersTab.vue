<script setup lang="ts">
import { useUsersStore } from '@/stores/users.ts';
import { storeToRefs } from 'pinia';
import { VIconBtn } from 'vuetify/labs/components';
import { computed, ref } from 'vue';
import type { User } from '@/types/User.ts';

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

enum ActionMode {
  Edit, Delete, Idle
}

const selectedUser = ref<User | null>(null);
const currentMode = ref(ActionMode.Idle);
const showDialog = computed(() => !!(currentMode.value !== ActionMode.Idle && selectedUser));
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
          <v-icon-btn @click="selectedUser = user; currentMode = ActionMode.Edit" color="primary" variant="tonal" :size="35" icon="mdi-pencil" />
          <v-icon-btn @click="selectedUser = user; currentMode = ActionMode.Delete" color="error" variant="tonal" :size="35" icon="mdi-trash-can" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="showDialog" @afterLeave="selectedUser = null" max-width="400px">
    <v-card :prepend-icon="currentMode === ActionMode.Edit ? 'mdi-pencil' : 'mdi-trash-can'" :title="currentMode === ActionMode.Edit ? 'Düzenle' : 'Sil'">
      <v-card-text>
        <div v-if="currentMode === ActionMode.Edit">
          <v-text-field :label="selectedUser?.name" />
        </div>
        <div v-if="currentMode === ActionMode.Delete">
          Silinen kullanıcılar geri alınamaz, devam etmek istediğinize emin misiniz?
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="currentMode = ActionMode.Idle" text="İptal" />
        <v-btn text="Evet" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
