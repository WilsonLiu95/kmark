(function(e){var t={id:"85eb0f7c688a3a8c82b891c05cead912",filename:"cliping.string",exports:{}};if(!e.____MODULES){e.____MODULES={}}var n=function(e,t,n){if(typeof window.QTMPL==="undefined")window.QTMPL={};window.QTMPL["cliping"]='<!--左侧展示栏-->\n<nav class="nav-side">\n    <ul>\n        <li class="menu-item" ng-click="select(-1)" ng-if="params.notes">显示全部</li>\n        <li class="menu-item" ng-repeat="book in params.notes" ng-click="select($index)">\n            {{book.bookName}}\n        </li>\n    </ul>\n</nav>\n<!--右侧主体部分-->\n<div class="main-warp">\n    <!--功能按钮部分-->\n    <div class="tool-section">\n        <label class="file-label" title="选取kindle中的cliping.txt文件">选择文件\n            <input type="file" ng-model="filePath" file-reader="result">\n        </label>\n        <span> Kmark用户群：614462732 <a href="https://jq.qq.com/?_wv=1027&k=45bhlfa">点我加群  </span>\n    </div>\n    <!--展示部分-->\n    <div>\n        <article class="book-content" ng-repeat="note in params.notes" ng-if="$index===params.show||params.show===-1">\n            <!--当show为-1时，允许用户显示全部-->\n            <div class="book-header">\n                <h1 class="book-name">\n                    {{note.bookName}}\n                </h1>\n                <span class="book-author">{{note.author}}</span>\n            </div>\n            <li class = \'test\' ng-repeat="fragment in note.fragments track by $index">\n                {{fragment}}\n            </li>\n        </article>\n    </div>\n</div>\n';if(typeof t!=="undefined")t.exports=window.QTMPL["cliping"]}(t.exports,t,e);e.____MODULES["85eb0f7c688a3a8c82b891c05cead912"]=t.exports})(this);(function(e){var t={id:"df690b7dc83917c7b68644db905f93d5",filename:"cliping.js",exports:{}};if(!e.____MODULES){e.____MODULES={}}var n=function(t,n,r){var i=e.____MODULES["85eb0f7c688a3a8c82b891c05cead912"];angular.setView(i);app.controller("main",["$scope","deal",function(e,t){e.params={show:-1};e.$watch("result",function(){if(e.result){e.params.notes=t.pipeline(e.result);if(!e.params.notes[0]){alert("请检查您选取的文件是否符合kindle标记的标准格式")}}});e.select=function(t){e.params.show=t}}])}(t.exports,t,e);e.____MODULES["df690b7dc83917c7b68644db905f93d5"]=t.exports})(this)