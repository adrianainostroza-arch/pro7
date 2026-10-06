<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

defineProps({
  total: { type: Number, default: 0 }
})

const store = useStore()

const categorias = computed(() => store.getters['productos/categorias'])
const hayFiltros = computed(() => store.getters['filtros/hayFiltrosActivos'])

const categoria = computed({
  get: () => store.state.filtros.categoria ?? 'todas',
  set: (valor) => store.dispatch('filtros/setCategoria', valor === 'todas' ? null : valor)
})

const busqueda = computed({
  get: () => store.state.filtros.busqueda,
  set: (valor) => store.dispatch('filtros/setBusqueda', valor ?? '')
})

const soloFavoritos = computed({
  get: () => store.state.filtros.soloFavoritos,
  set: (valor) => store.dispatch('filtros/setSoloFavoritos', Boolean(valor))
})

const limpiar = () => store.dispatch('filtros/limpiar')
</script>

<template>
  <section aria-label="Filtros del catálogo" class="mb-4">
    <v-row align="center">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="busqueda"
          label="Buscar por nombre o marca"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          density="comfortable"
          variant="outlined"
          data-testid="filtro-busqueda"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-switch
          v-model="soloFavoritos"
          label="Solo favoritos"
          color="red"
          hide-details
          density="comfortable"
          data-testid="filtro-favoritos"
        />
      </v-col>
      <v-col cols="12" md="2" class="text-md-right">
        <v-btn
          variant="text"
          prepend-icon="mdi-filter-remove-outline"
          :disabled="!hayFiltros"
          data-testid="limpiar-filtros"
          @click="limpiar"
        >
          Limpiar
        </v-btn>
      </v-col>
    </v-row>

    <v-chip-group
      v-model="categoria"
      mandatory
      selected-class="text-primary"
      aria-label="Filtrar por categoría"
    >
      <v-chip value="todas" filter variant="outlined" data-testid="filtro-categoria-todas">
        Todas
      </v-chip>
      <v-chip
        v-for="cat in categorias"
        :key="cat"
        :value="cat"
        filter
        variant="outlined"
        :data-testid="`filtro-categoria-${cat}`"
      >
        {{ cat }}
      </v-chip>
    </v-chip-group>

    <p class="text-body-2 text-medium-emphasis mt-2" role="status" aria-live="polite" data-testid="resultados-total">
      {{ total }} {{ total === 1 ? 'producto encontrado' : 'productos encontrados' }}
    </p>
  </section>
</template>
