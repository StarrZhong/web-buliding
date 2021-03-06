var scrollType = { "type": "default"};
var hamburgerPoint = 992;
$(document).ready(function(){
	// 判斷往上或往下滾動
	let scrollTop_before = $(window).scrollTop();
	$(window).scroll(function(){
		if($(this).scrollTop() > scrollTop_before){
			scrollType.type = 'down';
		} else {
			scrollType.type = 'up';
		}
		scrollTop_before = $(this).scrollTop();
	});
	// 滾動動畫設定
	$('.scrollAnimate').each(function(){
		var animate = $(this).data('animate');
		scrollAnimateSet($(this),animate);
		scrollAnimate($(this));
	});
	// 燈箱設定
	$('.lightBox-open').click(function(){
		let target_LB = $(this).data('target');
		if ( $(target_LB).length ){
			$(target_LB).addClass('active');
		}
	});
	$('.lightbox').on('click','.lightbox__Bg, .lightbox__close',function(){
		$(this).parents('.lightbox').removeClass('active');
	});
	// 滾動定位
	$('.scrollTo').click(function(){
		let targetTo = $(this).data('target');
		if ( $(targetTo).length ){
			scrollTo( $(targetTo) );
		}
	});
	//itemImg裡面圖片沒有圖的預設圖
	$('.itemImg').each(function(){
		var thisItemImg = $(this);
		var image = new Image();
		image.src = $(this).children('img').attr('src');
		image.onerror = function(){	
			thisItemImg.addClass('noneImg');
		}
	});
	
});


// 滾動到定位
function scrollTo(ele){
	var breakPoint = 992;
	if ( ele.length ){
		var headerH = 0;
		var ele_Header = $('header');
		var ele_Header_M = $('.mobileHeader');
		var ele_Header_height = 0;
		var ele_Header_M_height = 0;

		if (ele_Header.length){
			var ele_Header_height = ele_Header.innerHeight();
		}
		if (ele_Header_M.length){
			var ele_Header_M_height = ele_Header_M.innerHeight();
		}

		if( window.innerWidth >= breakPoint){
			headerH = ele_Header_height;
		} else {
			headerH = ele_Header_M_height;
		}
		var targetTop = ele.offset().top;
		
		var scrollTarget = targetTop - headerH;
		$('html,body').stop().animate({
			scrollTop: scrollTarget
		},300);
	}
}

// 滾動動畫
function scrollAnimate(ele){
	var animate = ele.data('animate');
	$(window).scroll(function(){
		scrollAnimateSet(ele,animate);
	});
}
function scrollAnimateSet(ele,animate){
	var windowHeight = $(window).outerHeight();
	var WHPercent = 0.75;
	var scrollTop = $(window).scrollTop();
	var scrollEdge = scrollTop + windowHeight * WHPercent;
	var elementTop = ele.offset().top;
	if (animate != '' && animate != null && animate != undefined){
		if( scrollEdge >= elementTop ){
			ele.addClass('animated '+animate);
		} else {
			// ele.removeClass(animate);
		}
	} else {
		if( scrollEdge >= elementTop ){
			ele.addClass('cusAnimated');
		} else {
			// ele.removeClass('cusAnimated');
		}
	}
	
}

function getHeader(){
	var window_w = window.innerWidth;
	if(window_w > hamburgerPoint){
		return $('header').innerHeight();
	} else {
		return $('.mobileHeader').innerHeight();
	}
}

/*================================================================
功能：調整編輯器內容的表格與影片
================================================================*/

$(document).ready(function(){
	
	if ( $('.editorBlock').length ){

		var editorName = $('.editorBlock');

		var tableClass = 'editorTable';
		var targetTable = editorName.find('table');
		if ( targetTable.length ){
			targetTable.wrap('<div class="'+tableClass+'"></div>');
			editorName.find('.'+tableClass).css({
				"max-width" : "100%",
				"width" :　"100%",
				"display" : "inline-block",
				"overflow" : "auto"
			});
		}
		
		var iframeClass = 'editorIframe';
		var targetIframe = editorName.find('iframe');
		if ( targetIframe.length ){
			targetIframe.each(function() {
				rebuildIframe(editorName, $(this) , iframeClass);
			});
		}

	}
});
function rebuildIframe(editorBlock ,ele , iframeClass){
	var targetIframeH = ele.outerHeight();
	var targetIframeW = ele.outerWidth();
	var proportion = targetIframeH / targetIframeW * 100;
	ele.wrap('<div class="'+iframeClass+'"><div></div></div>');
	ele.parent().parent('.'+iframeClass).css({
		"width" : "100%",
		"max-width" : targetIframeW + 'px',
		"display" : 'inline-block'
	});
	ele.parent('div').css({
		"height" :  0,
		"width" : "100%",
		"position" : "relative",
		"padding-bottom" : proportion+"%",
		"overflow" : "hidden"
	})
	ele.css({
		"height" :  "100%",
		"width" : "100%",
		"position" : "absolute",
		"top" : "50%",
		"left" : "50%",
		"transform" : "translate(-50%,-50%)",
		"-webkit-transform" : "translate(-50%,-50%)",
	})
}
