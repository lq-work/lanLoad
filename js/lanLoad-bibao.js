/*
 函数lanLoad（）里面是当显示数据多的时候的 一个懒加载 方法  
 
 当页面滚动到可视窗口的时候才加载数据进去
 
 lanLoad(id,time)  参数  id: #id值   ， time:延时加载时间

页面只需给一个 id名 ：id="id名" ， 
和一张图片img ： <img data-src="到可视窗口时加载图片的路径" src="随便一张loanding.gif图都可以">
 */

function lanLoad(id,time){
	var lazyLoad = (function(){
		var clock;
		
		function init(){
			$(window).on("scroll", function(){
				if (clock) {
					clearTimeout(clock);
				}
				clock = setTimeout(function(){
					checkShow();
				}, time);
			})
			$(window).on("load",fuction(){
			     checkShow();
			})	
			checkShow();
		}
		
		function checkShow(){
			$(id+" img").each(function(){
				var $cur =$(this);
				if($cur.attr('isLoaded')){
	        		return;
	      		}
				if(isVisible($cur)){
					showImg($cur);
				}
			})
		}
	
		function isVisible($node){
			var scrollH = $(window).scrollTop(),
				winH = $(window).height(),
				top = $node.offset().top;
	
			if(top < winH + scrollH){
		  		return true;
		  	}else{
		  		return false;
		  	}
		}
	
		function showImg($node){
	    	$node.attr('src', $node.attr('data-src'));
	    	$node.attr('isLoaded', true);
		}
	
		return {
			init: init
		}
	})()
	 
	lazyLoad.init();
		
}
