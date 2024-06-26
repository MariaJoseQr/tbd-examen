<template>
  <v-form ref="formClient" lazy-validation>
    <v-row class="pa-10 pb-0">
      <v-col cols="6" class="pl-0">
        <v-text-field
          v-model="name"
          :rules="requiredRules"
          label="Nombre"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="pr-0">
        <v-text-field
          v-model="lastName"
          :rules="requiredRules"
          label="Apellido"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="px-0">
        <v-text-field
          v-model="documentNumber"
          :rules="requiredRules"
          label="DNI"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="pr-10 pb-10">
      <v-col class="d-flex justify-end pr-0">
        <v-btn @click="onSave" color="#ffc832"> Guardar </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import axios from "axios";

export default {
  name: "ClientForm",
  props: {
    clientSelected: {
      type: Object,
      default: () => ({}),
    },
    action: {
      type: String,
      default: "create",
    },
  },
  data() {
    return {
      name: "",
      lastName: "",
      documentNumber: "",
      requiredRules: [(v) => !!v || "Este campo es obligatorio"],
    };
  },
  created() {
    if (this.action === "update" && this.clientSelected) {
      this.name = this.clientSelected.name;
      this.lastName = this.clientSelected.last_name;
      this.documentNumber = this.clientSelected.document_number;
    }
  },
  methods: {
    async onSave() {
      try {
        if (!this.$refs.formClient.validate()) return;

        const data = {
          name: this.name,
          last_name: this.lastName,
          document_number: this.documentNumber,
        };

        if (this.action === "create") await this.saveClient(data);
        else await this.updateClient({ id: this.clientSelected._id, data });

        this.$router.replace({ name: "Clients" });
      } catch (error) {
        error.message || "Ocurrió un problema al guardar la información";
      }
    },
    async saveClient(data) {
      try {
        const response = await axios.post(
          "http://localhost:3000/clients",
          data
        );

        return response.data;
      } catch (error) {
        throw new Error(
          error.response ? error.response.data.message : error.message
        );
      }
    },
    async updateClient({ id, data }) {
      try {
        const response = await axios.patch(
          `http://localhost:3000/clients/${id}`,
          data
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response ? error.response.data.message : error.message
        );
      }
    },
  },
};
</script>
