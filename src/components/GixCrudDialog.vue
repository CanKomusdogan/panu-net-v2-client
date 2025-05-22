<script setup lang="ts">
import { computed, ref } from 'vue';

import { useValidationError } from '@/composables/useValidationError.ts';
import { ActionMode } from '@/types/ActionMode.ts';
import type { InputProperties } from '@/types/InputProperties.ts';

const emit = defineEmits<{
  (e: 'afterLeave'): void;
  (e: 'update:showDialog', value: boolean): void;
  (e: 'update:currentMode', value: ActionMode): void;
  (e: 'update:inputsProperties', value: InputProperties[]): void;
  (e: 'update:errorMessage', value: string): void;
  (e: 'submit', value: InputProperties[]): void;
}>();

const props = defineProps<{
  showDialog: boolean;
  currentMode: ActionMode;
  deleteText?: string;
  inputsProperties: InputProperties[];
  errorMessage: string;
}>();

const internalShowDialog = computed({
  get: () => props.showDialog,
  set: (val: boolean) => emit('update:showDialog', val),
});
const internalCurrentMode = computed({
  get: () => props.currentMode,
  set: (val: ActionMode) => emit('update:currentMode', val),
});

const errorMessage = ref(props.errorMessage);

const isSubmitting = ref(false);
const formSubmitted = ref(false);

const updateInputsPropertiesValue = (event: Event, label: string) => {
  const value = (event.target as HTMLInputElement).value;
  const newInputsProperties = props.inputsProperties.map(input =>
    input.label === label ? { ...input, value } : input,
  );

  emit('update:inputsProperties', newInputsProperties);
};
const updateInputsPropertiesShowPassword = (value: boolean, label: string) => {
  const newInputsProperties = props.inputsProperties.map(input =>
    input.label === label ? { ...input, showPassword: value } : input,
  );

  emit('update:inputsProperties', newInputsProperties);
};

const formValid = computed(() =>
  props.inputsProperties.every(
    input =>
      !input.validationRules ||
      input.validationRules.every(rule => rule(input.value || '') === true),
  ),
);

const handleSubmit = async () => {
  formSubmitted.value = true;

  if (internalCurrentMode.value === ActionMode.Create && !formValid.value) return;

  isSubmitting.value = true;
  emit('submit', props.inputsProperties);

  internalCurrentMode.value = ActionMode.Idle;
  isSubmitting.value = false;
};

const resetForm = () => {
  formSubmitted.value = false;

  const newInputsProperties = props.inputsProperties.map(inputProps => ({
    ...inputProps,
    value: '',
    showPassword: inputProps.type === 'password' ? false : inputProps.showPassword,
  }));

  emit('update:inputsProperties', newInputsProperties);
};

const isForm = computed(() =>
  [ActionMode.Create, ActionMode.Edit].includes(internalCurrentMode.value),
);

const cardIcon = computed(() => {
  switch (internalCurrentMode.value) {
    case ActionMode.Create:
      return 'mdi-plus';
    case ActionMode.Edit:
      return 'mdi-pencil';
    case ActionMode.Delete:
      return 'mdi-trash-can';
    default:
      return undefined;
  }
});
const cardTitle = computed(() => {
  switch (internalCurrentMode.value) {
    case ActionMode.Create:
      return 'Oluştur';
    case ActionMode.Edit:
      return 'Düzenle';
    case ActionMode.Delete:
      return 'Sil';
    case ActionMode.Idle:
      return '👋';
    default:
      return internalCurrentMode.value;
  }
});
</script>

<template>
  <v-dialog
    v-model="internalShowDialog"
    @afterLeave="
      resetForm();
      $emit('afterLeave');
    "
    max-width="400px"
    aria-labelledby="crud-dialog-title"
  >
    <v-card rounded="lg">
      <v-card-title id="crud-dialog-title">
        <v-icon size="small" :icon="cardIcon" />
        {{ cardTitle }}
      </v-card-title>
      <v-form class="pa-2" @submit.prevent="handleSubmit">
        <v-card-text>
          <v-alert v-if="errorMessage" type="error" class="mb-4" closable>
            {{ errorMessage }}
          </v-alert>
          <div v-if="isForm">
            <v-text-field
              v-for="inputProperties in inputsProperties"
              :key="inputProperties.label"
              :label="inputProperties.label"
              :type="
                inputProperties.type === 'password'
                  ? inputProperties.showPassword
                    ? 'text'
                    : 'password'
                  : inputProperties.type
              "
              :value="inputProperties.value"
              :prepend-inner-icon="inputProperties.icon"
              :append-icon="
                inputProperties.type === 'password'
                  ? !inputProperties.showPassword
                    ? 'mdi-eye'
                    : 'mdi-eye-off'
                  : undefined
              "
              @click:append="
                () =>
                  updateInputsPropertiesShowPassword(
                    !(inputProperties.showPassword ?? false),
                    inputProperties.label,
                  )
              "
              :hint="inputProperties.hint"
              :counter="inputProperties.counter"
              :rules="
                currentMode === ActionMode.Create ? inputProperties.validationRules || [] : []
              "
              :error-messages="
                inputProperties.validationRules && currentMode === ActionMode.Create
                  ? useValidationError(
                      inputProperties.value ?? '',
                      !formSubmitted
                        ? true
                        : inputProperties.validationRules?.every(
                            rule => rule(inputProperties.value ?? '') === true,
                          ),
                      inputProperties.validationRules,
                    )
                  : []
              "
              :class="inputProperties.validationRules ? 'mb-3' : ''"
              variant="outlined"
              rounded="lg"
              @input="(e: Event) => updateInputsPropertiesValue(e, inputProperties.label)"
            />
          </div>
          <div v-else-if="internalCurrentMode === ActionMode.Delete">
            <span v-if="deleteText">{{ deleteText }}</span>
            <span v-else> Silinenler geri alınamaz, devam etmek istediğinize emin misiniz? </span>
          </div>
          <div v-else>🧑‍💻</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn @click="internalCurrentMode = ActionMode.Idle" text="İptal" rounded="lg" />
          <v-btn
            type="submit"
            :loading="isSubmitting"
            :disabled="internalCurrentMode === ActionMode.Create && !formValid"
            :text="isForm ? 'Kaydet' : 'Evet'"
            :color="isForm ? 'primary' : 'error'"
            rounded="lg"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style>
/* so that hints and error messages are not selectable */
.v-messages {
  user-select: none !important;
}
</style>
