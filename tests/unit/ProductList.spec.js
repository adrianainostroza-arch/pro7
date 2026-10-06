import flushPromises from 'flush-promises'
import ProductList from '@/components/ProductList.vue'
import { getProductos } from '@/services/productosService'
import { montar, productosDemo } from './helpers'

jest.mock('@/services/productosService')

describe('<ProductList>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
    localStorage.clear()
  })

  afterEach(() => {
    console.error.mockRestore()
  })

  it('muestra una respuesta visual clara cuando la API falla', async () => {
    getProductos.mockRejectedValue(new Error('Network Error'))

    const { wrapper } = montar(ProductList)
    await flushPromises()

    const alerta = wrapper.get('[data-testid="estado-error"]')
    expect(alerta.text()).toContain('No pudimos cargar los productos')
    expect(wrapper.find('[data-testid="lista-productos"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="estado-cargando"]').exists()).toBe(false)
  })

  it('permite reintentar tras un error y luego muestra los productos', async () => {
    getProductos.mockRejectedValueOnce(new Error('Network Error'))
    getProductos.mockResolvedValueOnce(productosDemo)

    const { wrapper } = montar(ProductList)
    await flushPromises()
    expect(wrapper.find('[data-testid="estado-error"]').exists()).toBe(true)

    await wrapper.get('[data-testid="boton-reintentar"]').trigger('click')
    await flushPromises()

    expect(wrapper.find('[data-testid="estado-error"]').exists()).toBe(false)
    expect(wrapper.findAll('[data-testid="product-card"]')).toHaveLength(4)
  })

  it('muestra el estado de carga mientras espera la respuesta', async () => {
    getProductos.mockReturnValue(new Promise(() => {})) // nunca resuelve

    const { wrapper } = montar(ProductList)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="estado-cargando"]').exists()).toBe(true)
  })

  it('muestra el estado vacío si la API no devuelve productos', async () => {
    getProductos.mockResolvedValue([])

    const { wrapper } = montar(ProductList)
    await flushPromises()

    expect(wrapper.find('[data-testid="estado-vacio"]').exists()).toBe(true)
  })

  it('filtra por categoría y por búsqueda', async () => {
    getProductos.mockResolvedValue(productosDemo)

    const { wrapper, store } = montar(ProductList)
    await flushPromises()
    expect(wrapper.findAll('[data-testid="product-card"]')).toHaveLength(4)

    await wrapper.get('[data-testid="filtro-categoria-Móviles"]').trigger('click')
    expect(wrapper.findAll('[data-testid="product-card"]')).toHaveLength(2)
    expect(wrapper.get('[data-testid="resultados-total"]').text()).toContain('2 productos')

    await store.dispatch('filtros/setBusqueda', 'tablet')
    expect(wrapper.findAll('[data-testid="product-card"]')).toHaveLength(1)

    await store.dispatch('filtros/setBusqueda', 'zzz')
    expect(wrapper.find('[data-testid="estado-sin-resultados"]').exists()).toBe(true)
  })
})
