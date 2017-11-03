$(document).ready(function(){
	$('.hamburger').click(() => {
		$('.mobileMenuBlock').addClass('active');
		$('html,body').addClass('noScroll');	
	});
	$('.mobileMenuBlock__Close').click(() => {
		$('.mobileMenuBlock').removeClass('active');
		$('html,body').removeClass('noScroll');	
		$('.mobileMenuBlock .mobileMenuBox').removeClass('show').removeClass('hideLeft').eq(0).addClass('show');
	});
	$('.mobileMenuBlock__Back').click(function() {
		let targetBack = $('.mobileMenuBlock .mobileMenuBox.show .memuTitle').data('back');
		$('.mobileMenuBlock .mobileMenuBox.show').removeClass('show');
		$(targetBack).removeClass('hideLeft').addClass('show');
		targetBack = $('.mobileMenuBlock .mobileMenuBox.show .memuTitle').data('back');
		console.log(targetBack);
		if( targetBack == null || targetBack == undefined || targetBack == ''){
			$(this).removeClass('show');
		}
	});
	$(window).scroll(function(){
		let headerH = getHeaderHeight();
		let thisScrollTop = $(this).scrollTop();
		if(thisScrollTop > headerH){
			$('header').addClass('scroll');
		} else {
			$('header').removeClass('scroll');
		}
	});




	// 手機版選單建置
	

	let menuCount = 0;
	let menuTotal = 0;
	let menuHTML = '';
	let menuTemplate = '<div class="mobileMenuBox" id="menu_{{id}}"><ul class="mobileMenu">{{menu}}</ul></div>';
	let oldMenuBox = $('.mobileMenuBox');
	$('.mobileMenuBox ul').each(function(){
		let thisMenu =  $(this);
		if (menuCount == 0){		
			menuCount++;
		} else{
			if( thisMenu.parent('li').length ){
				let thisMenuText = thisMenu.parent('li').find('.text').eq(0).text();
				thisMenu.prepend('<li href="javascript:void(0);" class="memuTitle">'+thisMenuText+'</li>');
				thisMenu.parent('li').attr("data-target",'#menu_'+menuCount);
				menuCount++;
			}
		}
	});
	menuCount = 0;
	$('.mobileMenuBox ul').each(function(){
		let thisMenu =  $(this);
		$(this).find('ul').remove();
		menuHTML += menuTemplate.replace('{{id}}',menuCount).replace('{{menu}}',thisMenu.html());
		menuCount++;
	});
	oldMenuBox.remove();
	$('.mobileMenuBlock .mobileMenuBoxArea').append(menuHTML);
	$('.mobileMenuBlock .mobileMenuBox').eq(0).addClass('show');


	$('.mobileMenuBox ul li.more').click(function(){
		let openMenuBox = $(this).data('target');
		let ThisUlId = '#'+$(this).parents('.mobileMenuBox').eq(0).attr('id');
		$(this).parents('.mobileMenuBox').eq(0).removeClass('show').addClass('hideLeft');
		$(openMenuBox).find('.memuTitle').attr('data-back',ThisUlId);
		$(openMenuBox).addClass('show');
		$('.mobileMenuBlock__Back').addClass('show');
	});
});

