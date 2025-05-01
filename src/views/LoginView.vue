<script setup lang="ts">

</script>

<template>
  <v-card elevation="5" max-width="500px">
    <v-card-title class="text-center">
      Giriş
    </v-card-title>
    <v-card-text>
      <v-text-field variant="underlined" prepend-inner-icon="mdi-email" label="E-posta" />
      <v-text-field variant="underlined" prepend-inner-icon="mdi-lock" label="Şifre" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text="Devam" append-icon="mdi-login" />
    </v-card-actions>
  </v-card>
</template>
