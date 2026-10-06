<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>
