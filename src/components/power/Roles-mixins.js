export default {
  data() {
    return {
      roleList: [],
      // 分配权限的弹出框
      rightDialogVisible: false,
      // 从ajax获取的所有的权限树
      rightTree: [],
      // 这个角色所拥有的权限的id
      defaultChecKeys: [],

      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 即将要分配角色的id
      selectedId: null
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.roleList = res.data
    },
    async removeRight(role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
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
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')
      this.$message.success('删除权限成功！')
      role.children = res.data
    },
    async showRightDialog(role) {
      this.selectedId = role.id
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.rightTree = res.data
      // console.log(res.data)
      const keys = []
      this.getLeafIds(role, keys)
      this.defaultChecKeys = keys
      this.rightDialogVisible = true
    },
    getLeafIds(node, keys) {
      if (!node.children) {
        keys.push(node.id)
      } else {
        node.children.forEach(item => {
          this.getLeafIds(item, keys)
        })
      }
    },
    // 只要关闭都会触发这个方法
    resetRoleForm() {
      // console.log('111111')
      this.selectedId = null
      // 置为空 下次可以刷新新的
      this.defaultChecKeys = []
      this.rightTree = []
    },
    // 保存角色修改分配权限
    async saveRight() {
      const arr1 = this.$refs.tree.getCheckedKeys()
      const arr2 = this.$refs.tree.getHalfCheckedKeys()
      const rids = [...arr1, ...arr2].join(',')
      const { data: res } = await this.$http.post(`roles/${this.selectedId}/rights`, { rids })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.rightDialogVisible = false
      // 刷新列表
      this.getRoleList()
    }
  }
}
