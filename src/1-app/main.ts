import { createApp } from 'vue'
import App  from './App.vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import { router } from '@/1-app/router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  }
})

const app = createApp(App)
const pinia = createPinia()
app
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app')
