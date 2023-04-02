<template>
  <div>
    <!-- <h3>我是Home</h3> -->
    <el-row>
      <!-- 左侧 -->
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
          <!-- 管理员头像和登录地址 -->
          <div class="user">
            <img src="../../assets/images/boy.jpeg" alt="" />
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录的时间：<span>2023-04-1</span></p>
            <p>上次登录的地点: <span>南阳市</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 460px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="课程"> </el-table-column>
            <el-table-column prop="todayBuy" label="今日购买">
            </el-table-column>
            <el-table-column prop="monthBuy" label="本月购买">
            </el-table-column>
            <el-table-column prop="totalBuy" label="总购买"> </el-table-column>
          </el-table>
          <!-- <el-table-column
            v-for="(val, key) in tableLabel"
            :key="eky"
            :prop="key"
            :label="val"
          /> -->
        </el-card>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="16" style="padding-left: 10px">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
              <p></p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height: 280px">
          折线图
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <!-- 柱状图和饼图 -->
        <div class="graph">
          <el-card style="height: 260px">
            柱状图
            <div ref="echart2" style="height:260px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div ref="echarts3" style="height:240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "@/api";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        todayBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      console.log(data);
      this.tableData = tableData;

      //获取dom，初始化echarts
      const echarts1 = echarts.init(this.$refs.echarts1);
      //指定图表的配置项和数据
      var echarts1option = {};
      const { orderData,userData,videoData } = data.data;
      // const xAxis = Object.keys(orderData.data[0]);
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts1option.xAxis = xAxisData;
      echarts1option.yAxis = {};
      // 标题legend
      echarts1option.legend = xAxisData;
      echarts1option.series = [];
      echarts1option.tooltip = [];
      const xAxis2 = orderData.date;
      console.log(xAxis2);
      xAxis.forEach((key) => {
        echarts1option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
        // echarts1option.series = []
      });
      // xAxis2.forEach(key =>{
      //   echarts1option.series.push({
      //     data:key,
      //     type:'line'
      //   })
      // })
      // echarts1option.series = ['1','2','3','4','5','6']
      console.log(echarts1option);
      echarts1.setOption(echarts1option);

      //柱状图
      const echarts2 = echarts.init(this.$refs.echart2);
      const echarts2option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name:'新增用户',
            data:userData.map(item => item.new),
            type:'bar'
          },
          {
            name:'活跃用户',
            data:userData.map(item => item.active),
            type:'bar'
          }
        ],
      };
      echarts2.setOption(echarts2option)

      //饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3option = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data:videoData,
              type:'pie'
            }
          
          ],

      }
      echarts3.setOption(echarts3option)
    });

  },
};
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  // justify-content: space-around;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userInfo {
    p {
      line-height: 28px;
      font-size: 14px;
      color: red;
    }
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 80px;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>