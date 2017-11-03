$(document).ready(function(){
	// 判斷往上或往下滾動
	let scrollTop_before = $(window).scrollTop();
	let scrollType = '';
	$(window).scroll(function(){
		if($(this).scrollTop() > scrollTop_before){
			scrollType = 'down';
		} else {
			scrollType = 'up';
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
	if ( ele.length ){
		let headerH = 0;
		let ele_Header = $('header');
		let ele_Header_M = $('.mobileHeader');
		let ele_Header_height = 0;
		let ele_Header_M_height = 0;

		if (ele_Header.length){
			let ele_Header_height = $('header').innerHeight();
		}
		if (ele_Header_M.length){
			let ele_Header_M_height = $('header').innerHeight();
		}

		if($(window).width() >= 992){
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
