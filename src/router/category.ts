import { h, resolveComponent } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

const categoryRoutes: Array<RouteRecordRaw> = [
  {
    path: 'category', //localhost:port/dashboard/category
    name: 'c-category',
    component: {
      render: () => h(resolveComponent('router-view')),
    },
    children: [
      {
        path: '', //localhost:port/dashboard/category/
        name: 'c-index',
        component: () => import('../views/category/CIndex.vue'),
      },
      {
        path: 'create', //localhost:port/dashboard/category/create
        name: 'c-create',
        component: () => import('../views/category/CCreate.vue'),
      },
      {
        path: ':id/update', //localhost:port/dashboard/category/10/update
        name: 'c-update',
        component: () => import('../views/category/CUpdate.vue'),
      },
    ],
  },
];

export default categoryRoutes;
