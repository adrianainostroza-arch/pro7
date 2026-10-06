<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'

const productos = ref([])
const mostrarProductos = ref(false)
const cargando = ref(false)
const error = ref(null)

onBeforeMount(async () => {
  try {
    cargando.value = true
    // equivale a http://localhost:8080/productos.json en desarrollo, o a la ruta pública del 
    // proyecto en producción
    const response = await axios.get('/productos.json')
    console.log('Valor de Response devuelto por axios:', response)
    console.log('Valor de propiedad data de response que es un objeto Javascript:', response.data)
    productos.value = response.data
  } catch (err) {
    error.value = 'Error al cargar los productos'
    console.error(err)
  } finally {
    cargando.value = false
  }
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

    <p v-if="cargando">
      Cargando productos...
    </p>

    <p v-if="error">
      {{ error }}
    </p>

    <ul v-if="mostrarProductos">
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
</template>

<style scoped>
button {
  padding: 8px 16px;
  margin-bottom: 15px;
  cursor: pointer;
}

li {
  margin-bottom: 8px;
}
</style>