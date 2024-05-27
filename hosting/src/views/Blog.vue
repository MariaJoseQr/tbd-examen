<template>
  <v-container class="my-4">
    <div>
      <h1>Blog</h1>
      <p>Bienvenido a la página de Blog!</p>
    </div>
  </v-container>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Blog",
  components: {
    Navbar,
    Footer,
  },
};
</script>
