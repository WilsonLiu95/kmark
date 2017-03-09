
;(function(__context){
    var module = {
        id : "4a7c5833baeaaf85c32829c06446720b" ,
        filename : "cliping.string" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

    if (typeof window.QTMPL === "undefined") window.QTMPL = {};
window.QTMPL["cliping"] = "<!--左侧展示栏-->\n<nav class=\"nav-side\">\n    <ul>\n        <li class=\"menu-item\" ng-click=\"select(-1)\" ng-if=\"params.notes\">显示全部</li>\n        <li class=\"menu-item\" ng-repeat=\"book in params.notes\" ng-click=\"select($index)\">\n            {{book.bookName}}\n        </li>\n    </ul>\n</nav>\n<!--右侧主体部分-->\n<div class=\"main-warp\">\n    <!--功能按钮部分-->\n    <div class=\"tool-section\">\n        <label class=\"file-label\" title=\"选取kindle中的cliping.txt文件\">选择文件\n            <input type=\"file\" ng-model=\"filePath\" file-reader=\"result\">\n        </label>\n        <span> Kmark用户群：614462732   </span>\n    </div>\n    <!--展示部分-->\n    <div>\n        <article class=\"book-content\" ng-repeat=\"note in params.notes\" ng-if=\"$index===params.show||params.show===-1\">\n            <!--当show为-1时，允许用户显示全部-->\n            <div class=\"book-header\">\n                <h1 class=\"book-name\">\n                    {{note.bookName}}\n                </h1>\n                <span class=\"book-author\">{{note.author}}</span>\n            </div>\n            <li class = 'test' ng-repeat=\"fragment in note.fragments track by $index\">\n                {{fragment}}\n            </li>\n        </article>\n    </div>\n</div>\n";
if (typeof module !== "undefined") module.exports = window.QTMPL["cliping"];

    })( module.exports , module , __context );
    __context.____MODULES[ "4a7c5833baeaaf85c32829c06446720b" ] = module.exports;
})(this);


;(function(__context){
    var module = {
        id : "df690b7dc83917c7b68644db905f93d5" ,
        filename : "cliping.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

    var html = __context.____MODULES['4a7c5833baeaaf85c32829c06446720b'];
angular.setView(html);
app.controller("main", ["$scope", "deal", function ($scope, deal) {
    $scope.params = {
        show: -1 //当前展示的书名序号
    };
    $scope.$watch('result', function () {
        if ($scope.result) {
            $scope.params.notes = deal.pipeline($scope.result);
            if (!$scope.params.notes[0]){
                alert("请检查您选取的文件是否符合kindle标记的标准格式");
            }
        }
    });
    $scope.select = function (index) {
        $scope.params.show = index;
    };
}]);


    })( module.exports , module , __context );
    __context.____MODULES[ "df690b7dc83917c7b68644db905f93d5" ] = module.exports;
})(this);
