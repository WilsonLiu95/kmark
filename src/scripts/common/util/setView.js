// 填充view
angular.setView = function(html) {
    var main = document.getElementById("main");
    angular.element(main).html( html||"<div ng-view></div>");
};
