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
    path: '/about',
    name: 'About',
    component: loadView('AboutView')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
