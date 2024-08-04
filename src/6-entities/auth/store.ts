import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { ISignInForm, IUser } from '@/6-entities/auth/types'
import { authApi } from '@/6-entities/auth/api'
import { tokensManager } from '@/7-shared/webStorage/local'


export const useAuthStore = defineStore('auth', () => {
  const isInit:Ref<boolean> = ref(false)
  const isAuth:Ref<boolean> = ref(false);
  const isLoading:Ref<boolean> = ref(false);
  const user = ref<IUser | undefined>();

  const getUser = async () => {
    try {
      if (!tokensManager.getTokens().access) {
        throw new Error()
      }
      isLoading.value = true
      const res = await authApi.getUser()
      isAuth.value = true
      user.value = res
    } catch (error) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  const signUpAction = async (data: ISignInForm)  => {
    try {
      isLoading.value = true
      const res = await authApi.signUp(data)
      tokensManager.setTokens(res.access, res.refresh)
      await getUser()
    } catch (error) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  const signInAction = async (data: ISignInForm) => {
    try {
      isLoading.value = true
      const res = await authApi.signIn(data)
      tokensManager.setTokens(res.access, res.refresh)
      await getUser()
    } catch (error: any) {
      return error
    } finally {
      isLoading.value = false
    }
  }

  return { isAuth, user, isLoading, isInit, getUser, signUpAction, signInAction }
})
