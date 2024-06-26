<template>
  <v-dialog v-model="localDialog" persistent scrollable max-width="400">
    <v-card class="py-2">
      <v-card-title class="ml-2 mt-4 mb-0 pb-0">
        <v-row>
          <v-col cols="10">
            <span class="font-weight-bold ml-0">Eliminar cliente</span>
          </v-col>
          <v-col cols="2" class="pt-0">
            <v-btn rounded class="no-bg" icon @click="closeDialog">
              <v-icon size="small">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-spacer />
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p class="font-weight-light">
              ¿Está seguro que
              <span class="font-weight-bold">
                desea eliminar a
                {{ client.name }} {{ client.last_name }}
              </span>
              de la lista de clientes?
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mx-4 mb-2">
        <v-btn
          class="ms-auto"
          rounded
          text="Cancelar"
          @click="closeDialog"
        ></v-btn>
        <v-spacer />
        <v-btn color="critical" rounded dark @click="onDelete">
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "DeleteClientModal",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    client: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localDialog: this.dialog,
    };
  },
  watch: {
    dialog(value) {
      console.log("watch dialog: ", value);
      this.localDialog = value;
    },
    localDialog(value) {
      this.$emit("update:dialog", value);
    },
  },

  methods: {
    closeDialog() {
      this.localDialog = false;
    },
    async onDelete() {
      try {
        const id = this.client._id;
        await axios.delete(`http://localhost:3000/clients/${id}`);

        this.$emit("clientDeleted", id);
        this.closeDialog();
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    },
  },
  created() {
    console.log("modaaaal dialog: ", this.dialog);
    console.log("modaaaal client: ", this.client);
  },
};
</script>

<style>
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
