import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/front/Index.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/front/About.vue'),
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/front/Products.vue'),
      },
      {
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/front/Product.vue'),
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/front/Cart.vue'),
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../views/front/Checkout.vue'),
      },
      {
        path: '/success',
        name: 'success',
        component: () => import('../views/front/CheckoutSuccess.vue'),
      },
    ],
  },
  {
    path: '/signin',
    component: () => import('../views/dashboard/Signin.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue'),
      },
      {
        path: 'pictures',
        component: () => import('../views/dashboard/Pictures.vue'),
      },
    ],
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
