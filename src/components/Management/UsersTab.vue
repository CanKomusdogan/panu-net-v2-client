<script setup lang="ts">
import { useMotion } from '@vueuse/motion';
import { storeToRefs } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { computed, ref } from 'vue';
import { VIconBtn } from 'vuetify/labs/components';

import GixCrudDialog from '@/components/GixCrudDialog.vue';
import GixSelectionInfoBar from '@/components/GixSelectionInfoBar.vue';
import GixTogglerMenu from '@/components/GixTogglerMenu.vue';
import {
  createUser,
  deleteUser,
  deleteUsers,
  patchUser,
  type UserServerDataTableOptions
} from '@/services/api/users.ts';
import { useDisplayStore } from '@/stores/display.ts';
import { useAppOptionsStore } from '@/stores/options.ts';
import { useUsersStore } from '@/stores/users.ts';
import { ActionMode } from '@/types/action-mode.ts';
import type { DataTableHeaders } from '@/types/data-table-headers.ts';
import type { InputProperties } from '@/types/input-properties.ts';
import type { User } from '@/types/user.ts';
import { emailRules, noEmptyRule, passwordRules } from '@/types/validations.ts';
import { formatDateTime } from '@/utils/formatting.ts';
import type { WithRequiredProperty } from '@/types/with-required-property.ts';

const { mobile } = storeToRefs(useDisplayStore());

const appOptionsStore = useAppOptionsStore();
const { appOptions } = storeToRefs(appOptionsStore);

const usersStore = useUsersStore();
const { users, totalUsersCount } = storeToRefs(usersStore);

const selectedUser = ref<User | null>(null);
const selectedUserIds = ref<number[]>([]);

const currentMode = ref(ActionMode.Idle);
const showCrudDialog = computed(() => {
  if (currentMode.value === ActionMode.Idle) return false;

  if (currentMode.value === ActionMode.Create) return true;

  return !!(selectedUser.value || selectedUserIds.value.length > 0);
});

const userInputPropertiesIds = {
  name: uuidv4(),
  email: uuidv4(),
  password: uuidv4(),
};

const userInputProperties = ref<InputProperties[]>([
  {
    id: userInputPropertiesIds.name,
    label: 'Ad',
    type: 'text',
    validationRules: [noEmptyRule],
    value: '',
  },
  {
    id: userInputPropertiesIds.email,
    label: 'E-posta',
    type: 'email',
    icon: 'mdi-email',
    validationRules: emailRules,
    value: '',
  },
  {
    id: userInputPropertiesIds.password,
    label: 'Parola',
    type: 'password',
    showPassword: false,
    icon: 'mdi-lock',
    validationRules: passwordRules,
    value: '',
  },
]);

const dialogErrorMessage = ref('');

const usersLoaded = ref(false);

const loadUsers = async (options?: UserServerDataTableOptions, giveCacheFeedback = true) => {
  const cacheFeedbackPreference = appOptions.value.giveCacheFeedback;
  appOptions.value.giveCacheFeedback = giveCacheFeedback;
  try {
    await usersStore.loadUsers(options);
  } catch (error) {
    console.error(error);
  } finally {
    usersLoaded.value = true;

    appOptions.value.giveCacheFeedback = cacheFeedbackPreference;
  }
};

const dialogSubmit = async (inputProperties: InputProperties[]) => {
  if (selectedUserIds.value.length > 0 && currentMode.value === ActionMode.Delete) {
    await batchDelete();
    return;
  }

  const formUser = (): Partial<User> => {
    return {
      name: inputProperties[0].value,
      email: inputProperties[1].value,
      password: inputProperties[2].value,
      role: 'user',
    };
  };

  const willUpdateNextRefreshText = 'Sonraki güncellemede yenilenecektir';

  try {
    switch (currentMode.value) {
      case ActionMode.Create:
        const user = formUser();

        const isValidUser = Object.values(user).every(Boolean);
        if (isValidUser) {
          await createUser(user as WithRequiredProperty<User, 'password'>);

          const latestUserId = users.value[0].id;

          const displayUser = {
            ...(user as User),
            id: latestUserId ? latestUserId + 1 : latestUserId,
            creationDate: willUpdateNextRefreshText,
          };
          usersStore.addUserToList(displayUser, true);
        }
        break;
      case ActionMode.Edit:
        let editedUser = formUser();

        if (!selectedUser.value?.id) return;

        await patchUser(selectedUser.value.id, editedUser);

        editedUser = {
          ...selectedUser.value,
          ...Object.fromEntries(Object.entries(editedUser).filter(([, v]) => v !== '')),
          updatedOn: willUpdateNextRefreshText,
        };
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
  } catch (error) {
    console.error(error);
  }
};

const batchDelete = async () => {
  if (selectedUserIds.value.length === 0) return;

  try {
    await deleteUsers(selectedUserIds.value);
    usersStore.removeUsersById(selectedUserIds.value);
  } catch (error) {
    console.error(error);
  }
};

const dataTableHeaders = ref<DataTableHeaders[]>([
  { title: 'ID', key: 'id', sortable: true, toggled: true },
  { title: 'Ad', key: 'name', sortable: true, toggled: true },
  { title: 'E-posta', key: 'email', sortable: false, toggled: true },
  { title: 'Rol', key: 'role', sortable: true, toggled: true },
  { title: 'Telefon', key: 'phone', sortable: false, toggled: false },
  { title: 'Oluşturulma Tarihi', key: 'creationDate', sortable: true, toggled: true },
  { title: 'Düzenlenme Tarihi', key: 'updatedOn', sortable: true, toggled: true },
  { title: 'İşlemler', key: 'actions', sortable: false, toggled: true },
]);

const includedDataTableHeaders = computed(() =>
  dataTableHeaders.value.filter(header => header.toggled),
);

const refreshRotations = ref(1);

const refreshing = ref(false);
const refreshBtnTarget = ref<HTMLElement | null>(null);

const { apply } = useMotion(refreshBtnTarget, {
  initial: {
    rotate: 0,
  },
});

const toggleRefresh = async () => {
  if (refreshing.value) return;
  refreshing.value = true;
  await apply({
    rotate: 360 * refreshRotations.value,
    transition: {
      ease: 'easeOut',
    },
  });
  refreshRotations.value++;
  await loadUsers();
  refreshing.value = false;
};
</script>

<template>
  <v-data-table-server
    v-model="selectedUserIds"
    @update:options="options => loadUsers(options, false)"
    :headers="includedDataTableHeaders"
    :items-length="totalUsersCount"
    :items="users"
    :loading="!usersLoaded"
    class="rounded-lg elevation-0 border"
    fixed-header
    hover
    :mobile="mobile.value"
    loading-text="Kullanıcılar yükleniyor..."
    no-data-text="Kullanıcılar bulunamadı."
    items-per-page-text="Sayfa başı kullanıcılar"
    show-select
  >
    <template #top>
      <v-toolbar flat rounded class="rounded-b-0">
        <v-toolbar-title>
          <v-icon color="medium-emphasis" icon="mdi-text-account" size="x-small" start />
          Kullanıcılar
        </v-toolbar-title>

        <GixTogglerMenu
          menu-activator-btn-text="Filtrele"
          menu-activator-btn-class="rounded-lg border me-3"
          menu-activator-btn-icon="mdi-filter-variant"
          v-model:toggle-items="dataTableHeaders"
        />
        <v-btn
          rounded="lg"
          @click="currentMode = ActionMode.Create"
          class="me-3"
          border
          prepend-icon="mdi-account-plus"
        >
          Ekle
        </v-btn>

        <v-icon-btn
          v-motion
          ref="refreshBtnTarget"
          @click="toggleRefresh"
          variant="text"
          class="me-3"
          icon="mdi-refresh"
        />
      </v-toolbar>
    </template>
    <template #[`item.creationDate`]="{ item }">
      {{ item.creationDate ? formatDateTime(item.creationDate) : '' }}
    </template>
    <template #[`item.updatedOn`]="{ item }">
      {{ item.updatedOn ? formatDateTime(item.updatedOn) : 'Düzenlenmedi' }}
    </template>
    <template #[`item.actions`]="{ item }">
      <div class="d-flex justify-end">
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
  </v-data-table-server>

  <GixCrudDialog
    v-model:show-dialog="showCrudDialog"
    v-model:current-mode="currentMode"
    delete-text="Silinen kullanıcılar geri alınamaz, devam etmek istediğinize emin misiniz?"
    v-model:inputs-properties="userInputProperties"
    @submit="dialogSubmit"
    :error-message="dialogErrorMessage"
  />

  <GixSelectionInfoBar
    @submit="currentMode = ActionMode.Delete"
    v-model:selected-ids="selectedUserIds"
    :objects="users"
    submit-btn-icon="mdi-trash-can"
  />
</template>
