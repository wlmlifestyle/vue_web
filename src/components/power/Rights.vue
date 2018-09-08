<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 表格 -->
      <el-table :data="rightList" height="500" border stripe style="width: 100%">
        <el-table-column label="#" type="index">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称">
        </el-table-column>
        <el-table-column label="路径" prop="path">
        </el-table-column>
        <el-table-column label="权限名称" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level==1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import mix from './Rights-mixins'
export default {
  mixins: [mix]
}
</script>
