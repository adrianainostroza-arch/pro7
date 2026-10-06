<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'

const Usuarios = ref([])
const mostrarUsuarios = ref(false)
const cargando = ref(false)
const error = ref(null)

onBeforeMount(async () => {
  try {
    cargando.value = true
    // equivale a http://localhost:8080/productos.json en desarrollo, o a la ruta pública del 
    // proyecto en producción
    const response = await axios.get('https://reqres.in/api/users')
    console.log('Valor de Response devuelto por axios:', response)
    console.log('Valor de propiedad data de response que es un objeto Javascript:', response.data)
    Usuarios.value = response.data.data
  } catch (err) {
    error.value = 'Error al cargar los usuarios'
    console.error(err)
  } finally {
    cargando.value = false
  }
})

const verUsuarios = () => {
  mostrarUsuarios.value = true
}
</script>

<template>
  <div>
    <h1>Listado de Usuarios</h1>

    <button @click="verUsuarios">
      Ver Usuarios
    </button>

    <p v-if="cargando">
      Cargando usuarios...
    </p>

    <p v-if="error">
      {{ error }}
    </p>

    <ul v-if="mostrarUsuarios">
      <li
        v-for="usuario in Usuarios"
        :key="usuario.id"
      >
        <strong>ID:</strong> {{ usuario.id }} |
        <strong>Email:</strong> {{ usuario.email }} |
        <strong>First_name:</strong> {{ usuario.first_name }} |
        <strong>Last_name:</strong> {{ usuario.last_name }} |
        <strong>Avatar:</strong> {{ usuario.avatar }} |
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