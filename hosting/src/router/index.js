import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Services from "../views/Services.vue";
import Projects from "../views/Projects.vue";
import Clients from "../views/clients/Clients.vue";
import RegisterClient from "../views/clients/options/Register.vue";
import EditClient from "../views/clients/options/Edit.vue";
import Blog from "../views/Blog.vue";
import Contact from "../views/Contact.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/services/:param?",
    name: "Services",
    component: Services,
    props: true,
    beforeEnter: (to, from, next) => {
      const { param } = to.params;
      if (!param || /^[a-zA-Z]+$/.test(param)) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/projects/:param?",
    name: "Projects",
    component: Projects,
    props: true,
    beforeEnter: (to, from, next) => {
      const { param } = to.params;
      if (!param || /^[a-zA-Z]+$/.test(param)) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/clients/:param?",
    name: "Clients",
    component: Clients,
    props: true,
    beforeEnter: (to, from, next) => {
      const { param } = to.params;
      if (!param || /^[a-zA-Z]+$/.test(param)) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/clients/edit/:id",
    name: "EditClient",
    component: EditClient,
  },
  {
    path: "/clients/register",
    name: "RegisterClient",
    component: RegisterClient,
  },
  {
    path: "/blog/:param?",
    name: "Blog",
    component: Blog,
    props: true,
    beforeEnter: (to, from, next) => {
      const { param } = to.params;
      if (!param || /^[0-9]+$/.test(param)) {
        next();
      } else {
        next(false);
      }
    },
  },
  { path: "/contact", name: "Contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
