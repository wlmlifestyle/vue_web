export default {
  data() {
    return {
      menus: [],
      collapse: false,
      iconlist: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao']
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    loginout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    async getMenus() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('加载列表失败')
      this.menus = res.data
    }
  }
}
