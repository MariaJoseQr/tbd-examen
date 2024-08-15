<template>
  <v-form ref="formClient">
    <v-row class="pa-10 pb-0">
      <v-col cols="6" class="pl-0 py-0">
        <v-text-field
          v-model="name"
          :rules="[(v) => !!v || 'El nombre es obligatorio']"
          label="Nombre"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="pr-0 py-0">
        <v-text-field
          v-model="lastName"
          :rules="[(v) => !!v || 'El apellido es obligatorio']"
          label="Apellido"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="px-0 py-0">
        <v-text-field
          v-model="email"
          :rules="[(v) => !!v || 'El correo es obligatorio']"
          label="Correo"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="px-0 py-0">
        <v-text-field
          v-model="address"
          :rules="[(v) => !!v || 'La dirección es obligatoria']"
          label="Dirección"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="px-0 py-0">
        <v-text-field
          v-model="phone"
          :rules="[(v) => !!v || 'El teléfono es obligatorio']"
          label="Teléfono"
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
      email: "",
      address: "",
      phone: "",
    };
  },
  created() {
    if (this.action === "update" && this.clientSelected) {
      this.name = this.clientSelected.name;
      this.lastName = this.clientSelected.last_name;
      this.email = this.clientSelected.email;
      this.address = this.clientSelected.address;
      this.phone = this.clientSelected.phone;
    }
  },
  methods: {
    async onSave() {
      try {
        if (!(await this.$refs.formClient.validate())) return;

        const data = {
          name: this.name,
          last_name: this.lastName,
          email: this.email,
          address: this.address,
          phone: this.phone,
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
