<template>
  <div class="login">
    <el-form class="form" :model="form">
      <el-form-item>
        <el-input v-model="form.account" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          placeholder="密码"
          type="password"
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

interface formType {
  account: string;
  password: string;
}

interface dataType {
  form: formType;
}

export default {
  data(): dataType {
    return {
      form: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(): void {
      let req = axios.post("/api/login", {
        account: 'admin',
        password: 'admin',
      });

      req.then((res) => {
        console.log("res = ", res);
      });
    },
  },
};
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
