
;(function(__context){
    var module = {
        id : "545c0a8053cb00326ff150eadcb63585" ,
        filename : "cliping.string" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

    if (typeof window.QTMPL === "undefined") window.QTMPL = {};
window.QTMPL["cliping"] = "<!--左侧展示栏-->\n<nav class=\"nav-side\">\n    <ul>\n        <li class=\"menu-item\" ng-click=\"select(-1)\" ng-if=\"params.notes\">显示全部</li>\n        <li class=\"menu-item\" ng-repeat=\"book in params.notes\" ng-click=\"select($index)\">\n            {{book.bookName}}\n        </li>\n    </ul>\n</nav>\n<!--右侧主体部分-->\n<div class=\"main-warp\"''>\n    <!--功能按钮部分-->\n    <div class=\"tool-section\">\n        <label class=\"file-label\">选择文件\n            <input type=\"file\" ng-model=\"filePath\" file-reader=\"result\">\n        </labelkit\n        <span>欢迎使用kindle标记伴侣</span>\n    </div>\n    <!--展示部分-->\n    <div>\n        <article class=\"book-content\" ng-repeat=\"note in params.notes\" ng-if=\"$index===params.show||params.show===-1\">\n            <!--当show为-1时，允许用户显示全部-->\n            <div class=\"book-header\">\n                <h1 class=\"book-name\">\n                    {{note.bookName}}\n                </h1>\n                <span class=\"book-author\">{{note.author}}</span>\n            </div>\n            <li ng-repeat=\"fragment in note.fragments track by $index\">\n                {{fragment}}\n            </li>\n        </article>\n    </div>\n</div>\n";
if (typeof module !== "undefined") module.exports = window.QTMPL["cliping"];

    })( module.exports , module , __context );
    __context.____MODULES[ "545c0a8053cb00326ff150eadcb63585" ] = module.exports;
})(this);


;(function(__context){
    var module = {
        id : "c9a59579b8f46e492cca6cf2326a38b4" ,
        filename : "cliping.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){

    var html = __context.____MODULES['545c0a8053cb00326ff150eadcb63585'];
angular.setView(html);

app.controller("main", ["$scope", "deal", function ($scope, deal) {
    $scope.params = {
        show: -1 //当前展示的书名序号
    };
    $scope.$watch('result', function () {
        if ($scope.result) {
            $scope.params.notes = deal.pipeline($scope.result);
            console.log($scope);
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
    __context.____MODULES[ "c9a59579b8f46e492cca6cf2326a38b4" ] = module.exports;
})(this);
