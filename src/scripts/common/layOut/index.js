var html = require("html/layout.string");
angular.element(document).find("body").addClass("ng-cloak").prepend( html );
require("header");
require("footer");
