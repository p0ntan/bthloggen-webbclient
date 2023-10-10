import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)

app.mixin({
    beforeCreate() {
        this.$store = store
    }
})

app.mount('#app')
