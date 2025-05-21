import { createRouter, createWebHistory } from "vue-router";

import createAPI from "../src/components/createAPI.vue";
import editAPI from "../src/components/editAPI.vue";
import IndexAPI from "../src/components/IndexAPI.vue";

const routes = [
  {
    path: "/create",
    name: "createAPI",
    component: createAPI,
  },
  {
    path: "/edit/:id",
    name: "editAPI",
    component: editAPI,
    props: true,
  },
  {
    path: "/home",
    name: "Home",
    component: IndexAPI,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
