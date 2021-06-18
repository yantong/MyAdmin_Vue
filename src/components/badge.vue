<template>
  <div class="badge">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="route in badges.length > 1
          ? badges.slice(0, badges.length - 1)
          : []"
        :to="{ name: getPath(route) }"
        :key="route.name"
      >
        {{ route.meta.text }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="badges.length">
        {{ badges[badges.length - 1].meta.text }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import mainRouter from "../router/mainRouter";
import { commonObject } from "../define/index";

@Component
export default class Badge extends Vue {
  routeConfigs: commonObject = {};
  badges: RouteConfig[] = [];
  currentTag = "";

  mounted(): void {
    mainRouter.forEach((item) => {
      this.getParentRoute(item, null);
    });
  }

  getParentRoute(route: RouteConfig, parent: RouteConfig | null): void {
    this.routeConfigs[route.name || ""] = {
      route,
      parent,
    };
    route.children?.forEach((item) => {
      this.getParentRoute(item, route);
    });
  }

  getBadges(name: string): void {
    let condition = true;
    let route = this.routeConfigs[name];

    this.badges = [];
    while (condition) {
      this.badges.unshift(route.route);
      if (!route.parent) break;

      route = this.routeConfigs[route.parent.name];
    }
  }

  getPath(route: RouteConfig): string | undefined {
    let condition = true;

    while (condition) {
      if (!route.children || !route.children.length) return route.name;

      route = route.children[0];
    }
  }

  @Watch("$route")
  onChildChanged(val: RouteConfig): void {
    this.currentTag = val.name || "";
    val.name && this.getBadges(val.name);
  }
}
</script>

<style lang="less" scoped>
.badge {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
