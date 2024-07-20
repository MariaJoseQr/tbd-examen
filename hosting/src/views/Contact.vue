<template>
  <v-container class="my-4">
    <v-row class="justify-center">
      <v-col cols="12">
        <h1>Contacto</h1>
        <p>Bienvenido a la página de Contacto!</p>
        <v-divider class="my-4"></v-divider>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" class="pt-4">
                <v-text-field
                  v-model="name"
                  :rules="[(v) => !!v || 'Este campo es obligatorio']"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-text-field
                  v-model="subject"
                  :rules="[(v) => !!v || 'Este campo es obligatorio']"
                  label="Asunto"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-text-field
                  v-model="email"
                  :rules="[
                    (v) => !!v || 'Este campo es obligatorio',
                    (v) => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
                  ]"
                  label="Correo Electrónico"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-textarea v-model="message" label="Mensaje"></v-textarea>
              </v-col>
            </v-row>
            <v-row class="justify-end pr-4 pb-4 pt-0">
              <v-btn :disabled="!valid" color="primary" @click="submit">
                Enviar
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
        <flash-message
          :message="flashMessage"
          :type="flashType"
        ></flash-message>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import FlashMessage from "../components/FlashMessage.vue";

export default {
  name: "Contact",
  components: {
    FlashMessage,
  },
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      valid: false,
      flashMessage: "",
      flashType: null,
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post(
            "http://localhost:3000/send-email",
            {
              name: this.name,
              email: this.email,
              subject: this.subject,
              message: this.message,
            }
          );

          this.flashMessage = response.data.flashMessage;
          this.flashType = "success";
          this.resetFlashMessage();
          this.resetForm();
        } catch (error) {
          this.flashMessage = "Error al registrar el formulario";
          this.flashType = "error";
          this.resetFlashMessage();
        }
      }
    },

    resetFlashMessage() {
      setTimeout(() => {
        this.flashMessage = "";
      }, 5000);
    },
    resetForm() {
      setTimeout(() => {
        this.$refs.form.reset();
      }, 2000);
    },
  },
};
</script>
