import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/login/index.vue";
import NotFound from "../views/404/index.vue";
import Main from "../views/main/index.vue";
import mainRouter from "./mainRouter";
import store from "../store/index";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Main",
    meta: {
      text: "首页",
    },
    component: Main,
    children: mainRouter,
  },
  {
    path: "/Login",
    name: "Login",
    meta: {
      text: "登录",
    },
    component: Login,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    meta: {
      text: "404",
    },
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogined = localStorage.getItem("token");
  const allow = store.state.routerPers.some((item) => item.router == to.name);

  if (!isLogined && to.name != "Login") {
    next({ path: "/Login" });
  } else if (isLogined && !allow && to.name != "Main") {
    next({ path: "/" });
  }

  next();
});

export default router;
