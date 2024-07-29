<template>
  <v-form ref="formClient">
    <v-row class="pa-10 pb-0">
      <v-col cols="6" class="pl-0">
        <v-text-field
          v-model="name"
          :rules="[(v) => !!v || 'El nombre es obligatorio']"
          label="Nombre"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="pr-0">
        <v-text-field
          v-model="lastName"
          :rules="[(v) => !!v || 'El apellido es obligatorio']"
          label="Apellido"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="px-0">
        <v-text-field
          v-model="documentNumber"
          :rules="[(v) => !!v || 'El DNI es obligatorio']"
          label="DNI"
          placeholder=" "
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col v-if="imageUrl" cols="12" class="pb-0">
            <v-img :src="imageUrl"></v-img>
          </v-col>
          <v-col v-else>No se subió una imagen para este cliente.</v-col>
          <v-col cols="12" class="pb-0 mt-5">
            <v-file-input
              v-show="false"
              accept="image/png, image/jpeg, image/bmp"
              v-model="image"
              ref="file"
              label="File input"
              @change="uploadFile"
            ></v-file-input>

            <v-btn block color="grey-lighten-4" class="mb-3" @click="loadImage">
              <v-icon class="mr-1" size="medium">mdi mdi-camera</v-icon>
              <span v-if="(action == 'create' && !imageUrl) || !imageUrl"
                >Cargar imagen</span
              >
              <span v-else>Cambiar imagen</span>
            </v-btn>

            <v-btn
              block
              color="critical"
              class="mb-3"
              @click="deleteImage"
              :disabled="imageUrl == ''"
            >
              <v-icon class="mr-1" size="medium">mdi mdi-delete</v-icon>
              <span>Eliminar imagen</span>
            </v-btn>
          </v-col>
        </v-row>
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
import { storage } from "../../../plugins/firebase.js";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

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
      image: null,
      imageUrl: "",
      file: null,
    };
  },
  created() {
    if (this.action === "update" && this.clientSelected) {
      this.name = this.clientSelected.name;
      this.lastName = this.clientSelected.last_name;
      this.documentNumber = this.clientSelected.document_number;
      this.imageUrl = this.clientSelected.image;
    }
  },
  methods: {
    async onSave() {
      try {
        if (!(await this.$refs.formClient.validate())) return;

        if (this.image) await this.uploadFile(this.image);

        const data = {
          name: this.name,
          last_name: this.lastName,
          document_number: this.documentNumber,
          image: this.imageUrl,
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
    loadImage() {
      if (this.$refs.file) {
        this.$refs.file.$el.querySelector("input").click();
      }
    },
    deleteImage() {
      this.imageUrl = "";
    },
    async uploadFile(file) {
      try {
        if (file && file instanceof File) {
          const fileRef = storageRef(storage, `images/${file.name}`);
          await uploadBytes(fileRef, file);
          this.imageUrl = await getDownloadURL(fileRef);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    handleFileChange(file) {
      if (file && file instanceof File) {
        this.imageUrl = URL.createObjectURL(file);
      }
    },
  },
  watch: {
    image(newImage) {
      this.handleFileChange(newImage);
    },
  },
};
</script>
