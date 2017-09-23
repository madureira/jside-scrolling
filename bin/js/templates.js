Game.templates["loader_loader"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
Game.templates["sound_markup"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<audio id=\"sound-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" controls=\"\">\r\n    <source src=\""
    + alias3(((helper = (helper = helpers.ogg || (depth0 != null ? depth0.ogg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ogg","hash":{},"data":data}) : helper)))
    + "\" type=\"audio/ogg\">\r\n    <source src=\""
    + alias3(((helper = (helper = helpers.mp3 || (depth0 != null ? depth0.mp3 : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"mp3","hash":{},"data":data}) : helper)))
    + "\" type=\"audio/mp3\">\r\n</audio>\r\n";
},"useData":true});
Game.templates["stage_main"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"inner-stage\">\r\n    <h1>Donkey Kong Country</h1>\r\n    "
    + ((stack1 = ((helper = (helper = helpers.viewport || (depth0 != null ? depth0.viewport : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"viewport","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n    <div id=\"videos\"></div>\r\n    <div id=\"sounds\"></div>\r\n    <div id=\"loader\"><span>Loading...</span></div>\r\n    <p class=\"jside-scrolling-link\">Powered by &nbsp;&nbsp;\r\n        <a href=\"https://github.com/madureira/jside-scrolling\" target=\"_blank\">jside-scrolling</a>\r\n    </p>\r\n</div>\r\n";
},"useData":true});
Game.templates["stage_viewport"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\"viewport\">\r\n    <canvas id=\"board\" width=\""
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + "\" height=\""
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + "\">\r\n        <p>Your browser does not support the canvas element.</p>\r\n    </canvas>\r\n</div>\r\n";
},"useData":true});
Game.templates["video_markup"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<!--video id=\"video-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" width=\""
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + "\" height=\""
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + "\" class=\"hide\" preload=\"none\"-->\r\n<video id=\"video-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" width=\""
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + "\" height=\""
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + "\" class=\"hide\">\r\n    <source src=\""
    + alias3(((helper = (helper = helpers.videoPath || (depth0 != null ? depth0.videoPath : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"videoPath","hash":{},"data":data}) : helper)))
    + ".mp4\" type=\"video/mp4\">\r\n</video>\r\n";
},"useData":true});