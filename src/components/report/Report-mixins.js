import echarts from 'echarts'
import _ from 'lodash'
export default {
  data() {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created() {},
  methods: {},
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main)
    const { data: res } = await this.$http.get('reports/type/1')
    // console.log(res)
    const data = _.merge(res.data, this.options)
    if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    myChart.setOption(data)
    // 绘制图表
  }
}
