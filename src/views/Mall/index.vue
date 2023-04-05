<template>
  <div class="mall">
    <h1>我是商品管理界面</h1>
    <el-table :data="tableData" style="100%" height="90%">
      <el-table-column prop="defaultImg" label="图片" width="100%">
        <template slot-scope="scope">
          <el-image
            style="height: 80px"
            :src="scope.row.defaultImg"
            :fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Mall",
  data() {
    return {
      categoryList: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
      },
      tableData: [],
    };
  },
  mounted() {
    this.getSearchList();
  },
  methods: {
    getSearchList() {
      this.$store.dispatch("getGoodsInfo", this.categoryList);
      console.log(this.$store.getters.searchList);
      this.tableData = this.searchList;
    },
  },
  computed: {
    ...mapGetters({
      searchList: "searchList",
    }),
  },
};
</script>

<style>
.mall {
  height: 80%;
}
</style>