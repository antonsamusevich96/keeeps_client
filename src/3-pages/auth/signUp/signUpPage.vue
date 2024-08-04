<script lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/6-entities/auth/store'
import type { ISignInForm } from '@/6-entities/auth/types'
import { ALL_PATH } from '@/7-shared/constants/paths'
import { useRouter } from 'vue-router'

//@ts-ignore
import type { VForm } from 'vuetify/lib/components/VForm'

interface ISignInFormState {
  name: string[],
  password: string[],
  retryPassword: string[]
}
const initialErrorState = {
  name: [],
  password: [],
  retryPassword: []
}

export default {
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const name = ref<string>('')
    const password = ref<string>('')
    const retryPassword = ref<string>('')
    const valid = ref<boolean>(false)
    const form = ref<InstanceType<typeof VForm>>(null)
    const errors = ref(initialErrorState)

    watch([name, password, retryPassword], () => {
      form.value.resetValidation()
      errors.value.name = []
      errors.value.password = []
      errors.value.retryPassword = []
    })

    const nameRules = [
      (v: string) => !!v || 'Имя обязательно',
      (v: string) => (v && v.length <= 10) || 'Имя должно быть меньше 10 символов',
      (v: string) => (v && v.length >= 3) || 'Имя должно быть не менее 3 символов'
    ]

    const passwordRules = [
      (v: string) => !!v || 'Пароль обязателен',
      (v: string) => (v && v.length >= 6) || 'Пароль должен быть не менее 6 символов',
      (v: string) => (v && v.length <= 20) || 'Пароль должен быть менее 20 символов',
      (v: string) => (v === retryPassword.value) || 'Пароли должны совпадать'
    ]

    const retryPasswordRules = [
      (v: string) => !!v || 'Пароль обязателен',
      (v: string) => (v && v.length >= 6) || 'Пароль должен быть не менее 6 символов',
      (v: string) => (v && v.length <= 20) || 'Пароль должен быть менее 20 символов',
      (v: string) => (v === password.value) || 'Пароли должны совпадать'
    ]


    const submit = async () => {
      try {
        await form.value.validate()
        if (valid.value) {
          const data: ISignInForm = {
            name: name.value,
            password: password.value
          }
          await authStore.signUpAction(data)
          await router.push(ALL_PATH.MAIN)
        }
      } catch (error: any) {
        Object.entries(error.response?.data as ISignInForm).forEach((elem: [string, string]) => {
          if (`${elem[0]}` in errors.value && elem[1]) {
            //@ts-ignore
            errors.value[elem[0] as keyof ISignInFormState] = [elem[1]]
          }
        })
      }
    }

    const redirectToSingIn = async () => {
      await router.push(ALL_PATH.SIGN_IN)
    }

    return {
      name,
      password,
      retryPassword,
      valid,
      nameRules,
      passwordRules,
      retryPasswordRules,
      form,
      errors,
      isLoading: authStore.isLoading,
      submit,
      redirectToSingIn
    }
  }
}
</script>

<template>
  <v-container>
    <div class="title">
      ЗАРЕГЕСТРИРОВАТЬСЯ
    </div>
    <v-form v-model="valid" @submit.prevent="submit" ref="form">
      <v-text-field
        validate-on="submit"
        v-model="name"
        :rules="nameRules"
        label="Имя"
        required
        :error-messages="errors.name"
      />
      <v-text-field
        validate-on="submit"
        v-model="password"
        :rules="passwordRules"
        label="Пароль"
        type="password"
        :error-messages="errors.password"
      />
      <v-text-field
        validate-on="submit"
        v-model="retryPassword"
        :rules="retryPasswordRules"
        label="Повторите пароль"
        type="password"
      />

      <v-btn class="w-100 h-10" type="submit">Зарегистрироваться</v-btn>
      <v-btn class="w-100 h-10 mt-5 bg-amber-darken-2" type="button" @click="redirectToSingIn">Войти</v-btn>

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
