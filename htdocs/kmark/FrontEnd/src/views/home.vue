<template>
  <el-card class="home-page box-card">
    <el-row :gutter="24">
      <el-col :span="5">
        <el-card class="left-nav box-card">
          <el-input placeholder="可输入单个关键词搜索标记"
                    class="search"
                    icon="search"
                    v-model="search">
          </el-input>
          <!--书籍列表-->
          <el-button-group class='book-btn-group'>
  
            <el-button v-for="(book, key) in showBookObj"
                       @click="changeBook(key)"
                       type='button'
                       :key='key'
                       :class='["book-item-btn",currentBook == key?"focus-book" : ""]'
                       :label="key">{{key}}</el-button>
          </el-button-group>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="home-body box-card">
          <div slot="header"
               style="height:22px;font-size:18px;text-align:center;"
               class="clearfix box-card-header">
            <span style="float:left"
                  v-if='isLogin && user.name'>
                        {{user.name + ', 你好'}}
                </span>
            <span v-if="currentBook"
                  style="font-size:20px;">{{currentBook}}</span>
            <span v-if="showBookObj[currentBook]"
                  style="font-size:12px;">{{showBookObj[currentBook]["0"].author}}</span>
            <el-tooltip content="为了更好的统计数据，以改进产品，请先行注册"
                        placement="top"
                        v-if="!isLogin && !user.name">
              <el-button style="float:right;margin: -6px 30px 0 0;"
                         size="large"
                         @click="dialogVisible=true"
                         type="primary">
                注册
              </el-button>
            </el-tooltip>
            <el-tooltip content="一键复制标记内容"
                        placement="top"
                        v-if="notes.length">
              <el-button class="clipboard-btn el-icon-document"
                         type="danger"
                         size="large"
                         data-clipboard-target=".book-frag-list">复制</el-button>
  
            </el-tooltip>
          </div>
  
          <el-upload drag
                     v-if="!notes.length"
                     class="upload-file"
                     :action="prefix+ 'home/upload'"
                     :headers="{'X-XSRF-TOKEN':token}"
                     name='mycliping'
                     :on-success="postNote"
                     :on-error="uploadError"
                     :before-upload="readerMark"
                     accept='.txt'>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>请将本地 Mycliping.txt 拖到此处，或<em>点击上传</em></span>
              <!--<br>-->
              <span style="display:block;margin-top:50px">注:请将Kindle通过USB线与电脑相连，在kindle中找到 Mycliping.txt 文件</span>
            </div>
          </el-upload>
  
          <div class="book-frag-list">
            <ul v-if="showBookObj[currentBook]">
              <li v-for='(mark, index) in showBookObj[currentBook]'>
                {{mark.content}}
              </li>
            </ul>
  
          </div>
        </el-card>
  
      </el-col>
      <el-dialog title="开始使用 kmark"
                 v-model="dialogVisible"
                 size="tiny">
        <el-form ref="userForm"
                 :rules="ruleUser"
                 :model="user"
                 label-width="80px">
          <el-form-item label="昵称"
                        prop="name">
            <el-input v-model="user.name"
                      placeholder="给自己取个昵称吧~"></el-input>
          </el-form-item>
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model="user.email"
                      placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="isNewUser">
              <el-radio :label="true">新用户</el-radio>
              <el-radio :label="false">老用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="提示：">
            <span>登录Kmark后，将为您提供数据记录与统计服务</span>
            <p>选择新用户将视为注册，选择老用户将视为登录</p>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="login">确 定</el-button>
            </span>
      </el-dialog>
    </el-row>
  
  </el-card>
</template>

<script>
import Clipboard from 'clipboard'
import Vue from 'vue'
import { Row, Col, RadioGroup, Input, Form, Upload, Button, ButtonGroup, FormItem, Radio, Dialog, Tooltip } from 'element-ui'
Vue.use(Tooltip)
Vue.use(RadioGroup)
Vue.use(Form)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Upload)
Vue.use(ButtonGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Radio)
export default {
  name: 'home',
  data() {
    return {
      token: window.util.cookie.get('XSRF-TOKEN'),
      isNewUser: false,
      isLogin: true, // 是否登录
      user: {
        name: '',
        email: ''
      },
      ruleUser: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { type: 'email', message: '请输入邮箱', trigger: 'change' }

        ]
      },
      prefix: '', // 请求前缀
      currentBook: '', // 当前是哪本书
      search: '',
      dialogVisible: false,
      notes: [] // 所有标记
    }
  },
  created() {
    this.prefix = window.util.$http.defaults.baseURL
    this.getIsLogin()
    this.clipboard()
  },
  computed: {
    afterSearch() {
      if (this.search === '') {
        return this.notes // 如果没有搜索，则直接返回
      }
      var cache = []
      this.notes.forEach((item, index) => { // 根据搜索的关键词进行遍历
        JSON.stringify(item).indexOf(this.search) === -1 ? null : cache.push(item)
      })
      return cache
    },
    showBookObj() {
      var cache = {}
      this.afterSearch.forEach((item, index) => {
        if (index === 0) {
          this.currentBook = item.title
        }
        if (!cache[item.title]) {
          cache[item.title] = [] // 初始化为数组
        }
        cache[item.title].push(item)
      })
      return cache
    },
    uniqueBook() {
      var cache = {}
      var bookArr = []
      this.notes.forEach((item, index) => {
        if (cache[item.title] !== true) {
          // 该书不存在
          cache[item.title] = true
          bookArr.push({
            title: item.title,
            author: item.author
          })
        }
      })
      return bookArr
    }
  },
  methods: {
    readerMark(file) {
      var reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        if (reader.result) {
          this.notes = this.cliping(reader.result)
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: '读取文件为空，请重新尝试'
          })
        }
      }
      reader.onerror = () => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '读取文件失败，当前浏览器或不支持文件读取功能，请尝试使用Chrome，QQ浏览器。'
        })
      }
    },
    getIsLogin() {
      window.util.$http.get('home/is-login', {
        noLoading: true
      }).then(res => {
        if (res.data.isLogin) { // 注册过
          this.isLogin = true
          this.user.name = res.data.name
        } else {
          this.isLogin = false
          this.user.name = null
        }
      })
    },
    uploadError(error) {
      if (error.status === 400) {
        this.$message({
          showClose: true,
          type: 'info',
          message: '为了更好的统计数据，给大家更好的体验，请先行注册。'
        })
      }
    },
    login() {
      this.$refs['userForm'].validate(isValidate => {
        if (isValidate) {
          window.util.$http.post('home/login?isNewUser=' + this.isNewUser, this.user).then(res => {
            this.dialogVisible = false
            this.getIsLogin()
          })
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: '数据有误，请先校对'
          })
        }
      })
    },
    postNote() {
      window.util.$http.post('home/upload-note', {
        notes: this.notes,
        book: this.uniqueBook
      }, { noLoading: true })
    },
    clipboard() {
      var clipboard = new Clipboard('.clipboard-btn')
      clipboard.on('success', (e) => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '复制成功'
        })
        e.clearSelection()
      })
      clipboard.on('error', (e) => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '复制失败，请手动复制'
        })
      })
    },
    changeBook(currentBook) {
      this.currentBook = currentBook
    },
    cliping(txt) { // 文本解析处理
      var noteArray = txt.split(/==========/g).slice(0, -1) // 根据mycliping的格式先划分成一条条记录，最后一条为空
      return noteArray.map((item, index) => {
        const match = {
          firstSplit: /^(.*) \((.*)\)(?:\s)-(.*)(?:\s+)(.*)$/m, // 将每一块细分为书名，作者，(起始位置，标记时间)，内容 4部分
          chinese: /^.*#(\d+)\D*.*(\d{4})年(\d{1,2})月(\d{1,2})日(?:.*\D)(\d{1,2}:\d{1,2}:\d{1,2})$/,
          english: /^.*Location\s(\d*)-.*\D,\s(.*)$/
        }
        // 起始位置与标记时间部分中英文格式不同
        var cache = item.match(match.firstSplit) // ?: 为 消除对应缓存 \s+则为换行
        if (!cache) { // 如果没有匹配出来，则进行处理
          return {
            title: '识别出错',
            author: '错误',
            start_position: 0,
            length: 0,
            mark_time: '2017-1-1 0:0:0', // 标记本段内容的时间
            content: item
          }
        }
        var thirdSection, markTime, date
        if (cache[3].match(match.chinese)) {
          thirdSection = cache[3].match(match.chinese)
          markTime = thirdSection.slice(2, 5).join('-') + ' ' + thirdSection[5]
        } else if (cache[3].match(match.english)) {
          thirdSection = cache[3].match(match.english)
          date = new Date(thirdSection[2])
          markTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() // 拼接时间格式
        } else {
          // 默认当前时间
          date = new Date()
          markTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() // 拼接时间格式
        }
        return {
          title: cache[1],
          author: cache[2],
          start_position: thirdSection ? thirdSection[1] : 0,
          length: cache[4].length,
          mark_time: markTime, // 标记本段内容的时间
          content: cache[4]
        }
      })
    }
  }
}

</script>

<style>
.left-nav {
  min-height: 500px;
}

.home-body {
  min-height: 500px;
  background-color: #EAEAEA;
}


.upload-file .el-upload {
  width: 100%;
}

.upload-file .el-upload .el-upload-dragger {
  width: 100%;
  padding: 80px 0 0 0;
  background-color: #EAEAEA;
  min-height: 400px;
}

.book-btn-group {
  width: 100%;
  margin: 10px 0 0 0;
}

.home-page .book-item-btn {
  display: block;
  margin: 0 0 1px 0;
  white-space: normal;
  background-color: #EAEAEA;
  width: 100%;
}

.focus-book {
  color: #D7000E
}

.book-btn-group .el-button:focus,
.book-btn-group .el-button:hover {
  color: #D7000E
}


.home-page .clipboard-btn {
  background-color: #D7000E;
  float: right;
  margin: -6px 30px 0 0;
}
</style>
