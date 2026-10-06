const CLAVE = 'vps-favoritos'

function leerGuardados () {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE))
    return Array.isArray(guardados) ? guardados : []
  } catch {
    return []
  }
}

function guardar (ids) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(ids))
  } catch {
    /* almacenamiento no disponible: los favoritos viven solo en memoria */
  }
}

export default {
  namespaced: true,

  state: () => ({
    ids: leerGuardados()
  }),

  mutations: {
    TOGGLE (state, id) {
      const i = state.ids.indexOf(id)
      if (i === -1) state.ids.push(id)
      else state.ids.splice(i, 1)
    }
  },

  actions: {
    toggleFavorito ({ commit, state }, id) {
      commit('TOGGLE', id)
      guardar(state.ids)
    }
  },

  getters: {
    esFavorito: (state) => (id) => state.ids.includes(id),
    cantidad: (state) => state.ids.length
  }
}
