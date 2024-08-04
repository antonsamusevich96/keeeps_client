import { createRouter, createWebHistory } from 'vue-router'
import AppView from './App.vue'
import AuthLayout from '@/2-layouts/authLayout.vue'
import AppLayout from '@/2-layouts/appLayout.vue'
import InitLayout from '@/2-layouts/initLayout.vue'
import { ALL_PATH } from '@/7-shared/constants/paths'
import SignInPage from '@/3-pages/auth/signIn/signInPage.vue'
import SignUpPage from '@/3-pages/auth/signUp/signUpPage.vue'

const routes = [
  {
    path: '',
    component: InitLayout,
    children: [
      {
        path: '',
        component: AppLayout,
        children: [
          {
            path: ALL_PATH.MAIN,
            component: AppView
          }
        ]
      },
      {
        path: '',
        component: AuthLayout,
        children: [
          {
            path: ALL_PATH.SIGN_IN,
            component: SignInPage
          },
          {
            path: ALL_PATH.SIGN_UP,
            component: SignUpPage
          }
        ]
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    component: AppView
  },
  {
    path: ALL_PATH.INTERNAL_ERROR,
    component: AppView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
