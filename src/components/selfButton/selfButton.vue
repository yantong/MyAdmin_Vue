<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator";
import { VNode } from "vue";
import { buttonPermission } from "../../define/index";
import store from "../../store/index";

@Component
export default class SelfButton extends Vue {
  @Prop() readonly permission!: buttonPermission;

  render(): VNode | VNode[] | undefined | null {
    let buttons = store.state.routerPers.filter(
      (item) => item.router == this.$route.name
    );
    let isPermission = buttons[0]?.buttons
      .split(",")
      .includes(this.permission.permission);

    return isPermission ? (
      this.$slots.default ? (
        this.$slots.default
      ) : (
        <el-button {...{ props: this.$attrs, on: this.$listeners }}>
          {this.permission.text}
        </el-button>
      )
    ) : null;
  }
}
</script>

<style lang="less" scoped></style>
