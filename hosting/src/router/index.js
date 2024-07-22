import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Home from "../views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Services from "../views/Services.vue";
import Projects from "../views/Projects.vue";
import Clients from "../views/clients/Clients.vue";
import RegisterClient from "../views/clients/options/Register.vue";
import EditClient from "../views/clients/options/Edit.vue";
import Blog from "../views/Blog.vue";
import Contact from "../views/Contact.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/services",
    name: "Services",
    component: Services,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/clients/edit/:id",
    name: "EditClient",
    component: EditClient,
    meta: { requiresAuth: true },
  },
  {
    path: "/clients/register",
    name: "RegisterClient",
    component: RegisterClient,
    meta: { requiresAuth: true },
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  { path: "/contact", name: "Contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.user;

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
