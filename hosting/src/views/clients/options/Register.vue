<template>
  <v-container class="my-4">
    <v-row class="pt-10">
      <v-col cols="12">
        <v-card class="mx-auto pa-4 pb-2 mb-4 rounded-lg" max-width="500">
          <v-row>
            <v-col cols="12" class="pl-10 pt-10">
              <h1>Nuevo Cliente</h1>
            </v-col>
          </v-row>
          <ClientForm></ClientForm>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ClientForm from "@/views/clients/forms/Client.vue";
export default {
  name: "ClientRegister",
  components: {
    ClientForm,
  },
};
</script>
