var html = require("html/cliping");
angular.setView(html);

app.controller("main", ["$scope", "deal", function ($scope, deal) {
    $scope.params = {
        show: -1 //当前展示的书名序号
    };
    $scope.$watch('result', function () {
        if ($scope.result) {
            $scope.params.notes = deal.pipeline($scope.result);
        }
    });
    $scope.select = function (index) {
        $scope.params.show = index;
    };
}]);


