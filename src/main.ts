import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Le catalogue est public : on le charge dès le démarrage.
store.dispatch('fetchCatalogue')

createApp(App).use(store).use(router).mount('#app')
