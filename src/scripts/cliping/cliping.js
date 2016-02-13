var html = require("html/cliping");
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
                alert("请检查您选取的文件是否符合kindle标记的标准格式")
            }
        }
    });
    $scope.select = function (index) {
        $scope.params.show = index;
    };
}]);


