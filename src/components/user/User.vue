<template>
  <div>
    <!-- //面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- v-model="input5" -->
      <!-- 搜索添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input clearable placeholder="请输入搜索内容" v-model="query" @clear="getUsers">
            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userlist.users" border stripe style="width: 100%">
        <el-table-column label="#" width="40" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column prop="role_name" label="状态">
          <template slot-scope="scope">
            <el-switch @change="stateChanged(scope.row.id,scope.row.mg_state)" v-model="scope.row.mg_state" active-color="#409eff" inactive-color="#eaecf0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190px">
          <template slot-scope="scope">
            <el-button size="mini" @click="getUserById(scope.row.id)" type="primary" icon="el-icon-edit"></el-button>
            <el-button size="mini" @click="delUserById(scope.row.id)" type="danger" icon="el-icon-delete"></el-button>
            <el-tooltip :enterable="false" class="item" effect="dark" content="分配角色" placement="top">
              <el-button size="mini" type="warning" icon="el-icon-setting" @click="setRoles(scope.row)"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="pagesizes" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="userlist.total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog @close="closeForm" title="添加用户" :visible.sync="addDialogVisible" width="50%">
      <!-- 添加表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="ruleFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%">
      <!-- 修改表单 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditForm">取 消</el-button>
        <el-button type="primary" @click="updataForm(editForm.id)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" @close="closeSetRole" :visible.sync="setRoleDialogVisible" width="50%">
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>分配新角色:
          <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
          <el-select v-model="selectorId" placeholder="请选择新角色">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="setRoleConfirm(userInfo.id,selectorId)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import mix from './User-mixins'
export default {
  mixins: [mix]
}
</script>
