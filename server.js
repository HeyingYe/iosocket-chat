//引用http服务来开启io服务
var express = require("express");

var app = express();

var http = require("http").Server(app);

var io = require("socket.io")(http);

//引入自定义模块
var socket = require("./module_me/socketEvent.js");

var router = require("./module_me/router.js");

http.listen(8080,function(){
	console.log("listen 8080")
})

//开启路由
router(app);

//开启socket事件
socket(io);

