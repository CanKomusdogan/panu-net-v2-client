<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VIconBtn } from 'vuetify/labs/components';
import { computed, ref } from 'vue';
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import MyFooter from '@/components/MyFooter.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbs = computed(() => {
  const fullPath = route.hash ? route.hash.substring(1) : route.path;

  const pathSegments = fullPath
    .split('/')
    .filter(part => part);

  return pathSegments.map((segment, index) => {
    const path = `/#/${pathSegments.slice(0, index + 1).join('/')}`;

    return {
      title: decodeURIComponent(segment),
      href: path
    };
  });
});

const rail = ref(true);
</script>

<template>
  <v-app>
    <v-layout>
      <NavigationDrawer :rail="rail" />

      <v-app-bar scroll-behavior="elevate collapse">
        <v-icon-btn class="mr-3" :icon="rail ? 'mdi-menu-close' : 'mdi-menu-open'"
                    @click="rail = !rail" />
        <v-app-bar-title>
          <span class="panu-font" style="color: var(--color-panu)">Panu</span><span
          class="panu-font font-italic">Net</span> &nbsp; <strong
          class="rounded version-text">V2</strong>
        </v-app-bar-title>

        <v-breadcrumbs :items="breadcrumbs" />
      </v-app-bar>
      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
  <MyFooter />
</template>

<style scoped>
.version-text {
  box-shadow: rgba(255, 221, 0, 0.4) -5px 5px,
  rgba(255, 221, 0, 0.3) -10px 10px,
  rgba(255, 221, 0, 0.2) -15px 15px,
  rgba(255, 221, 0, 0.1) -20px 20px,
  rgba(255, 221, 0, 0.05) -25px 25px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}

.version-text:hover {
  transform: scale(1.05);
}
</style>
