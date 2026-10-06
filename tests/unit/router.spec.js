import flushPromises from 'flush-promises'
import App from '@/App.vue'
import { getProductos } from '@/services/productosService'
import { montar, productosDemo } from './helpers'

jest.mock('@/services/productosService')

describe('Router', () => {
  beforeEach(() => {
    localStorage.clear()
    getProductos.mockResolvedValue(productosDemo)
  })

  it('la ruta "/" muestra el catálogo', async () => {
    const { wrapper, router } = montar(App, { ruta: '/' })
    await router.isReady()
    await flushPromises()

    expect(router.currentRoute.value.name).toBe('catalogo')
    expect(wrapper.findAll('[data-testid="product-card"]')).toHaveLength(4)
  })

  it('"Ver detalle" navega a /producto/:id y muestra el producto', async () => {
    const { wrapper, router } = montar(App, { ruta: '/' })
    await router.isReady()
    await flushPromises()

    await wrapper.findAll('[data-testid="boton-detalle"]')[1].trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/producto/2')
    const detalle = wrapper.get('[data-testid="detalle-producto"]')
    expect(detalle.text()).toContain('Smartphone X')
    expect(detalle.text()).toContain('Samsung')
  })

  it('entrar directo a /producto/:id carga los datos y permite volver al catálogo', async () => {
    const { wrapper, router } = montar(App, { ruta: '/producto/3' })
    await router.isReady()
    await flushPromises()

    expect(wrapper.get('[data-testid="detalle-producto"]').text()).toContain('Tablet Air')

    await wrapper.get('[data-testid="volver-catalogo"]').trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('catalogo')
    expect(wrapper.findAll('[data-testid="product-card"]')).toHaveLength(4)
  })

  it('un producto inexistente muestra un aviso', async () => {
    const { wrapper, router } = montar(App, { ruta: '/producto/999' })
    await router.isReady()
    await flushPromises()

    expect(wrapper.find('[data-testid="producto-no-encontrado"]').exists()).toBe(true)
  })

  it('una ruta desconocida muestra la página 404', async () => {
    const { wrapper, router } = montar(App, { ruta: '/no-existe' })
    await router.isReady()
    await flushPromises()

    expect(router.currentRoute.value.name).toBe('no-encontrada')
    expect(wrapper.find('[data-testid="pagina-no-encontrada"]').exists()).toBe(true)
  })

  it('los favoritos se pueden marcar desde el detalle', async () => {
    const { wrapper, router } = montar(App, { ruta: '/producto/1' })
    await router.isReady()
    await flushPromises()

    await wrapper.get('[data-testid="boton-favorito"]').trigger('click')
    expect(wrapper.get('[data-testid="contador-favoritos"]').text()).toBe('1')
  })
})
