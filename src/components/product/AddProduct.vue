<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert closable title="消息提示的文案" type="info" center show-icon>
      </el-alert>
      <el-steps :active="activeName-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form label-position="top" :model="addProForm" :rules="addProFormRules" ref="addProFormRef" label-width="100px">
        <el-tabs :before-leave="beforeTabLeave" tab-position="left" v-model="activeName">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addProForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addProForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addProForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addProForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <!-- change-on-select 是否允许选择任意一级的选项 默认为false -->
              <el-cascader clearable change-on-select expand-trigger="hover" :props="props" :options="cateList" v-model="addProForm.goods_cat" @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item v-for="(item,i) in manyData" :key="i" :label="item.attr_name">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox border v-for="(item1,i) in item.attr_vals" :key="i" :label="item1"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="(item,i) in onlyData" :key="i" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload :on-success="handleSuccess" :headers="uploadHeaders" action="https://www.liulongbin.top:8888/api/private/v1/upload" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 商品描述组建 -->
            <!-- 用到的富文本编辑器 https://github.com/surmon-china/vue-quill-editor -->
            <!-- bidirectional data binding（双向数据绑定） -->
            <quill-editor v-model="addProForm.goods_introduce" ref="myQuillEditor">
            </quill-editor>
            <el-button class="addGoods" type="primary" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览弹出框 -->
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="50%">
      <img :src="previewImg" alt="" class="previewImg">
    </el-dialog>
  </div>
</template>
<script>
import mix from './AddProduct-mixins'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.el-steps {
  margin: 15px 0px;
}
.previewImg {
  width: 100%;
}
.addGoods {
  margin-top: 20px;
}
</style>
