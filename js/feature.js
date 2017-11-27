var scrollType = { "type": "default"};
$(document).ready(function(){
	// 判斷往上或往下滾動
	let scrollTop_before = $(window).scrollTop();
	let scrollType = '';
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
		scrollAnimateSet($(this));
		scrollAnimate($(this));
	});
	// 燈箱設定
	$('.lightBox-open').click(function(){
		let target_LB = $(this).data('target');
		if ( $(target_LB).length ){
			$(target_LB).addClass('active');
		}
	});
	// 滾動定位
	$('.scrollTo').click(function(){
		let targetTo = $(this).data('target');
		if ( $(targetTo).length ){
			scrollTo( $(targetTo) );
		}
	});
	
});


// 滾動到定位
function scrollTo(ele){
	let breakPoint = 992;
	if ( ele.length ){
		let headerH = 0;
		let ele_Header = $('header');
		let ele_Header_M = $('.mobileHeader');
		let ele_Header_height = 0;
		let ele_Header_M_height = 0;

		if (ele_Header.length){
			let ele_Header_height = ele_Header.innerHeight();
		}
		if (ele_Header_M.length){
			let ele_Header_M_height = ele_Header_M.innerHeight();
		}

		if($(window).width() >= breakPoint){
			headerH = ele_Header_height;
		} else {
			headerH = ele_Header_M_height;
		}
		let targetTop = ele.offset().top;
		
		let scrollTarget = targetTop - headerH;
		$('html,body').stop().animate({
			scrollTop: scrollTarget
		},300);
	}
}

// 滾動動畫
function scrollAnimate(ele){
	$(window).scroll(function(){
		scrollAnimateSet(ele);
	});
}
function scrollAnimateSet(ele){
	let windowHeight = $(window).outerHeight();
	let WHPercent = 0.75;
	let scrollTop = $(window).scrollTop();
	let scrollEdge = scrollTop + windowHeight * WHPercent;
	let elementTop = ele.offset().top;

	if( scrollEdge >= elementTop ){
		ele.removeClass('scrollAnimate');
	} else {
		// ele.addClass('scrollAnimate');
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
