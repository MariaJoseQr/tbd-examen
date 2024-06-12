<template>
  <v-container class="my-4">
    <v-row>
      <v-col cols="12">
        <h1>Clientes</h1>
        <p>Bienvenido a la página de Clientes!</p>
        <v-divider class="my-4"></v-divider>
      </v-col>
      <v-col cols="12">
        <span>A continuación se listan los clientes registrados:</span>
      </v-col>
      <v-col v-if="clients.length !== 0" cols="12">
        <v-data-table
          :headers="headers"
          :items="clients"
          height="400"
          item-value="name"
          :header-props="{
            class: 'header-background',
          }"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Clients",
  data() {
    return {
      message: "",
      clients: [],
      headers: [
        { title: "Nombre", align: "start", key: "name" },
        { title: "Apellido", align: "end", key: "last_name" },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.fetchClients();
    },
    fetchClients() {
      axios.get("http://localhost:3000/clients/").then((response) => {
        this.clients = response.data.docs;
        console.log("clients: ", clients);
      });
    },
  },
};
</script>

<style>
.header-background {
  background-color: #e57373;
  color: white;
}
</style>
