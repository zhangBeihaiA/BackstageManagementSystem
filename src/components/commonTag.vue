<template>
  <div class="tabs">
    <el-tag
      v-for="(item,index) in tags"
      :key="item.path"
      :effect="$route.name==item.name ? 'dark' : 'plain'"
      :closable="item.name!=='home'"
      @click="changeMenu(item)"
      @close="handleClose(item,index)"
      size="small"

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
    methods:{
        // 点击tag跳转的功能
        changeMenu(item){
            if(item.name !==this.$route.name){
                this.$router.push({
                name:item.name
            })
            }
            
        },
        //关闭当前tag
        handleClose(item,index){
            this.$store.commit('closeTag',item)
            const length = this.tags.length
            //删除之后的跳转逻辑
            //删除的不是已激活的标签
            if(this.$route.name !== item.name){
                return
            }
            //删除的是最后一项
            if(index == length){
                this.$router.push({
                    name:this.tags[index-1].name
                })
            } else{
                //删除的是中间的
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
};
</script>

<style lang="less" scoped>
    .tabs{
        padding: 20px;
        .el-tag{
            margin-right: 15px;
            //鼠标经过有小手样式
            cursor: pointer;
        }
    }
</style>