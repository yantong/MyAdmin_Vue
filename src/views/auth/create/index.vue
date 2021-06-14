<template>
  <div class="auth">
    <SelfButton
      :permission="buttons.ADD_USER_SUBMIT"
      @click="
        dialogVisible = true;
        selUserNmae = '';
        selUserRouter = [];
      "
    />

    <el-table :data="tableData" style="width: 400px">
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <SelfButton
            :permission="buttons.EDIT_USER_EDIT"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <SelfButton
            :permission="buttons.EDIT_USER_DEL"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%">
      <AuthCreate
        v-if="dialogVisible"
        ref="authCreate"
        :userName="selUserNmae"
        :userRouters="selUserRouter"
      />
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
import { userAuthData, commonObject } from "../../../define/index";
import { AxiosResponse } from "axios";
import axios from "../../../util/require";

@Component({
  components: {
    SelfButton,
    AuthCreate,
  },
})
export default class Auth extends Vue {
  buttons = buttons;
  dialogVisible = false;
  tableData = [];
  selUserNmae = "";
  selUserRouter = [];
  isEdit = false;
  selAccount = "";

  created(): void {
    this.getUsers();
  }

  // eslint-disable-next-line
  handleEdit(index: number, data: any): void {
    this.isEdit = true;
    this.dialogVisible = true;
    this.selAccount = data.user.account;
    this.selUserNmae = data.user.name;
    this.selUserRouter = data.router;

    return;
  }

  // eslint-disable-next-line
  handleDelete(index: number, data: any): void {
    this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        let req = axios.delete("/api/deleteUser", {
          data: {
            account: data.user.account,
          },
        });

        req.then((res: AxiosResponse) => {
          if (res.data.success) {
            this.getUsers();

            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
  }

  getUsers(): void {
    let req = axios.get("/api/getUsers");

    req.then((res: AxiosResponse) => {
      this.tableData = res.data.users;
    });
  }

  getAuth(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let authCreate: any = this.$refs.authCreate;

    let data: userAuthData = authCreate.getData();
    let permission: commonObject = {};
    data.permission.forEach((item) => {
      item.name &&
        (permission[item.name] = item.meta?.buttonsCheckList.join(","));
    });

    let req = axios.post(this.isEdit ? "/api/editUser" : "/api/addUser", {
      account: this.selAccount,
      name: data.name,
      permission,
    });

    req.then((res: AxiosResponse) => {
      if (res.data.success) {
        this.getUsers();

        this.isEdit
          ? this.$message.success("修改用户成功！")
          : this.$message.success("添加用户成功！");
        this.dialogVisible = false;
        this.isEdit = false;
      } else if (res.data.errorMsg) {
        this.$message.error(res.data.errorMsg);
      }
    });
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
