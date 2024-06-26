<template>
  <v-container class="my-4">
    <v-row>
      <v-col cols="12">
        <h1>Clientes</h1>
        <p>Bienvenido a la página de Clientes!</p>
        <v-divider class="my-4"></v-divider>
      </v-col>
      <v-col cols="10">
        <span>A continuación se listan los clientes registrados:</span>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <v-btn
          :to="{ name: 'RegisterClient' }"
          color="secondary"
          prepend-icon="mdi-plus"
        >
          Agregar
        </v-btn>
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
        >
          <template #item.actions="{ item }">
            <div>
              <v-tooltip>
                <template v-slot:activator="{ props }">
                  <v-btn
                    :to="{ name: 'EditClient', params: { id: item._id } }"
                    v-bind="props"
                    icon
                    class="no-bg"
                  >
                    <v-icon icon="mdi-pencil" />
                  </v-btn>
                </template>
                <span>Editar cliente</span>
              </v-tooltip>
              <v-tooltip>
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    class="no-bg"
                    @click="onOpenModalDelete(item)"
                    ><v-icon color="critical">mdi-delete-outline</v-icon></v-btn
                  >
                </template>
                <span>Eliminar cliente</span>
              </v-tooltip>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <DeleteClientModal
    v-if="dialogDeleteClient"
    :dialog="dialogDeleteClient"
    @update:dialog="dialogDeleteClient = $event"
    @clientDeleted="onClientDeleted"
    :client="client"
  />
</template>

<script>
import axios from "axios";
import DeleteClientModal from "@/views/clients/modals/Delete.vue";

export default {
  name: "Clients",
  components: { DeleteClientModal },
  data() {
    return {
      message: "",
      clients: [],
      client: {},
      dialogDeleteClient: false,
      headers: [
        { title: "Nombre", align: "start", key: "name" },
        { title: "Apellido", align: "center", key: "last_name" },
        { title: "DNI", align: "center", key: "document_number" },
        { title: "Acción", align: "end", key: "actions" },
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
      });
    },
    onOpenModalDelete(client) {
      this.client = client;
      this.dialogDeleteClient = true;
    },
  },
};
</script>

<style>
.header-background {
  background-color: #00b297;
  color: white;
}
.no-bg {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
}
.no-bg:hover {
  background-color: transparent !important;
}
.no-bg:focus {
  background-color: transparent !important;
}
.no-bg:active {
  background-color: transparent !important;
}
</style>
