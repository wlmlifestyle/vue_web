<template>
  <div>
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
          <el-switch v-model="scope.row.mg_state" active-color="#409eff" inactive-color="#eaecf0">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" ></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" ></el-button>
          <el-button size="mini" type="warning" icon="el-icon-setting" ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import mix from './User-mixins'
export default {
  mixins: [mix]
}
</script>
