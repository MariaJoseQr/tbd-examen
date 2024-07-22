<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" md="4" offset-md="4">
        <v-row>
          <v-col cols="12">
            <h1 class="text-primary">Registrarse</h1>
          </v-col>

          <v-col cols="12">
            <v-form ref="formRegister">
              <v-text-field
                v-model="name"
                label="Nombre"
                :rules="[(v) => !!v || 'Campo obligatorio']"
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Correo electrónico"
                :rules="[
                  (v) => !!v || 'Campo obligatorio',
                  (v) =>
                    (!!v && /^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) ||
                    'Correo inválido',
                ]"
              ></v-text-field>

              <v-text-field
                v-model="password"
                type="password"
                label="Contraseña"
                :rules="[(v) => !!v || 'Campo obligatorio']"
              ></v-text-field>

              <v-alert
                v-if="errorMessage"
                type="error"
                :text="errorMessage"
                variant="tonal"
                class="my-2"
              ></v-alert>

              <v-btn
                :loading="loading"
                color="primary"
                block
                @click="onRegister"
              >
                Crear cuenta
              </v-btn>
            </v-form>
          </v-col>

          <v-col cols="12" class="d-flex justify-center">
            <p class="mr-2">¿Ya tienes una cuenta?</p>

            <router-link :to="{ name: 'Login' }" style="color: #551a8b"
              >Iniciar sesión</router-link
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
let loading = ref(false);
let errorMessage = ref(null);
const formRegister = ref(null);

async function onRegister() {
  try {
    loading.value = true;

    const { valid } = await formRegister.value.validate();
    if (!valid)
      throw new Error(
        "El formulario contiene campos incompletos o inválidos. Revise y vuelva a intentar"
      );

    await authStore.register({
      email: email.value,
      password: password.value,
      name: name.value,
    });

    router.push({ name: "Home" });
  } catch (error) {
    console.error(error);
    errorMessage.value = error.message || "Ocurrió un problema al registrarse";
  } finally {
    loading.value = false;
  }
}
</script>
