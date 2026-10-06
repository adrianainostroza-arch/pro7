<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useTema } from '@/composables/useTema'

const store = useStore()
const { esOscuro, alternarTema } = useTema()

const cantidadFavoritos = computed(() => store.getters['favoritos/cantidad'])
const etiquetaTema = computed(() =>
  esOscuro.value ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
)
</script>

<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title>
      <router-link :to="{ name: 'catalogo' }" class="titulo-link" data-testid="enlace-inicio">
        <v-icon icon="mdi-storefront-outline" class="mr-2" aria-hidden="true" />
        Vue Product Showcase
      </router-link>
    </v-app-bar-title>

    <v-spacer />

    <v-chip
      class="mr-2"
      variant="flat"
      color="white"
      prepend-icon="mdi-heart"
      data-testid="contador-favoritos"
      :aria-label="`${cantidadFavoritos} productos favoritos`"
    >
      {{ cantidadFavoritos }}
    </v-chip>

    <v-btn
      icon
      data-testid="boton-tema"
      :aria-label="etiquetaTema"
      :title="etiquetaTema"
      @click="alternarTema"
    >
      <v-icon :icon="esOscuro ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.titulo-link {
  color: inherit;
  text-decoration: none;
}
</style>
