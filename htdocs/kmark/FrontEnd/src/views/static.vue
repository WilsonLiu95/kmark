<template>
  <div class="static-page">
    <el-card class='card-section'
             v-if="user">
      <div slot="header"
           class="clearfix">
        <span style="line-height: 36px;">{{user.name}}，您好。 </span>
      </div>
      <div style="margin-left:100px">
        <p>您是第{{user.rank}}个注册用户</p>
        <p>累计上传{{user.upload}}次</p>
        <p>累计上传{{user.book}}本书</p>
        <p>累计标记{{user.mark}}段文字</p>
      </div>
  
    </el-card>
    <el-card class='card-section'>
      <div slot="header"
           class="clearfix">
        <span style="line-height: 36px;">今日推荐标注</span>
      </div>
  
      <el-table :data="mark"
                border
                stripe
                style="width: 100%">
        <el-table-column prop="title"
                         label="标题"
                         width="180">
        </el-table-column>
        <el-table-column prop="content"
                         label="标记">
        </el-table-column>
  
      </el-table>
  
    </el-card>
    <el-card class='card-section'>
      <div slot="header"
           class="clearfix">
        <span style="line-height: 36px;">热门书籍排行榜</span>
      </div>
      <el-table :data="book"
                border
                stripe
                style="width: 100%">
        <el-table-column prop="title"
                         label="标题"
                         width="180">
        </el-table-column>
        <el-table-column prop="author"
                         label="作者">
        </el-table-column>
        <el-table-column prop="reader_number"
                         label="阅读人数">
        </el-table-column>
        <el-table-column prop="mark_number"
                         label="累计标记次数">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class='card-section'>
      <div slot="header"
           class="clearfix">
        <span style="line-height: 36px;">统计数据</span>
      </div>
      <el-row style="text-align:center">
        <el-col :span="7"
                :offset="1">
          <div class="static-chart"
               id="user-chart"></div>
        </el-col>
        <el-col :span="7"
                :offset="1">
          <div class="static-chart"
               id="upload-chart"></div>
        </el-col>
        <el-col :span="7"
                :offset="1">
          <div class="static-chart"
               id="mark-chart"></div>
        </el-col>
      </el-row>
  
    </el-card>
  
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import Vue from 'vue'
import { Table, TableColumn, Row, Col } from 'element-ui'
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(TableColumn)

export default {
  name: 'static',
  data() {
    return {
      user: {
        rank: 0,
        upload: 0,
        book: 0,
        mark: 0,
        name: ''
      },
      mark: [
        { title: '西方战争艺术史', content: '士兵之间可以使用导弹互相攻击，飞机也可以使用它们攻击地面目标。这些在防空和空战中特别有效，在第二次世界大战时使用的机枪和火炮难以达到的距离上，可以使用这些导弹交战。' }],
      book: [{
        title: '定位',
        author: 'wilson',
        first: '王兴建'
      }],
      chart: {
        user: [],
        upload: [],
        mark: []
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      window.util.$http.get('static').then(res => {
        this.user = res.data.user
        this.mark = res.data.mark
        this.book = res.data.book
        this.chart = res.data.chart
        Object.entries(this.chart).forEach((item) => {
          const titleMap = {
            'user': '每月用户增长',
            'mark': '每月标记',
            'upload': '每月上传次数'
          }
          this.makeChart(item[0], titleMap[item[0]], item[1])
        })
      })
    },
    makeChart(tableId, title, data) {
      var myChart = echarts.init(document.getElementById(tableId + '-chart'))
      // 绘制图表
      myChart.setOption({
        title: { text: title },
        color: ['#3398DB'],
        tooltip: {},
        xAxis: {
          data: Object.keys(data)
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          data: Object.values(data)
        }]
      })
    }
  }
}

</script>

<style scoped>
.card-section {
  margin-bottom: 20px;
}

.static-chart {
  width: 100%;
  height: 400px;
}
</style>
