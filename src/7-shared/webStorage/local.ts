const ACCESS = 'access_token'
const REFRESH = 'refresh_token'

export const tokensManager = {
  get storageType(){
    return !!localStorage.getItem(ACCESS)
  },
  getTokens() {
    if (localStorage.getItem(ACCESS)) {
      return {
        access: localStorage.getItem(ACCESS),
        refresh: localStorage.getItem(REFRESH)
      }
    }

    return {
      access: sessionStorage.getItem(ACCESS),
      refresh: sessionStorage.getItem(ACCESS)
    }
  },

  setTokens(access: string, refresh: string, isSession?: boolean) {
    if (isSession) {
      sessionStorage.setItem(ACCESS, access)
      sessionStorage.setItem(REFRESH, refresh)
    } else {
      localStorage.setItem(ACCESS, access)
      localStorage.setItem(REFRESH, refresh)
    }
  },

  removeTokens() {
    localStorage.removeItem(ACCESS)
    localStorage.removeItem(REFRESH)
    sessionStorage.removeItem(ACCESS)
    sessionStorage.removeItem(REFRESH)
  },
}
