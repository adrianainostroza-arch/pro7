import { crearStore } from '@/store'
import { getProductos } from '@/services/productosService'
import { productosDemo } from './helpers'

jest.mock('@/services/productosService')

describe('Vuex store', () => {
  let store

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
    localStorage.clear()
    store = crearStore()
  })

  afterEach(() => {
    console.error.mockRestore()
  })

  it('productos/fetchProductos guarda los datos de la API', async () => {
    getProductos.mockResolvedValue(productosDemo)
    await store.dispatch('productos/fetchProductos')

    expect(store.state.productos.items).toHaveLength(4)
    expect(store.state.productos.loading).toBe(false)
    expect(store.state.productos.error).toBeNull()
    expect(store.getters['productos/categorias']).toEqual(['Computación', 'Móviles', 'Periféricos'])
  })

  it('productos/fetchProductos registra el error si la API falla', async () => {
    getProductos.mockRejectedValue(new Error('500'))
    await store.dispatch('productos/fetchProductos')

    expect(store.state.productos.items).toEqual([])
    expect(store.state.productos.error).toMatch(/No pudimos cargar/)
    expect(store.state.productos.loading).toBe(false)
  })

  it('productosFiltrados combina categoría, búsqueda y favoritos', async () => {
    getProductos.mockResolvedValue(productosDemo)
    await store.dispatch('productos/fetchProductos')

    await store.dispatch('filtros/setCategoria', 'Móviles')
    expect(store.getters['productos/productosFiltrados'].map((p) => p.id)).toEqual([2, 3])

    await store.dispatch('filtros/setBusqueda', 'samsung')
    expect(store.getters['productos/productosFiltrados'].map((p) => p.id)).toEqual([2])

    await store.dispatch('filtros/limpiar')
    await store.dispatch('favoritos/toggleFavorito', 4)
    await store.dispatch('filtros/setSoloFavoritos', true)
    expect(store.getters['productos/productosFiltrados'].map((p) => p.id)).toEqual([4])
  })

  it('favoritos persiste en localStorage y permite quitar', async () => {
    await store.dispatch('favoritos/toggleFavorito', 2)
    expect(store.getters['favoritos/esFavorito'](2)).toBe(true)
    expect(JSON.parse(localStorage.getItem('vps-favoritos'))).toEqual([2])

    await store.dispatch('favoritos/toggleFavorito', 2)
    expect(store.getters['favoritos/cantidad']).toBe(0)
  })
})
