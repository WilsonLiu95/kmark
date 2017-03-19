<template>
  <div class="home-page">
    <el-row :gutter="24">
      <el-col :span="5"
              class="left-nav">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入"
                    class="search"
                    icon="search"
                    v-model="search"
                    :on-icon-click="handleSearch">
          </el-input>
          <!--文件上传-->
          <el-upload class="upload-file"
                     action="//dev.wilsonliu.cn:8080/api/home/upload"
                     :headers="{'X-XSRF-TOKEN':token}"
                     name='mycliping'
                     accept='.txt'
                     :show-file-list="false"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :before-upload="init"
                     :file-list="fileList">
            <el-button size="large"
                       style="background-color:#DADADA;color:#BB0001"
                       type="primary">选择文件</el-button>
            <div slot="tip"
                 class="el-upload__tip">请选择本地Mycliping.txt文件</div>
          </el-upload>
          <!--书籍列表-->
          <div class="book-list">
  
            <el-menu default-active="1"
                     @select="changeBook"
                     theme="light">
              <el-menu-item v-for="(book,idx) in notes"
                            v-if="book.title"
                            :index="String(idx)">{{book.title}}</el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-col>
      <el-col :span="14"
              class="home-body">
        <div class='home-copy'>
  
          <el-button class="clipboard-btn el-icon-document"
                     type="danger"
                     size="large"
                     data-clipboard-target=".book-frag-list">复制</el-button>
  
        </div>
        <div class="grid-content bg-purple book-frag-list">
          <li v-for='frag in showBook.fragments'>
            {{frag}}
          </li>
        </div>
      </el-col>
  
    </el-row>
  </div>
</template>

<script>
import txt from '../txt'
import Clipboard from 'clipboard'
export default {
  name: 'home',
  data() {
    return {
      token: window.util.cookie.get('XSRF-TOKEN'),
      hasInit: false,
      fileList: [],
      txt: txt,
      showBook: '',
      search: '',
      notes: '0'
    }
  },
  created() {
    this.clipboard()
  },
  methods: {
    init(file) {
      var reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.notes = this.txt.pipeline(reader.result)
        this.showBook = this.notes[0]
        this.hasInit = true
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
    changeBook(idx) {
      this.showBook = this.notes[idx]
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSearch() {

    }
  }
}

</script>

<style scoped>
/*整体结构*/

.home-page {
  padding: 11px 0 0 0;
}

.left-nav {
  margin-left: 179px;
  padding: 0 30px!important;
  background-color: #FFFFFF;
}

.home-body {
  margin-left: 31px;
  text-align: left;
  background-color: #EAEAEA;
}


/*文件上传*/

.upload-file {
  margin: 10px 0 10px 0;
}

.book-list ul {
  margin: 20px auto 0 auto;
  background-color: #EAEAEA;
  border-radius: 20px;
}

.search {
  display: block;
  margin: 10px auto;
  width: 200px;
}

.home-copy {
  width: 100%;
  height: 50px;
}

.home-copy .clipboard-btn {
  float: right;
  background-color: #D7000E;
  width: 96px;
  margin: 10px 50px 0 0;
}


/*layout布局*/

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  min-height: 500px;
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
