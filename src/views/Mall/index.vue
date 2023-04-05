<template>
  <div class="mall">
    <el-table :data="tableData" style="100%" height="90%" cell-style="{text-align:center}">
      <el-table-column  prop="defaultImg" label="图片" width="100%" align="center">
        <template slot-scope="scope">
          <el-image
            style="height: 80px"
            :src="scope.row.defaultImg"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" align="center" > </el-table-column>
      <el-table-column prop="price" label="价格" align="center"> </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
          layout="->,prev,pager,next"
          :total="totalPage"
          size="5"
          @current-change="handlePage"
        >
        </el-pagination>
  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
export default {
  name: "Mall",
  data() {
    return {
      categoryList: {
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",
        "pageNo":1,
        "pageSize": 5,
      },
      tableData: [],
      totalPage:0
    };
  },

  mounted() {
    this.getSearchList();
    this.tableData = this.searchList;
    console.log(this.searchList)
    console.log(this.tableData)
    
  },
  methods: {
    getSearchList() {
      this.$store.dispatch("getGoodsInfo", this.categoryList);
        // console.log(this.$store.getters.searchList);
      this.totalPage = this.total
      
      
    },
    //改变页码
    handlePage(currentPage){
      this.categoryList.pageNo = currentPage
      this.getSearchList()
    }
  },
  computed: {
    ...mapGetters({
      searchList: "searchList",
    }),
    ...mapState({
      total: state=>state.mall.searchList.total
    }),


  },
};
</script>

<style lang="less" scoped>
.mall {
  height: 90%;
}
</style>