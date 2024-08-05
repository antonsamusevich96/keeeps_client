import axios from 'axios'
import { tokensManager } from '@/7-shared/webStorage/local'
import { useRouter } from 'vue-router'
import { COMMON_PATHS, PUBLIC_PATHS } from '@/7-shared/constants/paths'

const instance = axios.create({
  withCredentials: true,
  baseURL: `/api`,
})

export const logoutAndRedirect = () => {
  tokensManager.removeTokens()
  window.location.pathname = PUBLIC_PATHS.SIGN_IN
}

const retryStatusCodes = [401, 403, 406]

instance.interceptors.request.use(
  (config) => {
    const accessToken = tokensManager.getTokens().access
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const errorStatus = error.response?.status
    const refreshToken = tokensManager.getTokens().refresh

    if (!errorStatus || errorStatus.toString().startsWith(5)) {
      const router = useRouter()
      await router.push(COMMON_PATHS.INTERNAL_ERROR)
      throw error
    }

    if (401 === errorStatus && !refreshToken) {
      logoutAndRedirect()
      return
    }

    const originalRequest = error.config

    if (retryStatusCodes.includes(errorStatus) && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        if (refreshToken) {
          const response = await axios.post(
            `/api/auth/refresh`,
            {token: refreshToken},
          )
          tokensManager.setTokens(response.data.access_token, response.data.refresh_token, tokensManager.storageType)
        }
        return instance.request(originalRequest)
      } catch (e) {
        console.log(e)
        logoutAndRedirect()
      }
    }
    throw error
  },
)

export { instance }
