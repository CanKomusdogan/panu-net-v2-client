import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DebtorsTab from '@/components/DebtorsCreditors/DebtorsTab.vue';
import CreditorsTab from '@/components/DebtorsCreditors/CreditorsTab.vue';
import DebtorsCreditorsView from '@/views/DebtorsCreditorsView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/dbcr',
      component: DebtorsCreditorsView,
      children: [
        {
          path: 'debtors',
          component: DebtorsTab,
        },
        {
          path: 'creditors',
          component: CreditorsTab,
        },
      ],
    },
    {
      path: '/stock',
      component: HomeView,
      children: [
        {
          path: 'moving-stock',
          component: HomeView,
        },
        {
          path: 'idle-stock',
          component: HomeView,
        },
        {
          path: 'stock-profitability',
          component: HomeView,
        },
        {
          path: 'physical-stock',
          component: HomeView,
        },
      ],
    },
    {
      path: '/management',
      component: HomeView,
      children: [
        {
          path: 'users',
          component: HomeView,
        },
        {
          path: 'companies',
          component: HomeView,
        },
        {
          path: 'modules',
          component: HomeView,
        }
      ],
    },
  ],
});

export default router;
