var express = require("express");
var path = require("path");
module.exports = function(app){
	app.use(express.static(path.join(__dirname,"../client")))
	app.get("/",function(req,res){
		console.log(__dirname)
		// console.log(11)
		res.send("aaa");
	})
}

