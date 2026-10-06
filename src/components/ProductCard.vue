<script setup>
import { computed } from 'vue'
import { formatearPrecio, iconoCategoria } from '@/utils'

const props = defineProps({
  producto: { type: Object, required: true },
  favorito: { type: Boolean, default: false }
})

defineEmits(['toggle-favorito', 'ver-detalle'])

const precio = computed(() => formatearPrecio(props.producto.precio))
const pocoStock = computed(() => props.producto.stock < 10)
const etiquetaFavorito = computed(() =>
  props.favorito
    ? `Quitar ${props.producto.nombre} de favoritos`
    : `Agregar ${props.producto.nombre} a favoritos`
)
</script>

<template>
  <v-card class="product-card h-100 d-flex flex-column" data-testid="product-card" hover>
    <div class="product-card__media d-flex align-center justify-center bg-primary">
      <v-icon :icon="iconoCategoria(producto.categoria)" size="72" aria-hidden="true" />
    </div>

    <v-card-item>
      <v-card-title data-testid="producto-nombre">{{ producto.nombre }}</v-card-title>
      <v-card-subtitle data-testid="producto-marca">{{ producto.marca }}</v-card-subtitle>
    </v-card-item>

    <v-card-text class="flex-grow-1">
      <div class="text-h6 mb-2" data-testid="producto-precio">{{ precio }}</div>
      <v-chip size="small" class="mr-1" data-testid="producto-categoria">
        {{ producto.categoria }}
      </v-chip>
      <v-chip
        size="small"
        :color="pocoStock ? 'warning' : 'success'"
        data-testid="producto-stock"
      >
        {{ pocoStock ? `¡Últimas ${producto.stock}!` : `Stock: ${producto.stock}` }}
      </v-chip>
    </v-card-text>

    <v-card-actions>
      <v-btn
        variant="text"
        color="primary"
        data-testid="boton-detalle"
        @click="$emit('ver-detalle', producto)"
      >
        Ver detalle
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        variant="text"
        :color="favorito ? 'red' : undefined"
        :aria-label="etiquetaFavorito"
        :aria-pressed="favorito"
        data-testid="boton-favorito"
        @click="$emit('toggle-favorito', producto.id)"
      >
        <v-icon :icon="favorito ? 'mdi-heart' : 'mdi-heart-outline'" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.product-card__media {
  height: 140px;
}
</style>
