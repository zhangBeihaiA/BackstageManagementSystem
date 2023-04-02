<template>
  <div>
    <el-container>
      <el-aside width="auto"> 
        <CommonAside/>
      </el-aside>
      <el-container>
        <el-header>
            <common-header/>
        </el-header>
        <el-main>
          <!-- 子路由的路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../../components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: "Main",
  components: { CommonAside,CommonHeader },
};
</script>

<style lang="less" scoped>
.el-header{
    padding:0;
}
</style>