import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify from 'vue3-toastify';
import './index.css';

const app = createApp(App);

app.use(router);
app.use(Vue3Toastify, {
  autoClose: 2500,
  position: "top-right"
});

app.mount('#app');
