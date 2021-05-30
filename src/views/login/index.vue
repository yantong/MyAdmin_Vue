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
import axios from "axios";
import { Vue, Component } from "vue-property-decorator";

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
    let form = this.$refs.form as any;

    form.validate((valid: any) => {
      if (valid) {
        let req = axios.post("/api/login", {
          account: this.form.account,
          password: this.form.password,
        });

        req.then((res) => {
          if (res.data.success) {
            localStorage.setItem("isLogined", "true");

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
