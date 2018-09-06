export default {
  data() {
    const checkEmail = (rule, value, cb) => {
      const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (!reg.test(value)) return cb(new Error('邮箱格式不正确'))
      cb()
    }
    const checkMobile = (rule, value, cb) => {
      const reg = /^1[34578]\d{9}$/
      if (!reg.test(value)) return cb(new Error('手机格式不正确'))
      cb()
    }
    return {
      userlist: {},
      pagesizes: [4, 6, 8],
      // 默认值
      query: '',
      // 默认值
      pagesize: 4,
      // 默认值
      pageIndex: 1,
      // 控制添加对话框的显示与隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      // 添加表单的数据对象
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证对象
      addFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editForm: {},
      editFormRules: {
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const { data: res } = await this.$http.get('users', {
        params: {
          query: this.query,
          pagenum: this.pageIndex,
          pagesize: this.pagesize
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取列表失败')
      // console.log(res)
      this.userlist = res.data
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.getUsers()
      // console.log(pageIndex)
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize
      this.getUsers()
      // console.log(val)
    },
    // 开关状态发生变化就会触发这个函数
    async stateChanged(id, newState) {
      const { data: res } = await this.$http.put(`users/${id}/state/${newState}`)
      if (res.meta.status !== 200) return this.$message.error('修改状态失败')
    },
    // 关闭弹出框 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    closeForm() {
      this.$refs.ruleFormRef.resetFields()
    },

    // 添加用户
    addUser() {
      this.$refs.ruleFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error('新增失败')
        this.$message.success('新增成功')
        this.$refs.ruleFormRef.resetFields()
        this.addDialogVisible = false
      })
    },
    closeEditForm() {
      this.editForm = {}
      this.$refs.editFormRef.resetFields()
      this.editDialogVisible = false
    },
    async getUserById(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('获取用户信息失败')
      this.editForm = res.data
      this.editDialogVisible = true
    },
    updataForm(id) {
      // console.log(this.editForm)
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('修改用户信息失败')
        this.editDialogVisible = false
        this.$message.success('修改成功')
        this.getUsers()
      })
    },
    async delUserById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      const { data: res } = await this.$http.delete('users/' + id)
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getUsers()
    }
  }
}
