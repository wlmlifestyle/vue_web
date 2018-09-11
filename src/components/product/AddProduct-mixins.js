import _ from 'lodash'
export default {
  data() {
    return {
      cateList: [],
      manyData: [],
      onlyData: [],
      // 图片预览弹出框 默认为false
      dialogVisible: false,
      previewImg: '',
      // 被选中的数组

      uploadHeaders: {
        Authorization: window.sessionStorage.getItem('token')
      },
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      activeName: '0',
      addProForm: {
        // 商品名称
        goods_name: '',
        // 商品价格
        goods_price: '',
        // 商品重量
        goods_weight: '',
        // 商品数量
        goods_number: '',
        // 商品分类
        goods_cat: [],
        // 上传的图片临时路径（对象）
        pics: [],
        // 介绍
        goods_introduce: '',
        attrs: []
      },
      addProFormRules: {
        goods_name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        goods_price: [{ required: true, message: '商品价格不能为空', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '商品重量不能为空', trigger: 'blur' }],
        goods_number: [{ required: true, message: '商品数量不能为空', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类列表信息
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.cateList = res.data
      // console.log(this.addProForm.goods_cat)
    },
    // 当分类列表被改变的时候
    handleChange() {
      // console.log(this.selectedOptions)
      // 当长度不为3的时候 直接让数组为[]
      if (this.addProForm.goods_cat.length !== 3) {
        this.addProForm.goods_cat = []
      } else {
        // 长度为3 选中了三级分类
      }
    },
    // 在离开这个tab之前触发的函数
    beforeTabLeave(newPanel, oldPanel) {
      // 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。
      // 将要离开第一个面板同时选中的不是三级 不让切换到其他面板
      if (oldPanel === '0' && this.addProForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    handleRemove(file) {
      // 先找到那个index
      const index = this.addProForm.pics.findIndex(item => item.pic === file.response.data.tmp_path)
      // 根据index删除
      // console.log(index)
      this.addProForm.pics.splice(index, 1)
      // console.log(this.addProForm.pics)
    },
    handlePreview(file) {
      // console.log(file)
      this.previewImg = file.response.data.url
      this.dialogVisible = true
    },
    handleSuccess(res) {
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.addProForm.pics.push({
        pic: res.data.tmp_path
      })
    },
    addGoods() {
      this.$refs.addProFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请补全信息后提交')

        // 添加
        this.manyData.forEach(item => {
          const obj1 = { attr_id: item.attr_id, attr_value: item.attr_vals.join(' ') }
          this.addProForm.attrs.push(obj1)
        })
        this.onlyData.forEach(item => {
          const obj2 = { attr_id: item.attr_id, attr_value: item.attr_vals }
          this.addProForm.attrs.push(obj2)
        })
        const newForm = _.cloneDeep(this.addProForm)
        newForm.goods_cat = newForm.goods_cat.join(',')
        const { data: res } = await this.$http.post('goods', newForm)
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error(this.meta.msg)

        this.getCateList()
      })
    },
    async getManyData() {
      // 进入到了商品参数
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: {
          sel: 'many'
        }
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      res.data.forEach(
        item => (item.attr_vals = item.attr_vals.length > 0 ? item.attr_vals.split(' ') : [])
      )
      this.manyData = res.data
    },
    async getOnlyData() {
      // 进入到了商品属性
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: {
          sel: 'only'
        }
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.onlyData = res.data
      // console.log(this.onlyData)
    }
  },
  computed: {
    cateId() {
      if (this.addProForm.goods_cat.length === 3) {
        return this.addProForm.goods_cat[this.addProForm.goods_cat.length - 1]
      }
      return null
    }
  },
  watch: {
    activeName(newVal) {
      if (newVal === '1') {
        this.getManyData()
      } else if (newVal === '2') {
        this.getOnlyData()
      }
    }
  }
}
