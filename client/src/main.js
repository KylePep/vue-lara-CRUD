import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import App from './App.vue'
import { router } from './router'

import { checkAuthentication } from './services/AuthService'

checkAuthentication()

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router)
  .mount('#app')