import { mount } from '@vue/test-utils'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { crearVuetify } from '@/plugins/vuetify'
import { crearStore } from '@/store'
import { crearRouter } from '@/router'
import { createMemoryHistory } from 'vue-router'

export const productosDemo = [
  { id: 1, nombre: 'Laptop Pro', marca: 'Dell', precio: 1200, categoria: 'Computación', stock: 15, descripcion: 'Notebook' },
  { id: 2, nombre: 'Smartphone X', marca: 'Samsung', precio: 850, categoria: 'Móviles', stock: 30, descripcion: 'Teléfono' },
  { id: 3, nombre: 'Tablet Air', marca: 'Apple', precio: 950, categoria: 'Móviles', stock: 5, descripcion: 'Tablet' },
  { id: 4, nombre: 'Mouse Gamer', marca: 'Logitech', precio: 65, categoria: 'Periféricos', stock: 100, descripcion: 'Mouse' }
]

// Monta un componente con Vuetify, un store Vuex limpio y un router en memoria
export function montar (componente, { props, store = crearStore(), ruta = '/', ...resto } = {}) {
  const vuetify = crearVuetify({ components, directives })
  // Router con historial en memoria: no depende del navegador
  const historial = createMemoryHistory()
  historial.replace(ruta) // ruta inicial: el plugin navega a ella al instalarse
  const router = crearRouter(historial)
  const wrapper = mount(componente, {
    props,
    global: { plugins: [vuetify, store, router] },
    ...resto
  })
  return { wrapper, store, router }
}
