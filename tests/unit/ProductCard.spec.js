import ProductCard from '@/components/ProductCard.vue'
import { montar, productosDemo } from './helpers'

describe('<ProductCard>', () => {
  const producto = productosDemo[0]

  it('renderiza correctamente los datos del producto', () => {
    const { wrapper } = montar(ProductCard, { props: { producto } })

    expect(wrapper.get('[data-testid="producto-nombre"]').text()).toBe('Laptop Pro')
    expect(wrapper.get('[data-testid="producto-marca"]').text()).toBe('Dell')
    expect(wrapper.get('[data-testid="producto-precio"]').text()).toContain('1.200')
    expect(wrapper.get('[data-testid="producto-categoria"]').text()).toBe('Computación')
    expect(wrapper.get('[data-testid="producto-stock"]').text()).toBe('Stock: 15')
  })

  it('avisa cuando quedan pocas unidades', () => {
    const { wrapper } = montar(ProductCard, { props: { producto: productosDemo[2] } })
    expect(wrapper.get('[data-testid="producto-stock"]').text()).toContain('Últimas 5')
  })

  it('refleja el estado de favorito de forma accesible', () => {
    const { wrapper } = montar(ProductCard, { props: { producto, favorito: true } })
    const boton = wrapper.get('[data-testid="boton-favorito"]')

    expect(boton.attributes('aria-pressed')).toBe('true')
    expect(boton.attributes('aria-label')).toBe('Quitar Laptop Pro de favoritos')
  })

  it('emite eventos al marcar favorito y al ver el detalle', async () => {
    const { wrapper } = montar(ProductCard, { props: { producto } })

    await wrapper.get('[data-testid="boton-favorito"]').trigger('click')
    await wrapper.get('[data-testid="boton-detalle"]').trigger('click')

    expect(wrapper.emitted('toggle-favorito')[0]).toEqual([1])
    expect(wrapper.emitted('ver-detalle')[0]).toEqual([producto])
  })
})
