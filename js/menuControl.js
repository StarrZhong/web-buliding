$(document).ready(function(){
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
				thisMenu.prepend('<li class="mobileMenu-Back"><span class="icon cusIcon-arrow-left"></span><span class="text">'+thisMenuText+'</span></li>');
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
		$(this).parents('.mobileMenuBox').eq(0).removeClass('show').addClass('hide');
		$(openMenuBox).find('.mobileMenu-Back').attr('data-back',ThisUlId);
		$(openMenuBox).addClass('show');
	});



	$('.hamburger').click(() => {
		$('.mobileMenuBlock').addClass('active');
		$('.coverBody').addClass('show');
		$('html,body').addClass('noScroll').addClass('menuOpen');
		$('.mobileMenuBlock .mobileMenuBox').eq(0).addClass('show');
	});
	$('.mobileMenuBlock__Bg').click(function(){
		$('.mobileMenuBlock').removeClass('active');
		$('.coverBody').removeClass('show');
		$('html,body').removeClass('noScroll').removeClass('menuOpen');
		$('.mobileMenuBlock .mobileMenuBox').removeClass('show');
		$('.mobileMenuBlock .mobileMenuBox').eq(0).addClass('show');
	});
	$('.mobileMenu-Back').click(function() {
		
		let targetBack = $('.mobileMenuBlock .mobileMenuBox.show .mobileMenu-Back').data('back');
		

		if( targetBack == null || targetBack == undefined || targetBack == ''){
			$('.mobileMenuBlock').removeClass('active');
			$('.coverBody').removeClass('show');
			$('html,body').removeClass('noScroll').removeClass('menuOpen');	
		} else {
			$('.mobileMenuBlock .mobileMenuBox.show').removeClass('show');
			$(targetBack).removeClass('hide').addClass('show');
		}
	});
});