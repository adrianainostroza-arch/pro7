<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ProductCard from './ProductCard.vue'
import ProductFilters from './ProductFilters.vue'

const store = useStore()
const router = useRouter()

const cargando = computed(() => store.state.productos.loading)
const error = computed(() => store.state.productos.error)
const todos = computed(() => store.state.productos.items)
const productos = computed(() => store.getters['productos/productosFiltrados'])
const hayFiltros = computed(() => store.getters['filtros/hayFiltrosActivos'])

const cargar = () => store.dispatch('productos/fetchProductos')
const esFavorito = (id) => store.getters['favoritos/esFavorito'](id)
const toggleFavorito = (id) => store.dispatch('favoritos/toggleFavorito', id)
const limpiarFiltros = () => store.dispatch('filtros/limpiar')

// Detalle individual: cada producto tiene su propia ruta (/producto/:id)
const verDetalle = (producto) =>
  router.push({ name: 'producto', params: { id: producto.id } })

// Ciclo de vida (Lección 1): al montar el componente se piden los productos
// (si ya se cargaron, p. ej. al volver desde el detalle, no se vuelve a llamar a la API)
onMounted(() => {
  if (!todos.value.length) cargar()
})
</script>

<template>
  <section aria-labelledby="titulo-catalogo">
    <h1 id="titulo-catalogo" class="text-h4 mb-4">Catálogo de productos</h1>

    <!-- Estado: cargando -->
    <v-row v-if="cargando" data-testid="estado-cargando" role="status" aria-label="Cargando productos">
      <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <!-- Estado: error -->
    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      title="Algo salió mal"
      data-testid="estado-error"
    >
      {{ error }}
      <template #append>
        <v-btn variant="outlined" data-testid="boton-reintentar" @click="cargar">Reintentar</v-btn>
      </template>
    </v-alert>

    <!-- Estado: sin productos en la API -->
    <v-alert
      v-else-if="todos.length === 0"
      type="info"
      variant="tonal"
      title="Sin productos"
      data-testid="estado-vacio"
    >
      Todavía no hay productos disponibles en el catálogo.
    </v-alert>

    <!-- Catálogo -->
    <template v-else>
      <ProductFilters :total="productos.length" />

      <!-- Estado: filtros sin resultados -->
      <v-alert
        v-if="productos.length === 0"
        type="warning"
        variant="tonal"
        title="Sin resultados"
        data-testid="estado-sin-resultados"
      >
        Ningún producto coincide con los filtros seleccionados.
        <template v-if="hayFiltros" #append>
          <v-btn variant="outlined" @click="limpiarFiltros">Limpiar filtros</v-btn>
        </template>
      </v-alert>

      <v-row v-else data-testid="lista-productos">
        <v-col v-for="producto in productos" :key="producto.id" cols="12" sm="6" md="4" lg="3">
          <ProductCard
            :producto="producto"
            :favorito="esFavorito(producto.id)"
            @toggle-favorito="toggleFavorito"
            @ver-detalle="verDetalle"
          />
        </v-col>
      </v-row>
    </template>
  </section>
</template>
