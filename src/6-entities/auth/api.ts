import { instance } from '@/7-shared/configuration/instanseApi'
import type { ISignInForm, IUser } from '@/6-entities/auth/types'
import type { IAuthentication } from '@/7-shared/types/globalTypes'

export const authApi = {
  signIn: (data: ISignInForm): Promise<IAuthentication> => {
    return instance.post(`/auth/login`, data).then((data) => data.data)
  },
  signUp: (data: ISignInForm): Promise<IAuthentication> => {
    return instance.post(`/auth/registration`, data).then((data) => data.data)
  },
  getUser: (): Promise<IUser> => {
    return instance.get(`/auth/me`).then((data) => data.data)
  },
}
