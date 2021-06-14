<template>
  <el-container class="main">
    <el-aside class="aside">
      <SideMenu v-if="menu" :menus="menu" />
    </el-aside>
    <el-container class="container">
      <el-header class="header">
        <div class="left"></div>
        <div class="right">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user-icon">
              <img :src="headerImg" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="route"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import { Vue, Component } from "vue-property-decorator";
import axios from "../../util/require";
import SideMenu from "../../components/menu.vue";
import mainRouter from "../../router/mainRouter";
import { RouteConfig } from "vue-router";
import { userRouter } from "../../define/index";
import store from "../../store/index";

@Component({
  components: {
    SideMenu,
  },
})
export default class Login extends Vue {
  headerImg = require("../../assets/user.png");
  menu: RouteConfig[] = [];
  routerPers: userRouter[] = [];

  created(): void {
    let req = axios.get("/api/getUserInfo");

    req.then((res: AxiosResponse) => {
      let router = JSON.parse(JSON.stringify(mainRouter));

      this.routerPers = res?.data?.info?.router || [];
      router.forEach((item: RouteConfig) => {
        this.getPermission(item);
      });
      this.menu = router;
      store.commit({
        type: "setRouterPers",
        routerPers: this.routerPers,
      });
    });
  }

  getPermission(router: RouteConfig): boolean {
    if (!router.children) {
      return (router.meta.permission = this.routerPers.some(
        (item) => item.router == router.name
      ));
    }

    return (
      (router.meta.permission = router.children?.some((item) => {
        return this.getPermission(item);
      })) || false
    );
  }

  handleCommand(command: string): void {
    if (command == "logout") {
      let req = axios.get("/api/logout");

      req.then((res: AxiosResponse) => {
        if (res.data.success) {
          localStorage.setItem("isLogined", "");

          this.$router.push({ name: "Login" });
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;

  .aside {
    background: #d3dce6;
    width: 210px !important;
  }

  .container {
    .header {
      background: #b3c0d1;

      display: flex;
      justify-content: space-between;

      .el-dropdown {
        height: 100%;
        .user-icon {
          cursor: pointer;

          height: 100%;
          display: flex;
          align-items: center;

          img {
            width: 50px;
            border-radius: 3px;
          }
        }
      }
    }

    .route {
      background: white;
      padding: 0;
    }
  }
}
</style>
