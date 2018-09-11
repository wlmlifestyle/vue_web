export default {
  data() {
    return {
      // 商品分类列表
      cateList: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          type: 'template',
          template: 'isOk'
        },
        {
          label: '排序',
          prop: 'cat_level',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt',
          width: '200px'
        }
      ],
      addForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      // 添加表单的验证规则对象
      addFormRules: {
        cat_name: [{ required: true, message: '请填写分类名称', trigger: 'blur' }]
      },
      addCateDialogVisible: false,
      // 得到两级的列表
      parentCateList: [],
      // 选择的项
      selectedList: [],
      cascaderConfig: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.cateList = res.data.result
      this.total = res.data.total
    },
    // 点击添加分类按钮
    async showCateDialog() {
      const { data: res } = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      this.parentCateList = res.data
      this.addCateDialogVisible = true
    },
    // 关闭对话框
    resetAddCateDialog() {
      this.$refs.addFormRef.resetFields()
      this.selectedList = []
      this.addForm.cat_pid = 0
      this.addForm.cat_level = 0
    },
    handleChange() {
      // console.log(this.selectedList)
      if (this.selectedList.length === 0) {
        // 父元素id为0
        this.addForm.cat_pid = 0
        // 第一级别
        this.addForm.cat_level = 0
      } else {
        this.addForm.cat_pid = this.selectedList[this.selectedList.length - 1]
        this.addForm.cat_level = this.selectedList.length
      }
    },
    // 增加
    addCate() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.addForm)
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    }
  }
}
