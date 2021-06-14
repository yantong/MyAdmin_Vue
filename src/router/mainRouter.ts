import AuthCreate from "../views/auth/create/index.vue";
import EmptyView from "../views/empty/index.vue";
import Main from "../views/main/page.vue";
import { RouteConfig } from "vue-router";
import buttons from "../components/selfButton/buttons";

const main: RouteConfig[] = [
  {
    path: "/main",
    name: "MainPage",
    meta: {
      text: "首页",
    },
    component: Main,
  },
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
          buttons: [
            buttons.ADD_USER_SUBMIT,
            buttons.SUBMIT,
            buttons.EDIT_USER_EDIT,
            buttons.EDIT_USER_DEL,
          ],
        },
        component: AuthCreate,
      },
    ],
  },
];
export default main;
