import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dbcr',
      component: HomeView,
      children: [
        {
          path: 'debtors',
          component: HomeView,
        },
        {
          path: 'creditors',
          component: HomeView,
        }
      ]
    }
  ]
});

export default router;
