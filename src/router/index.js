import { createRouter, createWebHistory } from 'vue-router'
import CatalogoView from '@/views/CatalogoView.vue'
import ProductoDetalleView from '@/views/ProductoDetalleView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

export const routes = [
  {
    path: '/',
    name: 'catalogo',
    component: CatalogoView,
    meta: { titulo: 'Catálogo' }
  },
  {
    path: '/producto/:id(\\d+)',
    name: 'producto',
    component: ProductoDetalleView,
    props: (route) => ({ id: Number(route.params.id) }),
    meta: { titulo: 'Detalle del producto' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'no-encontrada',
    component: NotFoundView,
    meta: { titulo: 'Página no encontrada' }
  }
]

// Fábrica: en producción usa el historial del navegador; en los tests, uno en memoria
export function crearRouter (history = createWebHistory(process.env.BASE_URL)) {
  const router = createRouter({
    history,
    routes,
    scrollBehavior: () => ({ top: 0 })
  })

  router.afterEach((to) => {
    document.title = `${to.meta.titulo} · Vue Product Showcase`
  })

  return router
}

export default crearRouter()
