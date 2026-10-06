<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { formatearPrecio, iconoCategoria } from '@/utils'

const props = defineProps({
  id: { type: Number, required: true }
})

const store = useStore()

const cargando = computed(() => store.state.productos.loading)
const error = computed(() => store.state.productos.error)
const producto = computed(() => store.getters['productos/productoPorId'](props.id))
const favorito = computed(() => store.getters['favoritos/esFavorito'](props.id))

const cargar = () => store.dispatch('productos/fetchProductos')
const toggleFavorito = () => store.dispatch('favoritos/toggleFavorito', props.id)

// Si se entra directo a /producto/:id, el store todavía está vacío: se piden los datos
onMounted(() => {
  if (!store.state.productos.items.length) cargar()
})
</script>

<template>
  <section aria-labelledby="titulo-detalle">
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4"
      :to="{ name: 'catalogo' }"
      data-testid="volver-catalogo"
    >
      Volver al catálogo
    </v-btn>

    <v-skeleton-loader
      v-if="cargando"
      type="article"
      data-testid="estado-cargando"
      role="status"
      aria-label="Cargando producto"
    />

    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      title="Algo salió mal"
      data-testid="estado-error"
    >
      {{ error }}
      <template #append>
        <v-btn variant="outlined" @click="cargar">Reintentar</v-btn>
      </template>
    </v-alert>

    <v-alert
      v-else-if="!producto"
      type="warning"
      variant="tonal"
      title="Producto no encontrado"
      data-testid="producto-no-encontrado"
    >
      No existe un producto con el código #{{ id }}.
    </v-alert>

    <v-card v-else max-width="720" data-testid="detalle-producto">
      <div class="detalle__media d-flex align-center justify-center bg-primary">
        <v-icon :icon="iconoCategoria(producto.categoria)" size="96" aria-hidden="true" />
      </div>

      <v-card-item>
        <v-card-title id="titulo-detalle" tag="h1" class="text-h5">
          {{ producto.nombre }}
        </v-card-title>
        <v-card-subtitle>{{ producto.marca }} · {{ producto.categoria }}</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <p class="mb-4">{{ producto.descripcion }}</p>
        <v-list density="compact">
          <v-list-item title="Precio" :subtitle="formatearPrecio(producto.precio)" />
          <v-list-item title="Unidades disponibles" :subtitle="String(producto.stock)" />
          <v-list-item title="Código" :subtitle="`#${producto.id}`" />
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          :color="favorito ? 'red' : undefined"
          :prepend-icon="favorito ? 'mdi-heart' : 'mdi-heart-outline'"
          :aria-pressed="favorito"
          data-testid="boton-favorito"
          @click="toggleFavorito"
        >
          {{ favorito ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<style scoped>
.detalle__media {
  height: 180px;
}
</style>
