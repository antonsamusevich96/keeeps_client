<script lang="ts">

import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/6-entities/auth/store'
import { storeToRefs } from 'pinia'
import { PRIVATE_PATHS, PUBLIC_PATHS } from '@/7-shared/constants/paths'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const { isInit, isAuth } = storeToRefs(authStore)

    watch([isAuth, isInit], async ([isAuthValue, isInitValue]: [boolean, boolean]) => {
      if (!isInitValue) {
        return
      }
      if (isAuthValue && Object.values(PUBLIC_PATHS).includes(route.path)) {
        return await router.push(PRIVATE_PATHS.MAIN)
      }
      if (!isAuthValue && Object.values(PRIVATE_PATHS).includes(route.path)) {
        return await router.push(PUBLIC_PATHS.SIGN_IN)
      }
    }, {
      immediate: true
    })

    onMounted(async () => {
      await authStore.getUser()
    })
    return { isInit, isAuth }
  }
}
</script>

<template>
  <div >
    <router-view v-if="isInit" />
    <div class="loader" v-else>
      ... LOADING ...
    </div>
  </div>
</template>


<style scoped lang="scss">
  .loader {
    font-weight: 600;
    font-size: 32px;
    position: fixed;
    left: calc(50% - 110px);
    top: calc(50% - 24px);
  }
</style>
