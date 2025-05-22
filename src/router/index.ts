import { createRouter, createWebHashHistory } from 'vue-router';

import AnalyticsTab from '@/components/DebtorsCreditors/AnalyticsTab.vue';
import CreditorsTab from '@/components/DebtorsCreditors/CreditorsTab.vue';
import DebtorsTab from '@/components/DebtorsCreditors/DebtorsTab.vue';
import CompaniesTab from '@/components/Management/CompaniesTab.vue';
import UsersTab from '@/components/Management/UsersTab.vue';
import DebtorsCreditorsView from '@/views/DebtorsCreditorsView.vue';
import LoginView from '@/views/LoginView.vue';
import ManagementView from '@/views/ManagementView.vue';

import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/login',
      component: LoginView,
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
        {
          path: 'analytics',
          component: AnalyticsTab,
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
      component: ManagementView,
      children: [
        {
          path: 'users',
          component: UsersTab,
        },
        {
          path: 'companies',
          component: CompaniesTab,
        },
        {
          path: 'modules',
          component: HomeView,
        },
      ],
    },
  ],
});

export default router;
