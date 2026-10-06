import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

const CLAVE_TEMA = 'vps-tema'

// Tema inicial: preferencia guardada o, si no hay, la del sistema operativo
export function temaInicial () {
  try {
    const guardado = localStorage.getItem(CLAVE_TEMA)
    if (guardado === 'light' || guardado === 'dark') return guardado
  } catch { /* sin almacenamiento */ }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function guardarTema (nombre) {
  try { localStorage.setItem(CLAVE_TEMA, nombre) } catch { /* sin almacenamiento */ }
}

// En producción los componentes se importan automáticamente (webpack-plugin-vuetify).
// En los tests se pasan explícitamente mediante `options`.
export function crearVuetify (options = {}) {
  return createVuetify({
    theme: {
      defaultTheme: temaInicial(),
      themes: {
        light: {
          dark: false,
          colors: { primary: '#1565C0', secondary: '#546E7A', background: '#F5F7FA', surface: '#FFFFFF' }
        },
        dark: {
          dark: true,
          colors: { primary: '#64B5F6', secondary: '#90A4AE', background: '#121212', surface: '#1E1E1E' }
        }
      }
    },
    ...options
  })
}

export default crearVuetify()
