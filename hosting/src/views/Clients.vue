<template>
  <v-container class="my-4">
    <div>
      <h1>Clientes</h1>
      <p>Bienvenido a la página de Clientes!</p>
    </div>
  </v-container>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Clients",
  components: {
    Navbar,
    Footer,
  },
};
</script>
