<template>
  <v-container class="my-4">
    <v-row v-if="client.length !== 0" class="pt-10">
      <v-col cols="12">
        <v-card class="mx-auto pa-4 pb-2 mb-4 rounded-lg" max-width="500">
          <v-row>
            <v-col cols="12" class="pl-10 pt-10">
              <h1>Editar Cliente</h1>
            </v-col>
          </v-row>
          <ClientForm action="update" :client-selected="client"></ClientForm>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import ClientForm from "@/views/clients/forms/Client.vue";
export default {
  name: "ClientEdit",
  data() {
    return { client: [] };
  },
  components: {
    ClientForm,
  },
  created() {
    this.getClientById();
  },
  destroyed() {
    this.client = null;
  },
  methods: {
    async getClientById() {
      try {
        const id = this.$route.params.id;
        const response = await axios.get(`http://localhost:3000/clients/${id}`);
        this.client = response.data.doc;
      } catch (error) {
        console.error("Error fetching client by ID:", error);
      }
    },
  },
};
</script>
