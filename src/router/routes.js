const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/index-page', component: () => import('pages/IndexPage.vue') },
      { path: '/usuario-agenda', component: () => import('pages/UsuarioAgenda.vue') },
      { path: '/quadras-page', component: () => import('pages/QuadrasPage.vue') },
      { path: '/contato-page', component: () => import('pages/ContatoPage.vue') },
      { path: '/sobre-page', component: () => import('pages/SobrePage.vue') },
      { path: '/login-page', component: () => import('pages/LoginPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
