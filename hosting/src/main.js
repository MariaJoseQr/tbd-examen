/*import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

const app = createApp(App);
app.use(router).use(vuetify).mount("#app");
*/

// Importar estilos de Vuetify
import "vuetify/styles";

// Importar la función createVuetify de Vuetify
import { createVuetify } from "vuetify";

// Importar todos los componentes y directivas de Vuetify
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Importar funciones y componentes de Vue
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Crear la instancia de Vuetify con componentes y directivas
const vuetify = createVuetify({
  components,
  directives,
});

// Crear la aplicación Vue, utilizar el router y Vuetify, y montarla
createApp(App).use(router).use(vuetify).mount("#app");
