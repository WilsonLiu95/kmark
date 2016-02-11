var html = require("html/cliping");
angular.setView(html);

app.controller("main",["$scope","deal",function ($scope,deal) {
     $scope.params ={
         show:0 //当前展示的书名序号
     };
    $scope.dealBtn = function (){
        var file = document.getElementById("file").files[0];
        var cache = {};
        var nextFun = function (file) {
            cache.notesList = deal.splitPiece(file);
            cache.piecesList  = deal.pieceDivide(cache.notesList);
            cache.bookList = deal.uniqueBook(cache.piecesList);
            $scope.params.notes = deal.ruleNotes(cache.bookList,cache.piecesList);
            $scope.$apply();
        }
        deal.readFile(file,nextFun);

    };
    $scope.select = function(index) {
        $scope.params.show = index;
    };

}])