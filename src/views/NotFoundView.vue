<template>
  <section class="text-center py-12" data-testid="pagina-no-encontrada">
    <v-icon icon="mdi-compass-off-outline" size="96" color="primary" aria-hidden="true" />
    <h1 class="text-h4 mt-4">Página no encontrada</h1>
    <p class="text-body-1 my-4">La dirección que buscas no existe o fue movida.</p>
    <v-btn color="primary" :to="{ name: 'catalogo' }" prepend-icon="mdi-arrow-left">
      Volver al catálogo
    </v-btn>
  </section>
</template>
