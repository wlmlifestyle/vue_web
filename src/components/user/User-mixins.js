export default {
  data() {
    return {
      userlist: {}
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const { data: res } = await this.$http.get('users', {
        params: {
          pagenum: 1,
          pagesize: 5
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取列表失败')
      // console.log(res)
      this.userlist = res.data
    }
  }
}
