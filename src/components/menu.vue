<script lang="tsx">
import { VNode } from "vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import router from "../router";
import { RouteConfig } from "vue-router";

@Component
export default class SideMenu extends Vue {
  @Prop({ default: () => [] }) readonly menus!: RouteConfig[];

  getDefaultIndex(menus: RouteConfig[]): string | undefined {
    let index = undefined;

    for (const i in this.menus) {
      const element = menus[i];

      if (element.children) {
        index = this.getDefaultIndex(element.children);
      } else {
        index = element.meta?.permission ? element.name : "";
      }

      if (index) {
        router
          .push({
            name: index,
          })
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .catch(() => {});

        break;
      }
    }

    return index;
  }

  getItem(data: RouteConfig): VNode | null {
    if (data.children?.length) {
      return data.meta?.permission ? (
        <el-submenu index={data.name}>
          <template slot="title">
            <span>{data.meta.text}</span>
          </template>
          <el-menu-item-group>
            {data.children.map((item) => this.getItem(item))}
          </el-menu-item-group>
        </el-submenu>
      ) : null;
    } else {
      return data.meta?.permission ? (
        <el-menu-item index={data.name} route={data}>
          <span slot="title">{data.meta.text}</span>
        </el-menu-item>
      ) : null;
    }
  }

  render(): VNode {
    return (
      <el-menu router={true} default-active={this.getDefaultIndex(this.menus)}>
        {this.menus.map((item) => this.getItem(item))}
      </el-menu>
    );
  }
}
</script>

<style lang="less" scoped></style>
