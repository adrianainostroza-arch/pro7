import { getProductos } from '@/services/productosService'

export default {
  namespaced: true,

  state: () => ({
    items: [],
    loading: false,
    error: null
  }),

  mutations: {
    SET_LOADING (state, valor) { state.loading = valor },
    SET_ITEMS (state, items) { state.items = items },
    SET_ERROR (state, mensaje) { state.error = mensaje }
  },

  actions: {
    // El consumo de la API vive aquí (Lección 3), no en los componentes
    async fetchProductos ({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const data = await getProductos()
        commit('SET_ITEMS', Array.isArray(data) ? data : [])
      } catch (err) {
        commit('SET_ITEMS', [])
        commit('SET_ERROR', 'No pudimos cargar los productos. Revisa tu conexión e inténtalo nuevamente.')
        console.error(err)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    productoPorId: (state) => (id) => state.items.find((p) => p.id === id),

    categorias: (state) => [...new Set(state.items.map((p) => p.categoria))].sort(),

    // Combina el estado de los módulos "filtros" y "favoritos" para computar el resultado
    productosFiltrados: (state, getters, rootState) => {
      const { categoria, busqueda, soloFavoritos } = rootState.filtros
      const texto = busqueda.trim().toLowerCase()
      return state.items.filter((p) => {
        if (categoria && p.categoria !== categoria) return false
        if (soloFavoritos && !rootState.favoritos.ids.includes(p.id)) return false
        if (texto && !`${p.nombre} ${p.marca}`.toLowerCase().includes(texto)) return false
        return true
      })
    }
  }
}
