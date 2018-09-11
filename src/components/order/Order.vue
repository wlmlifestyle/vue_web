<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入搜索内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="orderList" border stripe style="width: 100%">
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格">
        </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status==='0'">未付款</el-tag>
            <el-tag type="success" v-if="scope.row.pay_status==='1'">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货">
        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{scope.row.create_time|dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button @click="editAddress" type="primary" size="mini" icon="el-icon-edit" title="修改订单地址"></el-button>
            <el-button type="success" size="mini" icon="el-icon-location" title="物流信息" @click="showDialogWL"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="查看物流进度" :visible.sync="wlDialogVisible" width="50%">
      <el-steps direction="vertical" :active="0">
        <el-step v-for="(item,i) in wlList" :key="i" :title="item.time" :description="item.context"></el-step>
      </el-steps>
    </el-dialog>

    <el-dialog title="修改地址" :visible.sync="editAddDialogVisible" width="50%">
      <el-form :model="editAddressForm" :rules="editAddressFormRules" ref="editAddressFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="省市区/县" prop="name" >
          <el-cascader :options="cityOptions" style="width:100%" :value="city" @change="changeProvince" change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="editAddressForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAddDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import mix from './Order-mixins'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
</style>
