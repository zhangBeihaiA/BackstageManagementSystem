<template>
  <div class="mall">
    <el-table :data="tableData" height="90%">
      <el-table-column
        prop="defaultImg"
        label="图片"
        width="100%"
        align="center"
      >
        <template slot-scope="scope">
          <el-image style="height: 80px" :src="scope.row.defaultImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center">
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      layout="->,prev,pager,next"
      :total="totalPage"
      @current-change="handlePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { mapState } from "vuex";
export default {
  name: "Mall",
  data() {
    return {
      categoryList: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        pageNo: 1,
        pageSize: 5,
      },
      tableData: [],
      totalPage: 0,
    };
  },
  created() {
    this.getSearchList();
  },
  methods: {
    getSearchList() {
      this.$store.dispatch("getGoodsInfo", this.categoryList);
      // console.log(this.$store.getters.searchList);
      // this.tableData = this.searchList;
      // this.totalPage = this.total || 0;
    this.tableData = JSON.parse(sessionStorage.getItem('goodsList'))
    this.totalPage = JSON.parse(sessionStorage.getItem('total'))
      
    },
    //改变页码
    handlePage(currentPage) {
      this.categoryList.pageNo = currentPage;
      this.getSearchList();
      console.log("切换页码",currentPage)
    },
  },
  // computed: {
  //   ...mapGetters({
  //     searchList: "searchList",
  //   }),
  //   ...mapGetters({
  //     total: "total",
  //   }),
  // },
};
</script>

<style lang="less" scoped>
.mall {
  height: 90%;
}
</style>