import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MasterView.vue'
import AdminView from '../views/admin/AdminView.vue'
import CashierView from '../views/cashier/CashierView.vue'
import CartView from '../views/cashier/CartView.vue'
import TransactionView from '../views/cashier/TransactionView.vue'
import HistoryView from '../views/cashier/HistoryView.vue'
import ManagerView from '../views/manager/ManagerView.vue'
import FilterView from '../views/manager/FilterView.vue'
import LoginView from '../views/LoginView.vue'

import NotFound from '../views/NotFound.vue'
import ForbiddenView from '../views/ForbiddenView.vue'

const routes = [
  {
    path: '/Master',
    name: 'Master',
    component: HomeView
  },
  {
    path: '/Admin',
    name: 'AdminView',
    component: AdminView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['Admin']
    }
  },
  {
    path: '/Cashier',
    name: 'CashierView',
    component: CashierView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['Kasir']
    }
  },
  {
    path: '/Cart',
    name: 'CartView',
    component: CartView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['Kasir']
    }
  },
  {
    path: '/Transaction',
    name: 'TransactionView',
    component: TransactionView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['Kasir']
    }
  },
  {
    path: '/History',
    name: 'HistoryView',
    component: HistoryView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['Kasir']
    }
  },
  {
    path: '/Manager',
    name: 'ManagerView',
    component: ManagerView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['Manajer']
    }
  },
  {
    path: '/Filter',
    name: 'FilterView',
    component: FilterView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['Manajer']
    }
  },
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },

  {
    path: '/:catchAll(.*)',
    redirect: '/NotFound'
  },
  {
    path: '/NotFound',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/Forbidden',
    name: 'ForbiddenView',
    component: ForbiddenView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

router.beforeEach((to, form, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth) {
    const userRole = localStorage.getItem("role")
    if (!userRole) {
      next({
        path: '/'
      })
    } else {
      if (to.meta.allowedRoles.includes(userRole)) {
        next()
      } else {
        next({
          path: '/Forbidden'
        })
      }
    }
  } else {
    next();
  }
})