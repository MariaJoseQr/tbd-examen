<template>
  <v-app>
    <v-app-bar color="primary">
      <v-btn
        :to="{ name: 'Home' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Inicio
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :to="{ name: 'Services' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Servicios
      </v-btn>
      <v-btn
        :to="{ name: 'Projects' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Proyectos
      </v-btn>
      <v-btn
        :to="{ name: 'Clients' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Clientes
      </v-btn>
      <v-btn
        :to="{ name: 'Blog' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Blog
      </v-btn>
      <v-btn
        :to="{ name: 'Contact' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Contacto
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        v-if="user"
        color="white"
        density="default"
        class="mr-2"
        @click="logout"
      >
        Cerrar sesión
      </v-btn>

      <v-btn
        v-else
        :to="{ name: 'Login' }"
        color="white"
        density="default"
        class="mr-2"
      >
        Iniciar sesión
      </v-btn>
    </v-app-bar>
    <v-main class="content-container">
      <router-view />
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import Footer from "./components/Footer.vue";
import { computed } from "vue";

export default {
  name: "App",
  components: {
    Footer,
  },
  setup() {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);

    const logout = () => {
      authStore.logout();
    };

    return {
      user,
      logout,
    };
  },
};
</script>
