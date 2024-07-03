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
                  :rules="isRequired"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-text-field
                  v-model="subject"
                  :rules="isRequired"
                  label="Asunto"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-text-field
                  v-model="email"
                  :rules="[isRequired, ...emailRules]"
                  label="Correo Electrónico"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-textarea
                  v-model="message"
                  label="Mensaje"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row class="justify-end pr-4 pb-4 pt-0">
              <v-btn :disabled="!valid" color="primary" @click="submit">
                Enviar
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Contact",
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      valid: false,
      isRequired: [(v) => !!v || "Este campo es obligatorio"],
      emailRules: [(v) => /.+@.+\..+/.test(v) || "El correo debe ser válido"],
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
          alert(response.data);
          this.$refs.form.reset();
        } catch (error) {
          alert("Error al enviar el correo");
        }
      }
    },
  },
};
</script>
