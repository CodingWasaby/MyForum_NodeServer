/// <reference path="..\NodeSnippet\typings\index.d.ts" />
var _ = require('lodash');
var saves = ['profile', 'settings'];
var done = _.after(saves.length, function () {
    console.log('done saving!');
});
_.forEach(saves, function (type) {
    console.log(type);
    done();
});

var baiduBsSuggest = $("#baidu").bsSuggest({
    allowNoKeyword: false,
    multiWord: true,
    separator: ",",
    getDataMethod: "url",
    url: "http://unionsug.baidu.com/su?p=3&t=" + (new Date()).getTime() + "&wd=",
    jsonp: "cb",
    processData: function(json) {
        var i, len, data = {
            value: []
        };
        if (!json || !json.s || json.s.length === 0) {
            return false
        }
        console.log(json);
        len = json.s.length;
        jsonStr = "{'value':[";
        for (i = 0; i < len; i++) {
            data.value.push({
                word: json.s[i]
            })
        }
        data.defaults = "baidu";
        return data
    }
});

