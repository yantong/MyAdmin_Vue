<template>
  <div class="route-tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name != 'MainPage'"
      class="el-tag--info"
      :class="{
        'el-tag--success': currentTag == tag.name,
      }"
      @click="click(index)"
      @close="close(index)"
    >
      {{ tag.meta.text }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import router from "../router";

@Component
export default class RouteTags extends Vue {
  tags: RouteConfig[] = [];
  currentTag = "";

  @Watch("$route")
  onChildChanged(val: RouteConfig): void {
    if (val.name && !this.tags.map((item) => item.name).includes(val.name)) {
      this.tags.push(val);
    }
    this.currentTag = val.name || "";
  }

  click(index: number): void {
    if (this.currentTag == this.tags[index].name) return;

    let name = this.tags[index].name;

    this.currentTag = name || "";
    router.push({ name });
  }

  close(index: number): void {
    let name = this.tags[index - 1].name;
    this.tags.splice(index, 1);

    this.currentTag = name || "";
    router.push({ name });
  }
}
</script>

<style lang="less" scoped>
.route-tags {
  border-bottom: 1px solid #d8dce5;
}
.el-tag {
  cursor: pointer;
  margin: 5px;
}
</style>
