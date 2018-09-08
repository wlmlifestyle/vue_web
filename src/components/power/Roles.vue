<template>
  <div>
    <!-- 面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-button type="primary">添加角色</el-button>
      <el-table :data="roleList" border stripe style="width: 100%">
        <!-- 展开行 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row style="" :gutter="20" v-for="(item1,i1) in scope.row.children" :key="item1.id" :style="{'border-bottom':'1px solid #eee','border-top':i1===0 ? '1px solid #eee':''}">
              <el-col :span="5">
                <el-tag closable @close="removeRight(scope.row,item1.id)">
                  {{item1.authName}}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :style="{'border-top':i2===0?'':'1px solid #eee'}">
                  <el-col :span="6">
                    <el-tag closable type="success" @close="removeRight(scope.row,item2.id)">
                      {{item2.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" closable v-for="item3 in item2.children" :key="item3.id" @close="removeRight(scope.row,item3.id)">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限的弹出框 -->
    <el-dialog title="分配权限" :visible.sync="rightDialogVisible" width="50%" @close="resetRoleForm">
      <el-tree ref="tree" :data="rightTree" show-checkbox node-key="id" default-expand-all :default-checked-keys="defaultChecKeys" :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mix from './Roles-mixins'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 10px 5px;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>
