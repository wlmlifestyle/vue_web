export default {
  data() {
    return {
      menus: [],
      collapse: false,
      activePath: '',
      iconlist: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao']
    }
  },
  created() {
    this.getMenus()
    // 只要刷新浏览器 home组建就会被重新创建一次 data中数据会被清空
    // 可以从sessionStroage中 把之前保存的激活状态 读取回来
    const activePath = window.sessionStorage.getItem('activePath')
    this.activePath = activePath
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
    },
    saveActivePath(path) {
      // console.log(path)
      this.activePath = path
      window.sessionStorage.setItem('activePath', path)
    }
  }
}
