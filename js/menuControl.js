$(document).ready(function(){
	// 手機版選單建置
	

	var menuCount = 0;
	var menuTotal = 0;
	var menuHTML = '';
	var menuTemplate = '<div class="mobileMenuBox" id="menu_{{id}}"><ul class="mobileMenu">{{menu}}</ul></div>';
	var oldMenuBox = $('.mobileMenuBox');
	var mobileMenuUl = $('.mobileMenuBox ul');
	var coverBody = $('.coverBody');
	var htmlBody = $('html,body');
	mobileMenuUl.each(function(){
		var thisMenu =  $(this);
		if (menuCount == 0){		
			menuCount++;
		} else{
			if( thisMenu.parent('li').length ){
				var thisMenuText = thisMenu.parent('li').find('.text').eq(0).text();
				thisMenu.prepend('<li class="mobileMenu-Back"><span class="icon cusIcon-arrow-left"></span><span class="text">'+thisMenuText+'</span></li>');
				thisMenu.parent('li').attr("data-target",'#menu_'+menuCount);
				menuCount++;
			}
		}
	});


	menuCount = 0;
	mobileMenuUl.each(function(){
		var thisMenu =  $(this);
		$(this).find('ul').remove();
		menuHTML += menuTemplate.replace('{{id}}',menuCount).replace('{{menu}}',thisMenu.html());
		menuCount++;
	});
	oldMenuBox.remove();


	var mobileMenuBlock = $('.mobileMenuBlock');
	
	mobileMenuBlock.find('.mobileMenuBoxArea').append(menuHTML);
	mobileMenuBlock.find('.mobileMenuBox').eq(0).addClass('show');


	$('.mobileMenuBox ul li.more').click(function(){
		var openMenuBox = $(this).data('target');
		var ThisUlId = '#'+$(this).parents('.mobileMenuBox').eq(0).attr('id');
		$(this).parents('.mobileMenuBox').eq(0).removeClass('show').addClass('hide');
		$(openMenuBox).find('.mobileMenu-Back').attr('data-back',ThisUlId);
		$(openMenuBox).addClass('show');
	});



	$('.hamburger').click(function() {
		mobileMenuBlock.addClass('active');
		coverBody.addClass('show');
		htmlBody.addClass('noScroll').addClass('menuOpen');
		mobileMenuBlock.find('.mobileMenuBox').eq(0).addClass('show');
	});
	$('.mobileMenuBlock__Bg').click(function(){
		mobileMenuBlock.removeClass('active');
		coverBody.removeClass('show');
		htmlBody.removeClass('noScroll').removeClass('menuOpen');
		mobileMenuBlock.find('.mobileMenuBox').removeClass('show').removeClass('hide').eq(0).addClass('show');
	});
	$('.mobileMenu-Back').click(function() {
		
		var targetBack = $('.mobileMenuBlock .mobileMenuBox.show .mobileMenu-Back').data('back');
		

		if( targetBack == null || targetBack == undefined || targetBack == ''){
			mobileMenuBlock.removeClass('active');
			coverBody.removeClass('show');
			htmlBody.removeClass('noScroll').removeClass('menuOpen');	
		} else {
			mobileMenuBlock.find('.mobileMenuBox.show').removeClass('show');
			$(targetBack).removeClass('hide').addClass('show');
		}
	});
});