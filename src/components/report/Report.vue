<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div ref="main" style="width: 900px;height:500px;"></div>
    </el-card>
  </div>
</template>
<script>
import mix from './Report-mixins'
export default {
  mixins: [mix]
}
</script>
