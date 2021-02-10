import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Draft from '../views/draft.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/draft',
    name: 'Draft',
    component: Draft,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
