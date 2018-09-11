<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert :closable="false" title="注意:只允许为第三级分类设置相关属性!" type="warning">
      </el-alert>
      <div class="cascader">
        <span>选择商品分类:</span>
        <el-cascader :props="cascaderConfig" expand-trigger="hover" :options="cateList" v-model="selectedList" @change="handleChange">
        </el-cascader>
        <!-- 与选项卡 activeName 对应的标识符，表示选项卡别名 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="动态参数" name="many">
            <el-button type="primary" :disabled="isDisable" @click="addDialogVisible=true">添加参数</el-button>
            <el-table :data="manyTableData" border style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-form label-position="left">
                    <el-form-item>
                      <!-- <span>{{ scope.row }}</span> -->
                      <hr>
                      <el-tag @close="deleteTagInput(scope.row,i)" closable type="primary" v-for="(item,i) in scope.row.attr_vals" :key="i">{{item}}</el-tag>
                      <el-input ref="saveTagInput" @blur="loseBlur(scope.row)" @keyup.enter.native="loseBlur(scope.row)" type="mini" class="tagInput" v-if="scope.row.tagInputVisible" v-model="scope.row.tagInputValue"></el-input>
                      <el-button type="small" v-else @click="showTagInput(scope.row)">+New Tag</el-button>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="index" label="#">
              </el-table-column>
              <el-table-column prop="attr_name" label="参数名称">
              </el-table-column>
              <el-table-column label="操作" width="140px">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="静态属性" name="only">
            <el-button type="primary" :disabled="isDisable" @click="addDialogVisible=true">添加属性</el-button>
            <el-table :data="onlyTableData" border style="width: 100%">
              <el-table-column type="expand">
              </el-table-column>
              <el-table-column type="index" label="#">
              </el-table-column>
              <el-table-column prop="attr_name" label="参数名称">
              </el-table-column>
              <el-table-column label="操作" width="140px">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>

        <el-dialog @close="resetForm" :title="activeName==='many'?'添加动态参数':'添加静态属性'" :visible.sync="addDialogVisible" width="50%">

          <!-- 添加表单 -->
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
            <el-form-item :label="activeName==='many'?'动态参数':'静态属性'" prop="attr_name">
              <el-input v-model="addForm.attr_name" @keyup.enter.native="addParamsForm"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addParamsForm">确 定</el-button>
          </span>
        </el-dialog>
      </div>

    </el-card>
  </div>
</template>
<script>
import mix from './Params-mixins'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
.cascader {
  margin: 15px 0;
}
.el-tag {
  margin: 6px;
}
.tagInput {
  width: 100px;
  height: 16px;
}
</style>
