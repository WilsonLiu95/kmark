/**
 * Created by WilsonLiu on 2016/2/11.
 */
var html = require("html/header.string");
app.controller("headerController",["$scope", function ($scope) {

}]).directive("header", function () {
    return {
        restrict: "AE",
        template: html,
        controller: "headerController"
    }

})