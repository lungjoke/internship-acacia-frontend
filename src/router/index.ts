import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { isTokenExpired, logout } from '@/services/auth.service';
import categoryRoutes from './category';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'd-index-view',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { requireAuth: true },
      component: () => import('../layouts/DLayout.vue'),
      children: [
        {
          path: '',
          name: 'd-index-view',
          component: () => import('../views/dashboard/DIdexView.vue'),
        },
        ...categoryRoutes,
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (!token || isTokenExpired(token)) {
      logout();
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
