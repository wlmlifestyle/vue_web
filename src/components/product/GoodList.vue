<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input clearable @keyup.enter.native="getGoodList"  @clear="getGoodList" placeholder="请输搜索入内容" v-model="queryInfo.query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getGoodList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="gotoAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="goodList" border style="width: 100%">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称">
        </el-table-column>
        <el-table-column prop="goods_price" width="110px" label="商品价格（元）" type="number">
        </el-table-column>
        <el-table-column prop="goods_weight" width="100px" label="商品重量" type="number">
        </el-table-column>
        <el-table-column prop="add_time" width="150px" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteGood(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import mix from './GoodList-mixins'
export default {
  mixins: [mix]
}
</script>
