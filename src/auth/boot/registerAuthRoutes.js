import { boot } from 'quasar/wrappers'

export default boot(({ router }) => {
  router.addRoute('/', {
    name: 'auth.register',
    path: '/register',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/IdentityPasswordRegisterPage.vue'),
  })

  router.addRoute('/', {
    name: 'auth.login',
    path: '/login',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/IdentityPasswordLoginPage.vue'),
  })

  router.addRoute('/', {
    name: 'auth.requestPasswordReset',
    path: '/forgot-password',
    meta: { unauthOnly: true },
    component: () =>
      import('src/auth/pages/PasswordResetRequestViaEmailPage.vue'),
  })

  router.addRoute('/', {
    name: 'auth.resetPassword',
    path: '/password-reset',
    meta: { unauthOnly: true },
    component: () => import('src/auth/pages/PasswordResetViaEmailPage.vue'),
  })

  router.addRoute('/', {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('src/pages/UserDashboard.vue'),
        meta: { authOnly: true },
      },

      {
        path: '/sales/new',
        name: 'sale.new',
        component: () => import('src/pages/SaleNewPage.vue'),
        meta: { authOnly: true },
      },

      {
        path: '/users',
        name: 'users',
        meta: { authOnly: true, accessLevel: 2 },
        component: () => import('src/pages/UsersPage.vue'),
      },
      {
        path: '/users/:id',
        name: 'user.details',
        props: true,
        meta: { authOnly: true, accessLevel: 2 },
        component: () => import('src/pages/UserDetailsPage.vue'),
      },
      {
        path: '/users/:id/edit',
        name: 'user.edit',
        props: true,
        meta: { authOnly: true, accessLevel: 2 },
        component: () => import('src/pages/UserEditPage.vue'),
      },
      {
        path: '/users/new',
        name: 'user.create',
        meta: { authOnly: true, accessLevel: 2 },
        component: () => import('src/pages/UserCreatePage.vue'),
      },

      {
        path: '/stock',
        name: 'stock',
        meta: { authOnly: true, accessLevel: 0 },
        component: () => import('src/pages/StockPage.vue'),
      },
      {
        path: '/restock',
        name: 'restock',
        meta: { authOnly: true, accessLevel: 0 },
        component: () => import('src/pages/RestockPage.vue'),
      },
      {
        path: '/waste',
        name: 'waste',
        meta: { authOnly: true, accessLevel: 0 },
        component: () => import('src/pages/WasteNewPage.vue'),
      },

      {
        path: '/products',
        name: 'products',
        meta: { authOnly: true, accessLevel: 0 },
        component: () => import('src/pages/ProductsPage.vue'),
      },
      {
        path: '/products/:id',
        name: 'product.details',
        props: true,
        meta: { authOnly: true, accessLevel: 2 },
        component: () => import('src/pages/ProductDetailsPage.vue'),
      },
      {
        path: '/products/:id/edit',
        name: 'product.edit',
        props: true,
        meta: { authOnly: true, accessLevel: 2 },
        component: () => import('src/pages/ProductEditPage.vue'),
      },
      {
        path: '/products/new',
        name: 'products.create',
        meta: { authOnly: true, accessLevel: 2 },
        component: () => import('src/pages/ProductCreatePage.vue'),
      },

      {
        path: '/logs',
        name: 'logs',
        meta: { authOnly: true, accessLevel: 2 },
        component: () => import('src/pages/LogsPage.vue'),
      },
      {
        path: '/stats',
        name: 'stats',
        meta: { authOnly: true, accessLevel: 2 },
        component: () => import('src/pages/StatsPage.vue'),
      },
    ],
  })
})
