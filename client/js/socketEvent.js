function socketEvent(socket){
	var num;
	//用户上线事件
	socket.on("onlineTips",function(personStr){
		num = 0;
		var personObj = JSON.parse(personStr);
		//在线用户
		for(var i in personObj){
			if(personObj[i]){
				console.log(num)
				num++;
				if(!$('#' + personObj[i].id)[0]){
					//不存在则创建
					$(".msgList").append("<p id='" + personObj[i].id + "'><span class='uclor" + personObj[i].id + "'>" + personObj[i].name + "</span> (" + personObj[i].time + " )" + "  join in chat" + "</p>")
					$(".users>ul").append("<li class='" + personObj[i].id + "'>" + personObj[i].name + "</li>");
					$(".uclor" + personObj[i].id).add("."  + personObj[i].id).css({
						color:personObj[i].uclor
					})
				}
			}
			
		}
		$(".num").text(num);
		//内容刷新，自动滚动
		var scrolll = $(".msgList")[0].scrollHeight - $(".msgList")[0].offsetHeight;
		if(scrolll > 0){
			$(".msgList").scrollTop(scrolll);
		}
	})
	//用户发送信息
	socket.on("showMsg",function(personStr){
		var personObj = JSON.parse(personStr);
		$(".msgList").append("<p id='" + personObj.id + "'><span class='uclor" + personObj.id + "'>" + personObj.name + "</span> (" + personObj.time + " ) : " + personObj.msg + "</p>");
		$(".uclor"+personObj.id).css({
			color:personObj.uclor
		})
		//内容刷新，自动滚动
		var scrolll = $(".msgList")[0].scrollHeight - $(".msgList")[0].offsetHeight;
		if(scrolll > 0){
			$(".msgList").scrollTop(scrolll);
		}
	})
	//用户下线
	socket.on("offlineTips",function(personStr){
		console.log("下线")
		var personObj = JSON.parse(personStr);
		//退出提示
		$(".msgList").append("<p id='" + personObj.id + "'><span class='uclor" + personObj.id + "'>" + personObj.name + "</span> (" + personObj.time + " )" + "  quit in chat" + "</p>")
		$(".uclor" + personObj.id).add("."  + personObj.id).css({
			color:personObj.uclor
		})
		//下线
		$("." + personObj.id).remove();
		//在线用户显示
		num--;
		$(".num").text(num);
		//内容刷新，自动滚动
		var scrolll = $(".msgList")[0].scrollHeight - $(".msgList")[0].offsetHeight;
		if(scrolll > 0){
			$(".msgList").scrollTop(scrolll);
		}
	})
}
//事件对象
var eventObj = {
	islogin:false,
	login:function(){
		//输入nickname上线
		if($("#nickname").val() && !this.islogin){
			//用户名
			$(".name").text($("#nickname").val())
			//关闭罩层
			$(".wrap").hide();
			//socket
			socket = io.connect("ws://10.3.135.48:8080");
			//该用户的信息
			data = createPerson();
			//触发SERVER登录事件
			socket.emit("online",JSON.stringify(data));
			//改变登录状态
			eventObj.islogin = true;
			//聚焦
			$("#mesbox").focus();
			//定义socket事件
			socketEvent(socket);		
		}
	},
	send:function(){
		// console.log(this.islogin)
		//用户发送信息
		if($("#mesbox").html()){
			data.msg = $("#mesbox").html().replace(/\<div\>|\<\/div\>|\<br\>/,"") ;
			console.log(data.msg)
			socket.emit("sendMsg",JSON.stringify(data));
			//清空
			$("#mesbox").html("");
		}
		return false;
	},
	offline:function(){
		socket.emit("offline",JSON.stringify(data))
	}
}