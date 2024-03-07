import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import "@mdi/font/css/materialdesignicons.css";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const pinia = createPinia()

const vuetify = createVuetify({
    theme: {
      defaultTheme: 'dark'
    },
    components,
    directives
})

createApp(App).use(pinia).use(vuetify).use(router).mount('#app')
