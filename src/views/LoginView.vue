<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const formSubmitted = ref(false)

const emailRules = [
  (v: string) => !!v || 'E-posta gereklidir',
  (v: string) => /\S+@\S+\.\S+/.test(v) || 'Geçerli bir e-posta adresi giriniz'
]

const passwordRules = [
  (v: string) => !!v || 'Şifre gereklidir',
  (v: string) => v.length >= 8 || 'Şifre en az 8 karakter olmalıdır'
]

const isEmailValid = computed(() => {
  if (!formSubmitted.value && !email.value) return true
  return emailRules.every(rule => rule(email.value) === true)
})

const isPasswordValid = computed(() => {
  if (!formSubmitted.value && !password.value) return true
  return passwordRules.every(rule => rule(password.value) === true)
})

const isFormValid = computed(() => {
  return isEmailValid.value && isPasswordValid.value
})

const router = useRouter()

const login = async () => {
  formSubmitted.value = true

  if (!isFormValid.value) {
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    // api call to be added
    await new Promise(resolve => setTimeout(resolve, 1000))


    console.log('Login successful', { email: email.value })

    await router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    errorMessage.value = 'Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="d-flex justify-center align-center" style="min-height: 80vh">
    <v-card elevation="5" style="width: 450px" :loading="loading">
      <v-card-title class="text-center pa-4">
        <h2>Giriş</h2>
      </v-card-title>

      <v-card-text>
        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          closable
          class="mb-4"
          @click:close="errorMessage = ''"
        >
          {{ errorMessage }}
        </v-alert>

        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            label="E-posta"
            class="mb-3"
            :rules="emailRules"
            :error-messages="!isEmailValid && email ? [emailRules.find(rule => rule(email) !== true) || ''].filter(msg => typeof msg === 'string') : []"
            autocomplete="email"
            required
          />

          <v-text-field
            v-model="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            label="Şifre"
            :rules="passwordRules"
            :error-messages="!isPasswordValid && password ? [passwordRules.find(rule => rule(password) !== true) || ''].filter(msg => typeof msg === 'string') : []"
            autocomplete="current-password"
            @click:append-inner="showPassword = !showPassword"
            required
          />

          <div class="d-flex justify-end mt-4">
            <v-btn
              variant="flat"
              size="large"
              type="submit"
              :loading="loading"
              :disabled="!isFormValid && formSubmitted"
              append-icon="mdi-login"
            >
              Giriş Yap
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
