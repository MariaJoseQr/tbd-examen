<template>
  <v-app>
    <v-app-bar color="teal-darken-3">
      <v-btn
        :to="{ name: 'Home' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Inicio
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :to="{ name: 'Services' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Servicios
      </v-btn>
      <v-btn
        :to="{ name: 'Projects' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Proyectos
      </v-btn>
      <v-btn
        :to="{ name: 'Clients' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Clientes
      </v-btn>
      <v-btn
        :to="{ name: 'Blog' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Blog
      </v-btn>
      <v-btn
        :to="{ name: 'Contact' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Contacto
      </v-btn>
    </v-app-bar>
    <v-main class="content-container">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Tus estilos aquí */
</style>
