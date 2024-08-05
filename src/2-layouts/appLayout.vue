<script lang="ts">
import { computed, defineComponent, onMounted, ref, warn, watch } from 'vue'
import { PRIVATE_PATHS } from '@/7-shared/constants/paths'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/6-entities/auth/store'
import { logoutAndRedirect } from '@/7-shared/configuration/instanseApi'

interface ISelectedValue {
  id: unknown;
  value: boolean;
  path: unknown[];
}

export default defineComponent({
  setup() {
    const {} =useAuthStore()
    const router = useRouter()
    const drawer = ref<boolean>(false)
    const currentRoute = computed(() => router.currentRoute.value.path)
    const items = [
      {value: PRIVATE_PATHS.MAIN, title: 'Мои заметки'},
      {value: PRIVATE_PATHS.CATEGORIES, title: 'Категории'},
      {value: PRIVATE_PATHS.SETTINGS, title: 'Настройки'},
      {value: PRIVATE_PATHS.ARCHIVE, title: 'Архив'},
    ]
    const onClick = (value: ISelectedValue) => {
      router.push(value.id as string)
    }
    const onClickLogout = () => {
      logoutAndRedirect()
    }
    return {
      drawer,
      items,
      onClick,
      currentRoute,
      onClickLogout
    }
  }
})
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
        <v-toolbar-title>Мои заметки</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
        class="navbar"
      >
        <v-list
          :selectable="true"
          :selected="[currentRoute]"
          @click:select="onClick"
          :items="items"
        />
        <v-btn @click="onClickLogout">
          Выход
        </v-btn>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<style module lang="scss">
  .navbar {
    height: 100%!important;
    display: flex!important;;
    flex-direction: column!important;;
    justify-content: space-between!important;;
  }
</style>
