<script setup>
import { ref, onBeforeMount } from 'vue'
// Importamos los datos de productos desde un archivo JSON ubicado en la carpeta 'data' dentro desrc
import productosJson from './data/productos.json'

const productos = ref([])
console.log('Productos valor inicial:', productos)
const mostrarProductos = ref(false)

// hook antes que el componente se monte, cargamos los productos desde el archivo JSON importado
onBeforeMount(() => {
  console.log('Cargando productos...')

  productos.value = productosJson

  console.log('Productos cargados:', productos.value)
})

const verProductos = () => {
  mostrarProductos.value = true
}
</script>

<template>
  <div>
    <h1>Listado de Productos</h1>

    <button @click="verProductos">
      Ver Productos
    </button>

    <div v-if="mostrarProductos">
      <ul>
        <li
          v-for="producto in productos"
          :key="producto.id"
        >
          <strong>ID:</strong> {{ producto.id }} |
          <strong>Nombre:</strong> {{ producto.nombre }} |
          <strong>Marca:</strong> {{ producto.marca }} |
          <strong>Precio:</strong> ${{ producto.precio }} |
          <strong>Categoría:</strong> {{ producto.categoria }} |
          <strong>Stock:</strong> {{ producto.stock }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
button {
  margin-bottom: 20px;
  padding: 8px 16px;
  cursor: pointer;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 8px;
}
</style>