<template>
  <div class="auth">
    <SelfButton
      :permission="buttons.ADD_USER_SUBMIT"
      @click="dialogVisible = true"
    />

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%">
      <AuthCreate ref="authCreate" />
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <SelfButton
          type="primary"
          @click="getAuth"
          :permission="buttons.SUBMIT"
        />
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SelfButton from "../../../components/selfButton/selfButton.vue";
import buttons from "../../../components/selfButton/buttons";
import AuthCreate from "./userAuth.vue";

@Component({
  components: {
    SelfButton,
    AuthCreate,
  },
})
export default class Auth extends Vue {
  buttons = buttons;
  dialogVisible = false;

  getAuth(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let authCreate: any = this.$refs.authCreate;

    authCreate.getData();
  }
}
</script>

<style lang="less" scoped>
.auth {
  height: 100%;
  padding: 10px;

  .buttons {
    margin-left: 20px;
  }
}
</style>
