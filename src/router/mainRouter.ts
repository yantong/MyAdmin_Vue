import AuthCreate from "../views/auth/create/index.vue";
import EmptyView from "../views/empty/index.vue";

const main = [
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
          permission: true,
        },
        component: AuthCreate,
      },
    ],
  },
];
export default main;
