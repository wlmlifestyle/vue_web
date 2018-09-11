<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-button type="primary" @click="showCateDialog">添加分类</el-button>
      <!-- index-text:指定数据索引名称 -->
      <!-- selection-type:是否为多选类型表格 默认为true -->
      <tree-table ref="table" :expand-type="false" index-text="#" :data="cateList" :columns="columns" stripe border show-index :tree-type="true" :selection-type="false">
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:#20b2aa"></i>
          <i class="el-icon-error" v-else style="color:#ce9178"></i>
        </template>
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
      </tree-table>
      <!-- layout="total, prev, pager, next, jumper"  没有sizes-->
      <el-pagination @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-size="queryInfo.pagesize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加分类弹出框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close="resetAddCateDialog">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader clearable expand-trigger="hover" :props="cascaderConfig" :options="parentCateList" v-model="selectedList" @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mix from './Categories-mixins'
export default {
  mixins: [mix]
}
</script>
