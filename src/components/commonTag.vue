<template>
  <div class="tabs">
    <el-tag
      v-for="item in tags"
      :key="item.path"
      :effect="$route.name==item.name ? 'dark' : 'plain'"
      :closable="item.name!=='home'"

    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'CommonTag',
    data() {
        return {
        items: [
            { type: "", label: "标签一" },
            { type: "success", label: "标签二" },
            { type: "info", label: "标签三" },
            { type: "danger", label: "标签四" },
            { type: "warning", label: "标签五" },
        ],
        };
    },
    computed:{
        //返回的是一个对象，使用扩展运算符
        ...mapState({
            tags:state=>state.tab.tabList
        })
    },
    mounted(){
        console.log(this.tags)
    }
};
</script>

<style>
</style>