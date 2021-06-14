import { RouteConfig } from "vue-router";

export interface userRouter {
  router: string;
  buttons: string;
}
export interface buttonPermission {
  text: string;
  permission: string;
}

export interface storeSate {
  routerPers: userRouter[];
}

export interface userAuthData {
  name: string;
  permission: RouteConfig[];
}

export interface AuthCreateType {
  getData(): userAuthData;
}

export interface commonObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
