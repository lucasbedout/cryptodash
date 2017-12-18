import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'basscss/css/basscss.css';

Vue.use(BootstrapVue);

Vue.use(Router);

window.axios = axios.create({
  baseURL: process.env.API_URL,
  timeout: 2000,
});


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});
