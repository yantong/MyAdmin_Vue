<template>
  <div class="auth-create">
    <div class="item">
      <div class="left">名字</div>
      <div class="right">
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="left">权限</div>
      <div class="right">
        <el-tree
          :data="mainRouter"
          show-checkbox
          node-key="name"
          :default-checked-keys="[]"
          @check-change="checkChange"
        >
          <span class="custom-tree-node" slot-scope="{ data }">
            <div>
              <span>{{ data.meta.text }}</span>
              <el-checkbox-group
                v-if="data.meta.buttons && data.meta.buttons.length"
                v-model="data.meta.buttonsCheckList"
                class="buttons"
              >
                <el-checkbox
                  v-for="item in data.meta.buttons"
                  :key="item.permission"
                  :label="item.text"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import mainRouter from "../../../router/mainRouter";
import SelfButton from "../../../components/selfButton/selfButton.vue";
import buttons from "../../../components/selfButton/buttons";
import { AuthCreateType, userAuthData } from "../../../define/index";
import { RouteConfig } from "vue-router";

@Component({
  components: {
    SelfButton,
  },
})
export default class AuthCreate extends Vue implements AuthCreateType {
  mainRouter = JSON.parse(JSON.stringify(mainRouter));
  buttons = buttons;
  checkList = [];
  name = "";
  permission = {};

  created(): void {
    this.initMianRouter(this.mainRouter);
  }

  initMianRouter(menus: RouteConfig[]): void {
    for (const i in menus) {
      const element = menus[i];

      if (element.children) {
        this.initMianRouter(element.children);
      } else {
        this.$set(element.meta, "buttonsCheckList", []);
      }
    }

    return;
  }

  // eslint-disable-next-line
  // checkChange(data: any, isChecked: boolean,): void {
  //   let router = data.name;
  //   console.log(data, isChecked);
  // }

  getData(): userAuthData {
    console.log({
      name: this.name,
      permission: this.mainRouter,
    });

    return {
      name: this.name,
      permission: this.mainRouter,
    };
  }
}
</script>

<style lang="less" scoped>
.auth-create {
  height: 100%;
  padding: 10px;
  height: 40vh;

  .buttons {
    margin-left: 20px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 10px 0;

    .left {
      width: 80px;
    }

    .right {
      flex: 1;
      width: 0;
    }
  }
}

/deep/ .el-tree-node__content {
  height: auto !important;
  padding: 5px 0;
}
</style>
