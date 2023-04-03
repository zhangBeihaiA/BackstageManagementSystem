<template>
  <div class="manage">
    <!-- 弹出框 -->
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birth"
            style="width: 100%"
            value-format="yyyy-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd()"> + 新增 </el-button>
      <!-- <el-form>搜索区</el-form> -->
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" height="90%" style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.sex == 1 ? "男" : "女"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="birth" label="出生日期"> </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column label="管理">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUser, addUser, editUser,deleteUser } from "@/api";
export default {
  name: "User",
  mounted() {
    this.getList();
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请输入性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modelType: 0, // 0表示新增 1表示编辑
    };
  },
  methods: {
    //提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType == 0) {
            //新增
            // this.$refs.form.resetFields();
            addUser(this.form).then(() => {
              //重新获取列表接口
              this.getList();
            });
          } else {
            //编辑
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          //后续对表单数据的处理
          // console.log(this.$refs.form);
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
          
        
      });
    },
    //获取列表数据
    getList() {
      getUser().then((data) => {
        console.log(data.data.list);
        this.tableData = data.data.list;
      });
    },
    //
    handleClose() {
      // console.log(this.form);
      this.$refs.form.resetFields(); //对整个表单进行重置
      this.dialogVisible = false; //关闭弹窗
    },
    //点击取消按钮
    cancel() {
      this.handleClose();
    },
    //编辑用户
    handleEdit(row) {
      console.log(row);
      this.modelType = 1;
      this.dialogVisible = true;
      //深拷贝>>>>>>>>>>>>>>>>当前行数据
      this.form = JSON.parse(JSON.stringify(row));
    },
    //删除用户
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser({id:row.id}).then(()=>{
            this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList()
          })
          
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    
    //点击新增
    handleAdd() {
      // this.$refs.form.resetFields();
      this.modelType = 0;
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
.manage{
  height: 90%;
}
</style>