<template>
  <div class="static-page">
    <el-card class='card-section' v-if="user.rank">
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
                <span>每月新增用户</span>
          <div id="userChart"></div>
        </el-col>
        <el-col :span="7"
                :offset="1">
                <span>每月上传次数</span>
          <div id="uploadChart"></div>
        </el-col>
        <el-col :span="7"
                :offset="1">
          <span>每月新增标记</span>
          <div id="markChart"></div>
        </el-col>
      </el-row>
  
    </el-card>
  
  </div>
</template>

<script>
import G2 from 'g2'
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
      this.$http.get('static').then(res => {
        this.user = res.data.user
        this.mark = res.data.mark
        this.book = res.data.book
        this.chart = res.data.chart
        this.firstChart()
        this.secondChart()
        this.thirdChart()
      })
    },
    firstChart() {
      var chart = new G2.Chart({
        id: 'userChart',
        width: 600,
        height: 300
      })

      chart.source(this.chart.user, {
        month: {
          alias: '月份' // 列定义，定义该属性显示的别名
        },
        number: {
          alias: '注册人数'
        }
      })
      chart.interval().position('month*number').size(15)
      // Step 4: 渲染图表
      chart.render()
    },
    secondChart() {
      var chart = new G2.Chart({
        id: 'uploadChart',
        forceFit: true,
        width: 600,
        height: 300
      })
      chart.source(this.chart.upload, {
        month: {
          alias: '月份'
        },
        number: {
          alias: '上传次数'
        }
      })
      chart.interval().position('month*number').size(15)
      chart.render()
    },
    thirdChart() {
      var chart = new G2.Chart({
        id: 'markChart',
        forceFit: true,
        width: 600,
        height: 300
      })
      chart.source(this.chart.mark, {
        month: {
          alias: '月份'
        },
        number: {
          alias: '新增标记数'
        }
      })
      chart.interval().position('month*number').size(15)
      chart.render()
    }
  }
}

</script>

<style scoped>
.card-section {
  margin-bottom: 20px;
}
</style>
