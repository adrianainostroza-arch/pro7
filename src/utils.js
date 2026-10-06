const formateadorPrecio = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

export const formatearPrecio = (valor) => formateadorPrecio.format(valor)

const ICONOS = {
  Computación: 'mdi-laptop',
  Móviles: 'mdi-cellphone',
  Periféricos: 'mdi-keyboard',
  Oficina: 'mdi-printer',
  Almacenamiento: 'mdi-harddisk'
}

export const iconoCategoria = (categoria) => ICONOS[categoria] || 'mdi-package-variant'
