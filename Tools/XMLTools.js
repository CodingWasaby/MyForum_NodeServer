var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var fs = require('fs');
var fileTool = require('./FileTools');
var config = require('./Config');

exports.addXML = function (arr, xmlName, callBack) {
    fileTool.createTheFolder(config.XMLPath);
    var doc = new DOMParser().parseFromString('<?xml version="1.0" encoding="utf-8" ?>');
    var dataNode = doc.createElement("dataNode");    

    for (var i = 0; i < arr.length; i++) {
        var node = doc.createElement("ArrayData");
        for (key in arr[i]) {
            if (typeof (arr[i][key]) != " function ")
                node.setAttribute(key, arr[i][key]);
        }
        dataNode.appendChild(node);
    }
    doc.appendChild(dataNode);
    var str = new XMLSerializer().serializeToString(doc);
    fs.writeFile(config.XMLPath + xmlName + '.xml', str, function (err) {
        if (err) {
            return console.error(err);
        }
        if (callBack)
            callBack();
    });
}

exports.getXMLData = function (xmlName) {
    var dataArray = [];
    if (!fs.existsSync(config.XMLPath + xmlName + '.xml'))
        return dataArray;

    var data = fs.readFileSync(config.XMLPath + xmlName + '.xml');
    var doc = new DOMParser().parseFromString(data.toString());
    if (doc) {
        var dataNode = doc.childNodes[1];
        for (var i = 0; i < dataNode.childNodes.length; i++) {
            var node = dataNode.childNodes[i];
            if (node.nodeName == 'ArrayData') {
                var obj = {};
                for (var v = 0; v < node.attributes.length; v++) {
                    var att = node.attributes[v];
                    obj[att.name] = att.value;
                }
                dataArray.push(obj);
            }
        }
    }
    return dataArray;
}

exports.removeXML = function (xmlName, callBack) {
    fs.unlink(config.XMLPath + xmlName + '.xml', function (err) {
        if (err) {
            return console.error(err);
        }
        callBack(true);
    });;
}
