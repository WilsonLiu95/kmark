<template>
  <div class="home-page">
    <el-row :gutter="24">
      <el-col :span="5"
              class="left-nav">
        <div class="grid-content bg-purple ">
          <!--<el-button type="primary" size="large">选择文件</el-button>-->
          <el-upload class="upload-demo"
                     action="//dev.wilsonliu.cn:8080/api/home/upload"
                     :headers="{'X-XSRF-TOKEN':token}"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">请选择本地Mycliping.txt文件</div>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="14"
              class="home-body">
        <div class="grid-content bg-purple ">
          <h1>nnns</h1>
        </div>
      </el-col>



    </el-row>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      token: window.util.cookie.get('XSRF-TOKEN'),
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}

</script>

<style scoped>
.home-page {
  padding: 11px 0 0 0;
}

.left-nav {
  margin-left: 179px;
  background-color: #F9FAFC;
}

.home-body {
  margin-left: 31px;
  background-color: #E5E9F2;
}

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
