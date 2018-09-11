export default {
  data() {
    return {
      cateList: [],
      // 被选中的集合
      selectedList: [],
      cascaderConfig: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      activeName: 'many',
      manyTableData: [],
      onlyTableData: [],
      addDialogVisible: false,
      addFormRules: {
        attr_name: [{ required: true, message: '请填写参数名称', trigger: 'blur' }]
      },
      addForm: {
        attr_name: ''
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.cateList = res.data
    },
    // 选择改变
    handleChange() {
      if (this.selectedList.length !== 3) {
        this.selectedList = []
        this.manyTableData = []
        this.onlyTableData = []
      } else {
        // 获取三级分类下所有的分类参数
        this.getParamsList()
      }
    },
    // 通过三级id和是动态参数还是静态参数来取分类参数
    async getParamsList() {
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: {
          sel: this.activeName
        }
      })

      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals.length > 0 ? item.attr_vals.split(' ') : []
        item.tagInputVisible = false
        item.tagInputValue = ''
      })

      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        // console.log(res)
        this.onlyTableData = res.data
      }
    },
    resetForm() {
      this.$refs.addFormRef.resetFields()
    },
    addParamsForm() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return

        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        })
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)

        this.getParamsList()
        this.addDialogVisible = false
      })
    },
    showTagInput(row) {
      row.tagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async loseBlur(row) {
      row.tagInputVisible = false
      if (row.tagInputValue.trim().length <= 0) {
        row.tagInputValue = ''
        return
      }
      row.attr_vals.push(row.tagInputValue)
      row.tagInputValue = ''
      const { data: res } = await this.$http.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        }
      )
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
    },
    async deleteTagInput(row, index) {
      row.attr_vals.splice(index, 1)
      const { data: res } = await this.$http.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        }
      )
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
    }
  },
  // 计算属性
  computed: {
    // 定义一个计算属性,叫做 fullName
    // 注意: 所有的计算属性,在定义的时候, 都要被定义为 function,
    // 但是,在页面上使用计算属性的时候, 是直接当作普通的 变量 来使用的,而不是当作方法去调用的!!!
    // 特点:只要计算属性的 function 中,依赖的 任何一个数据发生了变化,都会对这个计算属性,重新求值

    cateId() {
      if (this.selectedList.length === 3) {
        return this.selectedList[this.selectedList.length - 1]
      } else {
        return null
      }
    },
    isDisable() {
      // 值为true 则代表选中第三级了 所以不禁用
      if (this.cateId) {
        return false
      } else {
        return true
      }
      // return this.cateId === true ? false : true
    }
  },
  watch: {
    activeName(newVal, oldVal) {
      if (this.cateId !== null) {
        this.getParamsList()
      }
    }
  }
}
