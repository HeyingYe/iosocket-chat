function randomColor(){
	var str = '0123456789abcdef';
	var res = '#';
	for(var i=0;i<6;i++){
		var idx = parseInt(Math.random()*str.length);
		res += str[idx];
	}
	return res;
}

//用户信息模块
function createPerson(){
	// var message = msg ? msg : undefined;
	var date = new Date();
	var now = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	return {
		id:parseInt(Math.random() * 1000000000),
		name:$("#nickname").val(),
		time:now,
		uclor:randomColor()
	}
}
