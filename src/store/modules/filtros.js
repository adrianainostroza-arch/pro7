export default {
  namespaced: true,

  state: () => ({
    categoria: null, // null = todas
    busqueda: '',
    soloFavoritos: false
  }),

  mutations: {
    SET_CATEGORIA (state, categoria) { state.categoria = categoria },
    SET_BUSQUEDA (state, texto) { state.busqueda = texto },
    SET_SOLO_FAVORITOS (state, valor) { state.soloFavoritos = valor },
    RESET (state) {
      state.categoria = null
      state.busqueda = ''
      state.soloFavoritos = false
    }
  },

  actions: {
    setCategoria ({ commit }, categoria) { commit('SET_CATEGORIA', categoria) },
    setBusqueda ({ commit }, texto) { commit('SET_BUSQUEDA', texto) },
    setSoloFavoritos ({ commit }, valor) { commit('SET_SOLO_FAVORITOS', valor) },
    limpiar ({ commit }) { commit('RESET') }
  },

  getters: {
    hayFiltrosActivos: (state) =>
      Boolean(state.categoria || state.busqueda.trim() || state.soloFavoritos)
  }
}
