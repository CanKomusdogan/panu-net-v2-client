import { MotionPlugin } from '@vueuse/motion';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import vuetify from '@/plugins/vuetify';

import App from './App.vue';
import './assets/base.css';
import router from './router';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(vuetify);
app.use(MotionPlugin);

app.mount('#app');
