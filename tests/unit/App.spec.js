import flushPromises from 'flush-promises'
import App from '@/App.vue'
import { getProductos } from '@/services/productosService'
import { montar, productosDemo } from './helpers'

jest.mock('@/services/productosService')

describe('<App>', () => {
  beforeEach(() => {
    localStorage.clear()
    getProductos.mockResolvedValue(productosDemo)
  })

  it('renderiza header, catálogo y footer', async () => {
    const { wrapper } = montar(App)
    await flushPromises()

    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
    expect(wrapper.text()).toContain('Catálogo de productos')
    expect(wrapper.findAll('[data-testid="product-card"]')).toHaveLength(4)
  })

  it('alterna entre tema claro y oscuro y recuerda la preferencia', async () => {
    const { wrapper } = montar(App)
    await flushPromises()

    const boton = wrapper.get('[data-testid="boton-tema"]')
    const etiquetaInicial = boton.attributes('aria-label')

    await boton.trigger('click')
    const etiquetaNueva = wrapper.get('[data-testid="boton-tema"]').attributes('aria-label')

    expect(etiquetaNueva).not.toBe(etiquetaInicial)
    expect(['light', 'dark']).toContain(localStorage.getItem('vps-tema'))
  })

  it('el contador del header refleja los favoritos', async () => {
    const { wrapper } = montar(App)
    await flushPromises()
    expect(wrapper.get('[data-testid="contador-favoritos"]').text()).toBe('0')

    await wrapper.findAll('[data-testid="boton-favorito"]')[0].trigger('click')
    expect(wrapper.get('[data-testid="contador-favoritos"]').text()).toBe('1')
  })
})
