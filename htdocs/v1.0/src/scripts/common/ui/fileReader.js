/**
 * Created by WilsonLiu on 2016/2/13.
 */
app.directive('fileReader', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrls) {
            var readfile = function () {
                var reader = new FileReader();
                var file = el[0].files[0];
                if (file) {
                    reader.readAsText(file);
                    reader.onload = function () {
                        scope.$apply(function () {
                            scope[attrs.fileReader] = reader.result;
                        });
                    }
                }
                return el[0].value; //不应该改变原有的逻辑~所以返回文件的路径
            };
            ctrls.$parsers.push(readfile);  //当model改变时触发的管道函数
        }
    }
});