<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VIconBtn } from 'vuetify/labs/components';

import GixCacheFeedback from '@/components/GixCacheFeedback.vue';
import GixFooter from '@/components/GixFooter.vue';
import NavigationDrawer from '@/components/NavigationDrawer.vue';

const router = useRouter();

const rail = ref(true);
</script>

<template>
  <v-app>
    <v-layout>
      <NavigationDrawer :rail="rail" @update:rail="rail = false" />

      <v-app-bar>
        <v-icon-btn
          class="mr-3"
          :icon="rail ? 'mdi-menu-close' : 'mdi-menu-open'"
          @click="rail = !rail"
          aria-label="Rol ikon bilgi menüsünü aç"
        />
        <v-app-bar-title @click="router.push('/')" class="cursor-pointer">
          <span class="panu-font">Panu</span
          ><span class="panu-font font-italic" style="color: var(--color-panu)">Net</span>
          <strong class="pa-2 rounded-pill version-text">V2</strong>
        </v-app-bar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <GixCacheFeedback />
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
  <GixFooter />
</template>

<style scoped>
.version-text {
  box-shadow:
    rgba(56, 180, 74, 0.4) 5px 0,
    rgba(56, 180, 74, 0.3) 10px 0,
    rgba(56, 180, 74, 0.2) 15px 0,
    rgba(56, 180, 74, 0.1) 20px 0,
    rgba(56, 180, 74, 0.05) 25px 0;
}
</style>
