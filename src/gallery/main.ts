import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Catalog from './Catalog.vue';
import './gallery.css';
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.path !== from.path) return { top: 0 };
  },
  routes: [
    { path: '/', component: Catalog },
    { path: '/designs/:slug', component: () => import('./Inspector.vue') },
    { path: '/compare', component: () => import('./Compare.vue') },
    { path: '/guide', component: () => import('./Guide.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./Guide.vue') },
  ],
});
router.afterEach((to) => {
  document.title =
    to.path === '/'
      ? 'Design Library — Fifty ways to make a website'
      : 'Design Library · ' + (to.params.slug || to.path.slice(1));
});
createApp(App).use(router).mount('#app');
