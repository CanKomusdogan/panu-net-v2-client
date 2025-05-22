<script setup lang="ts">
import { computed, ref } from 'vue';
import { VIconBtn } from 'vuetify/labs/components';

interface ObjectWithId {
  [key: string]: unknown;
}

defineEmits<{
  (e: 'submit', selectedIds: number[]): void;
  (e: 'update:selectedIds', selectedIds: number[]): void;
  (e: 'select', object: ObjectWithId): void;
}>();

const props = defineProps<{
  selectedIds: number[];
  objects: ObjectWithId[];
  idProperty?: string;
  nameProperty?: string;
  snackbarColor?: string;
  snackbarIcon?: string;
  snackbarIconColor?: string;
  submitBtnIcon: string;
}>();

const idProp = computed(() => props.idProperty ?? 'id');
const nameProp = computed(() => props.nameProperty ?? 'name');

const getProp = (obj: ObjectWithId, prop: string) => {
  return obj[prop];
};

const getKey = (obj: ObjectWithId, prop: string): PropertyKey => {
  const value = obj[prop];
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol') {
    return value;
  }
  return String(value);
};

const selectedObjects = computed(() =>
  props.objects.filter(obj => {
    const id = getProp(obj, idProp.value);
    const idNum = Number(id);
    if (isNaN(idNum) || idNum === -1) return false;
    return props.selectedIds.includes(idNum);
  }),
);

const snackbar = computed(() => selectedObjects.value.length > 0);
const loading = ref(false);
</script>

<template>
  <v-snackbar
    id="selection-info-bar"
    class="opacity-90"
    v-model="snackbar"
    ref="snackbarRef"
    rounded="lg"
    :timeout="-1"
    :color="snackbarColor ?? 'info'"
  >
    <v-icon
      :color="snackbarIconColor"
      :icon="snackbarIcon ?? 'mdi-selection-multiple'"
      class="mr-2"
    />
    <transition-group
      name="chip"
      tag="div"
      class="d-inline"
      style="position: relative; min-height: 40px"
    >
      <v-chip
        v-for="object in selectedObjects"
        :key="getKey(object, idProp)"
        class="mr-1 mb-1"
        closable
        @click="$emit('select', object)"
        @click:close="
          $emit(
            'update:selectedIds',
            selectedIds.filter(id => id !== Number(getProp(object, idProp))),
          )
        "
        :color="snackbarColor ?? 'info'"
        size="small"
        variant="elevated"
      >
        {{ getProp(object, nameProp) }}
      </v-chip>
    </transition-group>

    <template #actions>
      <v-icon-btn
        @click="
          loading = true;
          $emit('submit', selectedIds);
          loading = false;
        "
        :icon="submitBtnIcon"
        variant="text"
      />
      <v-icon-btn
        @click="$emit('update:selectedIds', [])"
        icon="mdi-close-circle-multiple"
        variant="text"
      />
    </template>
  </v-snackbar>
</template>

<style scoped>
.chip-enter-active,
.chip-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chip-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

.chip-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.chip-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.chip-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

.chip-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chip-leave-active {
  position: absolute !important;
  z-index: 1;
  background: inherit;
}
</style>
