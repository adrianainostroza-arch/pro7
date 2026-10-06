import axios from 'axios'

/**
 * Cliente Axios configurable por variables de entorno:
 *  - VUE_APP_API_URL:       URL base de la API (vacío = mismo origen)
 *  - VUE_APP_PRODUCTS_PATH: ruta del recurso (por defecto /productos.json de la carpeta public)
 */
export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '',
  timeout: 8000
})

export async function getProductos () {
  const path = process.env.VUE_APP_PRODUCTS_PATH || '/productos.json'
  const { data } = await apiClient.get(path)
  return data
}
