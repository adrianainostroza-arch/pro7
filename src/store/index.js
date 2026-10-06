import { createStore } from 'vuex'
import productos from './modules/productos'
import filtros from './modules/filtros'
import favoritos from './modules/favoritos'

// Fábrica: permite crear un store limpio por cada test
export function crearStore () {
  return createStore({
    modules: { productos, filtros, favoritos }
  })
}

export default crearStore()
