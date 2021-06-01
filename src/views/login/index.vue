<template>
  <div class="login">
    <el-form ref="form" class="form" :model="form" :rules="rules">
      <el-form-item prop="account">
        <el-input v-model="form.account" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          type="password"
          @keyup.enter.native="onSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-button" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "../../util/require/index";

interface formType {
  account: string;
  password: string;
}

@Component
export default class Login extends Vue {
  form: formType = {
    account: "",
    password: "",
  };

  rules = {
    account: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  };

  onSubmit(): void {
    // eslint-disable-next-line
    let form = this.$refs.form as any;

    // eslint-disable-next-line
    form.validate((valid: any) => {
      if (valid) {
        let req = axios.post("/api/login", {
          account: this.form.account,
          password: this.form.password,
        });

        // eslint-disable-next-line
        req.then((res: any) => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);

            this.$router.push({ name: "Main" });
          } else if (res.data.errorMsg) {
            this.$message.error(res.data.errorMsg);
          }
        });
      }
    });
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: #2d3a4b;

  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    width: 448px;

    .submit-button {
      width: 100%;
    }
  }
}
</style>
