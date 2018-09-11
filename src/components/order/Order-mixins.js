import cityOptions from './city_data2017_element'
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      orderList: [],
      total: 0,
      wlDialogVisible: false,
      wlList: [],
      editAddDialogVisible: false,
      editAddressForm: {
        address: ''
      },
      editAddressFormRules: {
        address: [{ required: true, message: '请输入详细地址', tirgger: 'blur' }]
      },
      cityOptions
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', {
        params: this.queryInfo
      })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.orderList = res.data.goods
      this.total = res.data.total
    },
    async showDialogWL() {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      this.wlDialogVisible = true
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.wlList = res.data
    },
    editAddress() {
      this.editAddDialogVisible = true
    }
  }
}
