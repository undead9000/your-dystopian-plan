import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useColonyStore } from '../src/store/colonyStore'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router)
app.mount('#app')
useColonyStore().init()

import './styles/index.scss'