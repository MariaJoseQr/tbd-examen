<template>
  <v-container class="my-4">
    <div>
      <h1>Services</h1>
      <p>Bienvenido a la página de Servicios!</p>
    </div>
  </v-container>
</template>

<script>
import Footer from "../components/Footer.vue";
import axios from "../axios";

export default {
  name: "Services",
  components: {
    Footer,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {
    const param = this.$route.params.param || "";
    axios
      .get(`/services/${param}`)
      .then((response) => {
        this.message = response.data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
};
</script>
