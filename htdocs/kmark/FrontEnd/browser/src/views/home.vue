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
                  
            <span v-if="notes[currentBook].title"style="font-size:20px;">{{notes[currentBook].title}}</span>
            <span v-if="notes[currentBook].author" style="font-size:12px;">{{notes[currentBook].author}}</span>
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
                     action="//dev.wilsonliu.cn:8080/api/home/upload"
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
      fileList: [],
      txt: txt,
      currentBook: 0,
      search: '',
      notes: [{ 'fragments': ['《西方战争艺术》并非传统的战争史，其目的是对史有所载的大多数西方战争中所存在的某些作战可变因素的变化，进行介绍性的和某种高层次的追溯和解释。这些构成了本着作的主题，因此它比一般叙事史更侧重解释。本书对大多数重要战役和会战都给予了应有的注意，只是所用文字较少，而只侧重于所做解释的论据方面。', '武器的发展 　　从第二次世界大战爆发起，经历了一个新式武器和武器改良快速发展的时期，各国政府发起并慷慨地资助武器发展的系统研究。现在大多数的武器系统都源于第二次世界大战以前或期间的这些研究工作。', '士兵之间可以使用导弹互相攻击，飞机也可以使用它们攻击地面目标。这些在防空和空战中特别有效，在第二次世界大战时使用的机枪和火炮难以达到的距离上，可以使用这些导弹交战。', '《西方战争艺术》并非传统的战争史，其目的是对史有所载的大多数西方战争中所存在的某些作战可变因素的变化，进行介绍性的和某种高层次的追溯和解释。这些构成了本着作的主题，因此它比一般叙事史更侧重解释。本书对大多数重要战役和会战都给予了应有的注意，只是所用文字较少，而只侧重于所做解释的论据方面。', '武器的发展 　　从第二次世界大战爆发起，经历了一个新式武器和武器改良快速发展的时期，各国政府发起并慷慨地资助武器发展的系统研究。现在大多数的武器系统都源于第二次世界大战以前或期间的这些研究工作。', '士兵之间可以使用导弹互相攻击，飞机也可以使用它们攻击地面目标。这些在防空和空战中特别有效，在第二次世界大战时使用的机枪和火炮难以达到的距离上，可以使用这些导弹交战。', '《西方战争艺术》并非传统的战争史，其目的是对史有所载的大多数西方战争中所存在的某些作战可变因素的变化，进行介绍性的和某种高层次的追溯和解释。这些构成了本着作的主题，因此它比一般叙事史更侧重解释。本书对大多数重要战役和会战都给予了应有的注意，只是所用文字较少，而只侧重于所做解释的论据方面。', '武器的发展 　　从第二次世界大战爆发起，经历了一个新式武器和武器改良快速发展的时期，各国政府发起并慷慨地资助武器发展的系统研究。现在大多数的武器系统都源于第二次世界大战以前或期间的这些研究工作。', '士兵之间可以使用导弹互相攻击，飞机也可以使用它们攻击地面目标。这些在防空和空战中特别有效，在第二次世界大战时使用的机枪和火炮难以达到的距离上，可以使用这些导弹交战。', '《西方战争艺术》并非传统的战争史，其目的是对史有所载的大多数西方战争中所存在的某些作战可变因素的变化，进行介绍性的和某种高层次的追溯和解释。这些构成了本着作的主题，因此它比一般叙事史更侧重解释。本书对大多数重要战役和会战都给予了应有的注意，只是所用文字较少，而只侧重于所做解释的论据方面。', '武器的发展 　　从第二次世界大战爆发起，经历了一个新式武器和武器改良快速发展的时期，各国政府发起并慷慨地资助武器发展的系统研究。现在大多数的武器系统都源于第二次世界大战以前或期间的这些研究工作。', '士兵之间可以使用导弹互相攻击，飞机也可以使用它们攻击地面目标。这些在防空和空战中特别有效，在第二次世界大战时使用的机枪和火炮难以达到的距离上，可以使用这些导弹交战。', '《西方战争艺术》并非传统的战争史，其目的是对史有所载的大多数西方战争中所存在的某些作战可变因素的变化，进行介绍性的和某种高层次的追溯和解释。这些构成了本着作的主题，因此它比一般叙事史更侧重解释。本书对大多数重要战役和会战都给予了应有的注意，只是所用文字较少，而只侧重于所做解释的论据方面。', '武器的发展 　　从第二次世界大战爆发起，经历了一个新式武器和武器改良快速发展的时期，各国政府发起并慷慨地资助武器发展的系统研究。现在大多数的武器系统都源于第二次世界大战以前或期间的这些研究工作。', '士兵之间可以使用导弹互相攻击，飞机也可以使用它们攻击地面目标。这些在防空和空战中特别有效，在第二次世界大战时使用的机枪和火炮难以达到的距离上，可以使用这些导弹交战。'], 'title': '西方战争艺术', 'author': '阿彻·琼斯' }, { 'fragments': ['正则表达式是描述文本模式的表示法，它可以有效地构造一种用于模式匹配的专用语言。', '正在被越来越多地使用，它们不仅被包含在用C语言开发的库中，而且还被作为脚本语言如Awk 和Perl的语法的一部分。', '在几年以前，当时我还是一个顾问，曾经在 1 到 2 年的时间里，似乎每个与我交谈过的 客户都非常肯定地认为在他的业务中需要一个 Web 服务解决方案。当然，虽然在我的客户中 很少有人能真正地理解这意味着什么或者为什么他需要这种架构，但由于他们总是不断地在 互联网上杂志上以及博览会上听说到 Web 服务，因此他们认为最好能搭上 Web 服务这趟车， 以免错过机会。', '正则表达式是描述文本模式的表示法，它可以有效地构造一种用于模式匹配的专用语言。', '正在被越来越多地使用，它们不仅被包含在用C语言开发的库中，而且还被作为脚本语言如Awk 和Perl的语法的一部分。', '在几年以前，当时我还是一个顾问，曾经在 1 到 2 年的时间里，似乎每个与我交谈过的 客户都非常肯定地认为在他的业务中需要一个 Web 服务解决方案。当然，虽然在我的客户中 很少有人能真正地理解这意味着什么或者为什么他需要这种架构，但由于他们总是不断地在 互联网上杂志上以及博览会上听说到 Web 服务，因此他们认为最好能搭上 Web 服务这趟车， 以免错过机会。', '正则表达式是描述文本模式的表示法，它可以有效地构造一种用于模式匹配的专用语言。', '正在被越来越多地使用，它们不仅被包含在用C语言开发的库中，而且还被作为脚本语言如Awk 和Perl的语法的一部分。', '在几年以前，当时我还是一个顾问，曾经在 1 到 2 年的时间里，似乎每个与我交谈过的 客户都非常肯定地认为在他的业务中需要一个 Web 服务解决方案。当然，虽然在我的客户中 很少有人能真正地理解这意味着什么或者为什么他需要这种架构，但由于他们总是不断地在 互联网上杂志上以及博览会上听说到 Web 服务，因此他们认为最好能搭上 Web 服务这趟车， 以免错过机会。', '正则表达式是描述文本模式的表示法，它可以有效地构造一种用于模式匹配的专用语言。', '正在被越来越多地使用，它们不仅被包含在用C语言开发的库中，而且还被作为脚本语言如Awk 和Perl的语法的一部分。', '在几年以前，当时我还是一个顾问，曾经在 1 到 2 年的时间里，似乎每个与我交谈过的 客户都非常肯定地认为在他的业务中需要一个 Web 服务解决方案。当然，虽然在我的客户中 很少有人能真正地理解这意味着什么或者为什么他需要这种架构，但由于他们总是不断地在 互联网上杂志上以及博览会上听说到 Web 服务，因此他们认为最好能搭上 Web 服务这趟车， 以免错过机会。', '正则表达式是描述文本模式的表示法，它可以有效地构造一种用于模式匹配的专用语言。', '正在被越来越多地使用，它们不仅被包含在用C语言开发的库中，而且还被作为脚本语言如Awk 和Perl的语法的一部分。', '在几年以前，当时我还是一个顾问，曾经在 1 到 2 年的时间里，似乎每个与我交谈过的 客户都非常肯定地认为在他的业务中需要一个 Web 服务解决方案。当然，虽然在我的客户中 很少有人能真正地理解这意味着什么或者为什么他需要这种架构，但由于他们总是不断地在 互联网上杂志上以及博览会上听说到 Web 服务，因此他们认为最好能搭上 Web 服务这趟车， 以免错过机会。'], 'title': '代码之美', 'author': 'Grey Wilson' }, { 'fragments': ['IT一词，通常让人联想到的是那些技术极客——一群苦大仇深的码农形象，就像本书的书名一样被人误解。其实，软件开发更体现的是一种团队合作、企业文化乃至一人为人处世的态度。', '本书的结构 根据主题的不同，我把所有栏目分成10章。前6章剖析了软件开发流程，接下来3章重点讨论人的问题，最后1章批判软件业务运转方式。解决这些问题的工具、技巧和建议遍布全书。本书的最后还附有术语表方便大家参考。', 'IT一词，通常让人联想到的是那些技术极客——一群苦大仇深的码农形象，就像本书的书名一样被人误解。其实，软件开发更体现的是一种团队合作、企业文化乃至一人为人处世的态度。', '本书的结构 根据主题的不同，我把所有栏目分成10章。前6章剖析了软件开发流程，接下来3章重点讨论人的问题，最后1章批判软件业务运转方式。解决这些问题的工具、技巧和建议遍布全书。本书的最后还附有术语表方便大家参考。', 'IT一词，通常让人联想到的是那些技术极客——一群苦大仇深的码农形象，就像本书的书名一样被人误解。其实，软件开发更体现的是一种团队合作、企业文化乃至一人为人处世的态度。', '本书的结构 根据主题的不同，我把所有栏目分成10章。前6章剖析了软件开发流程，接下来3章重点讨论人的问题，最后1章批判软件业务运转方式。解决这些问题的工具、技巧和建议遍布全书。本书的最后还附有术语表方便大家参考。', 'IT一词，通常让人联想到的是那些技术极客——一群苦大仇深的码农形象，就像本书的书名一样被人误解。其实，软件开发更体现的是一种团队合作、企业文化乃至一人为人处世的态度。', '本书的结构 根据主题的不同，我把所有栏目分成10章。前6章剖析了软件开发流程，接下来3章重点讨论人的问题，最后1章批判软件业务运转方式。解决这些问题的工具、技巧和建议遍布全书。本书的最后还附有术语表方便大家参考。', 'IT一词，通常让人联想到的是那些技术极客——一群苦大仇深的码农形象，就像本书的书名一样被人误解。其实，软件开发更体现的是一种团队合作、企业文化乃至一人为人处世的态度。', '本书的结构 根据主题的不同，我把所有栏目分成10章。前6章剖析了软件开发流程，接下来3章重点讨论人的问题，最后1章批判软件业务运转方式。解决这些问题的工具、技巧和建议遍布全书。本书的最后还附有术语表方便大家参考。'], 'title': '代码之殇（原书第2版）', 'author': '（美）EricBrechner' }]
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
