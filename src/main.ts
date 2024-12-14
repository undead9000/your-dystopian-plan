import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useColonyStore } from '../src/store/colonyStore'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

const app = createApp(App)
app.use(createPinia()).use(router).use(i18n)
app.mount('#app')
useColonyStore().init()

import './styles/index.scss'