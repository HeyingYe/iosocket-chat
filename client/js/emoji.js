var emoji = {
	init:function(){
		//表情加载
		for(var i = 1;i < 69;i++){
			$("<img src='"+"image/emoji/"+i+".gif'>").appendTo(".face");
		}
		$(".emoji img").hover(function(){
			$(this).css({
				border:"1px solid rgb(0,155,219)"
			})
			$(".face").show();
		},function(){	
			$(this).css({
				border:"1px solid rgb(238,238,238)"
			})
			$(".face").hide();
		})
		$(".face").hover(function(){
			$(".emoji img").css({
				border:"1px solid rgb(0,155,219)"
			})
			$(".face").show();
		},function(){
			$(".emoji img").css({
				border:"1px solid rgb(238,238,238)"
			})
			$(".face").hide();
		})
	},
	control:function(){
		$(".face").on("click","img",function(){
			$(this).appendTo("#mesbox")
		})
	}
}