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
        <commonTag/>
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
import commonTag from "@/components/commonTag.vue";
export default {
  name: "Main",
  components: { CommonAside,CommonHeader,commonTag },
};
</script>

<style lang="less" scoped>
.el-header{
    padding:0;
}
</style>