window.onload = function(){
	var data = {};//该用户的信息
	var socket = null;
	//聚焦在输入框
	$("#nickname").focus();

	//键盘监听
	window.onkeyup = function(e){
		var evt = e || event;
		if(evt.keyCode == 13){
			if(!eventObj.islogin){
				//上线
				eventObj.login();
			}else{
				//登录
				eventObj.send()
			}
		}
	}
	window.onbeforeunload = function() {
		eventObj.offline();
		return confirm()
	}

	//鼠标监听
	$("#login").click(eventObj.login);
	$("#send").click(eventObj.send)

	//表情加载
	emoji.init();
	emoji.control();
}
