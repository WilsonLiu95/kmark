
;(function(__context){
    var module = {
        id : "dfa5897f51ab484ea04701067990ea3e" ,
        filename : "intro.string" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

    if (typeof window.QTMPL === "undefined") window.QTMPL = {};
window.QTMPL["intro"] = "<!--左侧展示栏-->\n<nav class=\"nav-side\">\n\n</nav>\n<!--右侧主体部分-->\n<div class=\"main-warp\">\n    <!--功能按钮部分-->\n    <div class=\"tool-section\">\n        <span>kindle标记伴侣使用说明</span>\n    </div>\n    <!--展示部分-->\n    <div>\n      <article class=\"intro\">\n        <div>使用kindle阅读的过程中，我们可以标记一些文字，这些文字会保存在cliping.txt的文件中，使用USB连接kindle，然后就点击选取文件按钮，就会直接将文件内容解析出来。</div>\n        <div>这时候就可以按不同的书将其划分然后复制到印象笔记中去,希望你能够喜欢这个小工具。</div>\n      </article>\n    </div>\n</div>\n";
if (typeof module !== "undefined") module.exports = window.QTMPL["intro"];

    })( module.exports , module , __context );
    __context.____MODULES[ "dfa5897f51ab484ea04701067990ea3e" ] = module.exports;
})(this);


;(function(__context){
    var module = {
        id : "6f6fd10c95b87b21edef71e420ee4b84" ,
        filename : "intro.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

    var html = __context.____MODULES['dfa5897f51ab484ea04701067990ea3e'];
angular.setView(html);

app.controller("main", ["$scope", function ($scope, deal) {

}]);


    })( module.exports , module , __context );
    __context.____MODULES[ "6f6fd10c95b87b21edef71e420ee4b84" ] = module.exports;
})(this);
