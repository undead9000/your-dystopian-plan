import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useEngineStore } from '../src/store/index'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

const app = createApp(App)
app.use(createPinia()).use(router).use(i18n)
app.mount('#app')
useEngineStore().initializeGameStore()

import './styles/index.scss'