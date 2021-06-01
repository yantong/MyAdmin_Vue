import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/login/index.vue";
import NotFound from "../views/404/index.vue";
import Main from "../views/main/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogined = localStorage.getItem("token");

  if (!isLogined && to.name != "Login") {
    next({ path: "/Login" });
  }

  next();
});

export default router;
