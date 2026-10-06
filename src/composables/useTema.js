import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { guardarTema } from '@/plugins/vuetify'

// Alterna entre tema claro y oscuro y recuerda la preferencia
export function useTema () {
  const theme = useTheme()
  const esOscuro = computed(() => theme.global.name.value === 'dark')

  function alternarTema () {
    const siguiente = esOscuro.value ? 'light' : 'dark'
    theme.global.name.value = siguiente
    guardarTema(siguiente)
  }

  return { esOscuro, alternarTema }
}
