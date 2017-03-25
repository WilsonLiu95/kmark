<template>
  <el-card class="home-page box-card">
    <el-row :gutter="24">
      <el-col :span="5">
        <el-card class="left-nav box-card">
          <el-input placeholder="请输入"
                    class="search"
                    icon="search"
                    v-model="search"
                    :on-icon-click="handleSearch">
          </el-input>
          <!--书籍列表-->
          <el-button-group class='book-btn-group'>

            <el-button v-for="(book, index) in notes"
                       @click="changeBook(index)"
                       type='text'
                       :key='index'
                       :class='["book-item-btn",currentBook==index?"focus-book" : ""]'
                       :label="index">{{book.title}}</el-button>
          </el-button-group>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="home-body box-card">
          <div slot="header"
               style="height:22px;font-size:18px;text-align:center;"
               class="clearfix box-card-header">
            <span style="float:left">
                          <a style="text-decoration:none;color:#000" href="https://jq.qq.com/?_wv=1027&amp;k=45bhlfa">Kmark</a>
                        </span>
                  
            <span v-if="notes[currentBook]"style="font-size:20px;">{{notes[currentBook].title}}</span>
            <span v-if="notes[currentBook]" style="font-size:12px;">{{notes[currentBook].author}}</span>
            <el-tooltip content="一键复制标记内容"
                        placement="top">
              <el-button class="clipboard-btn el-icon-document"
                         type="danger"
                         size="large"
                         data-clipboard-target=".book-frag-list">复制</el-button>
  
            </el-tooltip>
          </div>
  
          <el-upload drag
                     v-if="!notes.length"
                     class="upload-file"
                     :action="prefix+ '/home/upload'"
                     :headers="{'X-XSRF-TOKEN':token}"
                     name='mycliping'
                     :before-upload="init"
                     accept='.txt'>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>请将本地 Mycliping.txt 拖到此处，或<em>点击上传</em></span>
              <!--<br>-->
              <span style="display:block;margin-top:50px">注:请将Kindle通过USB线与电脑相连，在kindle中找到 Mycliping.txt 文件</span>
            </div>
          </el-upload>
  
          <div class="book-frag-list">
            <ul v-if="notes[currentBook]">
              <li v-for='frag in notes[currentBook].fragments'>
                {{frag}}
              </li>
            </ul>
  
          </div>
        </el-card>
  
      </el-col>
  
    </el-row>
  </el-card>
</template>

<script>
import txt from '../txt'
import Clipboard from 'clipboard'
export default {
  name: 'home',
  data() {
    return {
      token: window.util.cookie.get('XSRF-TOKEN'),
      prefix: '', // 请求前缀
      fileList: [],
      txt: txt,
      currentBook: 0,
      search: '',
      notes: []
    }
  },
  created() {
    this.prefix = this.$http.defaults.baseURL
    this.clipboard()
  },
  methods: {
    init(file) {
      var reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.notes = this.txt.pipeline(reader.result)
        this.showBook = this.notes[0]
      }
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
    handleSearch() {

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
}


.upload-file .el-upload {
  width: 100%;
}

.upload-file .el-upload .el-upload-dragger {
  width: 100%;
  padding: 80px 0 0 0;
  min-height: 400px;
}

.book-btn-group {
  margin: 10px 0 0 0;
  border-radius: 7px;
  border: 1px solid #EAEAEA;
}

.book-item-btn {
  display: block;
  color: #1F1E1E;
  background-color: #EAEAEA;
  width: 100%;
}

.focus-book {
  color: #D7000E
}

.el-button:focus,
.el-button:hover {
  color: #D7000E
}



/*.search {
  display: block;
  margin: 10px auto;
  width: 200px;
}*/

.clipboard-btn {
  background-color: #D7000E;
  float: right;
  margin: -6px 30px 0 0;
}
</style>
