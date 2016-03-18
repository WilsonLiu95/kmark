/**
 * Created by WilsonLiu on 2016/2/11.
 */

var html = require('html/footer.string');
app.directive("footer",function(){
    return {
        restrict:"AE",
        template:html
    };
});
