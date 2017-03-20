module.exports = function(io){
	var personData = [];//用户信息存储
	//监听用户连接事件
	io.on("connection",function(socket){
		socket.on("online",function(personStr){
			//将用户信息存储
			var personObj = JSON.parse(personStr);
			personData.push(personObj);
			//向所有人发送上线提示
			io.emit("onlineTips",JSON.stringify(personData))
		})
		//定义发送信息事件
		socket.on("sendMsg",function(personStr){
			// var personObj = JSON.parse(personStr);
			console.log(personStr)
			io.emit("showMsg",personStr);
		})
		//定义下线事件
		socket.on("offline",function(personStr){			
			var personObj = JSON.parse(personStr);
			for(var i in personData){
				console.log(personData[i])
				//删除用户信息
				if(personData[i]){
					if(personObj.id == personData[i].id){
						personData[i] = undefined;
					}
				}
			}
			io.emit("offlineTips",JSON.stringify(personObj));
			// var personObj = JSON.parse(personStr);
			// personData[personObj.id] = undefined;
			// io.emit("offlineTips",JSON.stringify(personObj))
		})
	})
}