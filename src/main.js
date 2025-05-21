// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import router from '../router'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App)
app.use('axios', axios)
app.use(router)
app.mount('#app')
