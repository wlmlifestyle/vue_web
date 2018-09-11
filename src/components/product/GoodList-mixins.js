export default {
  data() {
    return {
      goodList: [],
      total: 0,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    async getGoodList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.goodList = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodList()
    },
    async deleteGood(id) {
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
      const { data: res } = await this.$http.delete('goods/' + id)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getGoodList()
    },
    gotoAddPage() {
      // 编程式导航
      this.$router.push('/goods/add')
    }
  }
}
