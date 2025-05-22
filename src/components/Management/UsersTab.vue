<script setup lang="ts">
import { isAxiosError } from 'axios';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { VIconBtn } from 'vuetify/labs/components';

import GixCrudDialog from '@/components/GixCrudDialog.vue';
import GixSelectionInfoBar from '@/components/GixSelectionInfoBar.vue';
import GixSnackbar from '@/components/GixSnackbar.vue';
import { createUser, deleteUser, deleteUsers, patchUser } from '@/services/api-users.ts';
import { useUsersStore } from '@/stores/users.ts';
import { ActionMode } from '@/types/ActionMode.ts';
import type { InputProperties } from '@/types/InputProperties.ts';
import type { User } from '@/types/User.ts';
import { emailRules, noEmptyRule, passwordRules } from '@/types/Validations.ts';
import { formatDateTime } from '@/utils/formatting.ts';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

const selectedUser = ref<User | null>(null);
const selectedUserIds = ref<number[]>([]);

const currentMode = ref(ActionMode.Idle);
const showCrudDialog = computed(() => {
  if (currentMode.value === ActionMode.Idle) return false;

  if (currentMode.value === ActionMode.Create) return true;

  return !!(selectedUser.value || selectedUserIds.value.length > 0);
});

const userInputProperties = ref<InputProperties[]>([
  {
    label: 'Ad',
    type: 'text',
    validationRules: [noEmptyRule],
    value: '',
  },
  {
    label: 'E-posta',
    type: 'email',
    icon: 'mdi-email',
    validationRules: emailRules,
    value: '',
  },
  {
    label: 'Parola',
    type: 'password',
    showPassword: false,
    icon: 'mdi-lock',
    validationRules: passwordRules,
    value: '',
  },
]);

const dialogErrorMessage = ref('');

const snackbarText = ref('');
const snackbarError = ref(false);

const usersLoaded = ref(false);

onMounted(async () => {
  try {
    if (usersStore.users.length > 0) return;
    await usersStore.loadUsers();
  } catch (error) {
    console.error(error);
    snackbarError.value = true;
    snackbarText.value =
      'Kullanıcılar getirilirken beklenmeyen bir hata ile karşılaşıldı. Sayfayı yenileyin.';
  } finally {
    usersLoaded.value = true;
  }
});

const dialogSubmit = async (inputProperties: InputProperties[]) => {
  if (selectedUserIds.value.length > 0 && currentMode.value === ActionMode.Delete) {
    await batchDelete();
    return;
  }

  const formUser = (): Partial<User> => {
    return {
      name: inputProperties.find(input => input.type === 'text')?.value,
      email: inputProperties.find(input => input.type === 'email')?.value,
      password: inputProperties.find(input => input.type === 'password')?.value,
      role: 'user',
    };
  };

  try {
    switch (currentMode.value) {
      case ActionMode.Create:
        const user = formUser();
        if (user.name && user.email && user.password && user.role) {
          const fullUser: User = {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
          };
          await createUser(fullUser);
          usersStore.addUserToList(fullUser);
        }
        break;
      case ActionMode.Edit:
        let editedUser = formUser();

        if (!selectedUser.value?.id) return;

        await patchUser(selectedUser.value.id, editedUser);

        editedUser = {
          ...selectedUser.value,
          ...Object.fromEntries(Object.entries(editedUser).filter(([, v]) => v !== '')),
        };
        editedUser.updatedOn = 'Sonraki güncellemede yenilenecektir';
        usersStore.updateUserById(selectedUser.value.id, editedUser);
        break;
      case ActionMode.Delete:
        if (!selectedUser.value?.id) return;

        await deleteUser(selectedUser.value.id);
        usersStore.removeUsersById([selectedUser.value.id]);
        break;
      default:
        break;
    }

    snackbarError.value = false;
    snackbarText.value = 'Değişiklikler kaydedildi.';
  } catch (error) {
    console.error(error);
    snackbarError.value = true;
    snackbarText.value = 'İşlem yapılırken bir hata ile karşılaşıldı.';
  }
};

const batchDelete = async () => {
  if (selectedUserIds.value.length === 0) return;

  try {
    await deleteUsers(selectedUserIds.value);
    usersStore.removeUsersById(selectedUserIds.value);

    snackbarError.value = false;
    snackbarText.value = '';
  } catch (error) {
    console.error(error);
    snackbarError.value = true;
    snackbarText.value = `Kullanıcılar silinirken bir hata ile karşılaşıldı. ${isAxiosError(error) ? error.response?.data.message : ''}`;
  }
};

const dataTableHeaders = ref([
  { title: '', key: 'avatar', sortable: false },
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Ad', key: 'name', sortable: true },
  { title: 'E-posta', key: 'email', sortable: false },
  { title: 'Rol', key: 'role', sortable: true },
  { title: 'Telefon', key: 'phone', sortable: false },
  { title: 'Oluşturulma Tarihi', key: 'creationDate', sortable: true },
  { title: 'Düzenlenme Tarihi', key: 'updatedOn', sortable: true },
  { title: 'İşlemler', key: 'actions', sortable: false },
]);
</script>

<template>
  <v-data-table-virtual
    :items="users"
    :headers="dataTableHeaders"
    item-key="id"
    :item-height="50"
    :loading="!usersLoaded"
    loading-text="Kullanıcılar yükleniyor..."
    no-data-text="Kullanıcılar bulunamadı."
    fixed-header
    class="rounded-lg elevation-0 border"
    density="comfortable"
    show-select
    v-model="selectedUserIds"
  >
    <template #top>
      <v-toolbar flat rounded class="rounded-b-0">
        <v-toolbar-title>
          <v-icon color="medium-emphasis" icon="mdi-text-account" size="x-small" start />
          Kullanıcılar
        </v-toolbar-title>

        <v-btn
          rounded="lg"
          @click="currentMode = ActionMode.Create"
          class="me-2"
          border
          prepend-icon="mdi-account-plus"
          text="Ekle"
        />
      </v-toolbar>
    </template>
    <template #[`item.avatar`]="{ item }">
      <div class="flex items-center">
        <v-avatar color="primary" size="32">
          <span style="user-select: none">{{ item.name[0] }}</span>
        </v-avatar>
      </div>
    </template>
    <template #[`item.creationDate`]="{ item }">
      {{ item.creationDate ? formatDateTime(item.creationDate) : '' }}
    </template>
    <template #[`item.updatedOn`]="{ item }">
      {{ item.updatedOn ? formatDateTime(item.updatedOn) : 'Düzenlenmedi' }}
    </template>
    <template #[`item.actions`]="{ item }">
      <div class="d-flex">
        <v-icon-btn
          icon="mdi-pencil"
          color="secondary"
          variant="text"
          @click.stop="
            selectedUser = item;
            currentMode = ActionMode.Edit;
          "
        />
        <v-icon-btn
          icon="mdi-trash-can"
          color="error"
          variant="text"
          @click.stop="
            selectedUser = item;
            currentMode = ActionMode.Delete;
          "
        />
      </div>
    </template>
  </v-data-table-virtual>

  <GixCrudDialog
    v-model:show-dialog="showCrudDialog"
    v-model:current-mode="currentMode"
    delete-text="Silinen kullanıcılar geri alınamaz, devam etmek istediğinize emin misiniz?"
    v-model:inputs-properties="userInputProperties"
    @submit="dialogSubmit"
    :error-message="dialogErrorMessage"
  />

  <GixSnackbar v-model:text="snackbarText" v-model:error="snackbarError" />

  <GixSelectionInfoBar
    @submit="currentMode = ActionMode.Delete"
    v-model:selected-ids="selectedUserIds"
    :objects="users"
    submit-btn-icon="mdi-trash-can"
  />
</template>
