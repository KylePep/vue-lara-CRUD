import { createRouter, createWebHashHistory } from 'vue-router'

function loadView(view) {
  return () => import(`./views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('HomeView')
  },
  {
    path: '/item',
    name: 'Item',
    component: loadView('ItemView')
  },
  {
    path: '/bucket',
    name: 'Bucket',
    component: loadView('BucketView')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
