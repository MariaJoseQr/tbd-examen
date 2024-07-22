<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" md="4" offset-md="4">
        <v-row>
          <v-col cols="12">
            <h1 class="text-primary">Iniciar sesión</h1>
          </v-col>

          <v-col cols="12">
            <v-form ref="formLogin">
              <v-text-field
                v-model="email"
                label="Correo electrónico"
                :rules="[
                  (v) => !!v || 'Campo obligatorio',
                  (v) =>
                    (!!v && /^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) ||
                    'Correo inválido',
                ]"
                @keyup.enter="onLogin"
              ></v-text-field>

              <v-text-field
                v-model="password"
                type="password"
                label="Contraseña"
                :rules="[(v) => !!v || 'Campo obligatorio']"
                @keyup.enter="onLogin"
              ></v-text-field>

              <v-alert
                v-if="errorMessage"
                type="error"
                :text="errorMessage"
                variant="tonal"
                class="my-2"
              ></v-alert>

              <v-btn :loading="loading" color="primary" block @click="onLogin">
                Iniciar sesión
              </v-btn>
            </v-form>
          </v-col>

          <v-col cols="12" class="d-flex justify-center">
            <p class="mr-2">¿No tienes una cuenta?</p>

            <router-link :to="{ name: 'Register' }" style="color: #551a8b"
              >Registrarme</router-link
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

const email = ref("");
const password = ref("");
let loading = ref(false);
let errorMessage = ref(null);
let formLogin = ref(null);

async function onLogin() {
  try {
    loading.value = true;
    errorMessage.value = null;

    const { valid } = await formLogin.value.validate();
    if (!valid)
      throw new Error(
        "El formulario contiene campos incompletos o inválidos. Revise y vuelva a intentar"
      );

    await authStore.login({
      email: email.value,
      password: password.value,
    });

    router.push({ name: "Home" });
  } catch (error) {
    console.error(error);
    errorMessage.value =
      error.message || "Ocurrió un problema al iniciar sesión";
  } finally {
    loading.value = false;
  }
}
</script>
