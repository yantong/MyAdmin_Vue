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
  {
    path: "/route1",
    name: "route1",
    meta: {
      text: "路由嵌套",
    },
    component: EmptyView,
    children: [
      {
        path: "/route2-1",
        name: "route2-1",
        meta: {
          text: "路由嵌套2-1",
        },
        component: EmptyView,
      },
      {
        path: "/route2-2",
        name: "route2-2",
        meta: {
          text: "路由嵌套2-2",
        },
        component: EmptyView,
        children: [
          {
            path: "/route3-1",
            name: "route3-1",
            meta: {
              text: "路由嵌套3-1",
            },
            component: EmptyView,
          },
          {
            path: "/route3-2",
            name: "route3-2",
            meta: {
              text: "路由嵌套3-2",
            },
            component: EmptyView,
            children: [
              {
                path: "/route4-1",
                name: "route4-1",
                meta: {
                  text: "路由嵌套4-1",
                },
                component: EmptyView,
              },
            ],
          },
        ],
      },
    ],
  },
];
export default main;
