import AuthCreate from "../views/auth/create/index.vue";
import EmptyView from "../views/empty/index.vue";
import { RouteConfig } from "vue-router";

const main: RouteConfig[] = [
  {
    path: "/Auth",
    name: "Auth",
    meta: {
      text: "权限",
    },
    component: EmptyView,
    children: [
      {
        path: "/AuthCreater",
        name: "AuthCreater",
        meta: {
          text: "权限创建",
        },
        component: AuthCreate,
      },
    ],
  },
];
export default main;
