<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ALL_PATH } from '@/7-shared/constants/paths'
import { useAuthStore } from '@/6-entities/auth/store'
import type { ISignInForm } from '@/6-entities/auth/types'
//@ts-ignore
import type { VForm } from 'vuetify/lib/components/VForm'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const name = ref<string>('')
    const password = ref<string>('')
    const checkbox = ref<boolean>(false)
    const valid = ref<boolean>(false)
    const form = ref<InstanceType<typeof VForm> | null>(null)

    const nameRules = [
      (v: string) => !!v || 'Имя обязательно',
      (v: string) => (v && v.length <= 10) || 'Имя должно быть меньше 10 символов',
      (v: string) => (v && v.length >= 3) || 'Имя должно быть не менее 3 символов'
    ]

    const passwordRules = [
      (v: string) => !!v || 'Пароль обязателен',
      (v: string) => (v && v.length >= 6) || 'Пароль должен быть не менее 6 символов',
      (v: string) => (v && v.length <= 20) || 'Пароль должен быть менее 20 символов'
    ]


    const validate = async () => {
      await form.value.validate()
      if (!valid.value) {
        return
      }
      const data: ISignInForm = {
        name: name.value,
        password: password.value,
        isRemember: checkbox.value
      }
      await authStore.signInAction(data)
    }

    const redirectToSingUp = async () => {
      await router.push(ALL_PATH.SIGN_UP)
    }

    return {
      name,
      password,
      checkbox,
      valid,
      nameRules,
      passwordRules,
      form,
      isLoading: authStore.isLoading,
      validate,
      redirectToSingUp
    }
  }
}
</script>

<template>
  <v-container>
    <div class="title">
      ВОЙТИ
    </div>
    <v-form v-model="valid" ref="form" @submit.prevent="validate">
      <v-text-field
        validate-on="submit"
        v-model="name"
        :rules="nameRules"
        label="Имя"
        required
      />
      <v-text-field
        validate-on="submit"
        v-model="password"
        :rules="passwordRules"
        label="Пароль"
        type="password"
      />
      <v-checkbox
        validate-on="submit"
        v-model="checkbox"
        label="Запомнить меня"
        required
      />
      <v-btn class="w-100 h-10" type="submit" :loading="isLoading">Отправить</v-btn>
      <v-btn class="w-100 h-10 mt-5 bg-amber-darken-2" type="button" @click="redirectToSingUp">Зарегистрироваться
      </v-btn>
    </v-form>
  </v-container>
</template>

<style scoped>

.v-container {
  max-width: 400px;
  margin: 0 auto;
}

.v-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 24px;
}
</style>
