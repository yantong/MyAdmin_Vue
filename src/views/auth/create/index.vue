<template>
  <div class="auth-create">
    <el-tree :data="mainRouter" show-checkbox>
      <span class="custom-tree-node" slot-scope="{ data }">
        <span>{{ data.meta.text }}</span>
      </span>
    </el-tree>
    <el-button>确认</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import mainRouter from "../../../router/mainRouter";

@Component
export default class AuthCreate extends Vue {
  mainRouter = mainRouter;
}
</script>

<style lang="less" scoped>
.auth-create {
  height: 100%;
  background: white;
  padding: 10px;
}
</style>
