function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setPicRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.pic');
		t.height(t.width()*$(this).attr('data-ratio'));
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:960px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	function setIntro() {
		var t = $('.introduction, .introduction a, .introduction .inner');
		if ( !isMobile ) {
			t.height(765);
			var bgHeight = 100;
		} else {
			t.height($(window).width()*320/330);
			var bgHeight = 70;
		}
		$('.introduction .item img').each(function() {
			$(this).parent().css({
				'background': '#ededed url("'+$(this).attr('src')+'") no-repeat center top',
				'background-size': 'auto '+bgHeight+'%'
			});
		});
	}
	function setCollections() {
		var t = $('.collections__slider .item, .collections__slider a');
		if ( !isMobile ) {
			t.height(560);
		} else {
			t.height($(window).width()*320/300);
		}
	}
	$('.introduction').slick({
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300
	});
	$('.collections__slider img').each(function() {
		if ( !isMobile ) {
			$(this).parent().css({
				'background': 'url("'+$(this).attr('src')+'") no-repeat center top',
				'background-size': 'auto 100%'
			});
		}
	});
	$('.collections__slider').slick({
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300,
		responsive: [
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 1,
					centerMode: false,
					variableWidth: false,
					adaptiveHeight: true
				}
			}
		]
	});
	$('.catalog-news__slider').slick({
		slidesToScroll: 4,
		slidesToShow: 4,
		arrows: false,
		dots: true,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300,
		responsive: [
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 3,
					slidesToShow: 3
				}
			}, {
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToShow: 2
				}
			}
		]
	});
	$('[data-link]').on('click', function(e) {
		e.preventDefault();
		var t = $('[data-switch="'+$(this).attr('data-link')+'"]');
		if ( t.is(':hidden') ) {
			t.stop().fadeIn(300);
		} else {
			t.stop().fadeOut(300);
		}		
	});
	$('.sizes-table li').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('active') ) {
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
	$('.card__preview').slick({
		slidesToScroll: 1,
		slidesToShow: 5,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		vertical: true,
		speed: 300
	});
	$('.card__pic').slick({
		slidesToScroll: 1,
		slidesToShow: 1,
		arrows: false,
		dots: false,
		infinite: true,
		fade: true,
		cssEase: 'ease-out',
		speed: 300,
		responsive: [
			{
				breakpoint: 960,
				settings: {
					arrows: true,
					dots: true,
					fade: false
				}
			}
		]
	});
	$('.card__preview .pic').on('click', function(e) {
		e.preventDefault();
		$('.card__pic').slick('slickGoTo',parseInt($(this).parent('.item').attr('data')-1));
	});
	$('.card__more--head').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-dropped');
	});
	$('.card--favorite span, .basket__item--favorite').on('click', function(e) {
		e.preventDefault();
		if ( !isMobile ) {
			var timerShow, timerHide;
			clearTimeout(timerShow, timerHide);
			if ( $(document).scrollTop > 0 ) {
				var delay = 1000;
			} else {
				var delay = 0;
			}
			$('html, body').stop().animate({
				scrollTop: 0
			}, 1000);
			var t = $('.header--favorite');
			timerShow = setTimeout(function() {
				if ( !t.hasClass('is-added') ) {
					t.addClass('is-added');
				} else {
					t.removeClass('is-added');
				}
				t.addClass('is-active');
			}, delay);
			timerHide = setTimeout(function() {
				t.removeClass('is-active');
			}, delay+4000);
		}
		$(this).toggleClass('is-added');
	});
	$('.quantity-e .minus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
    });
	$('.quantity-e .plus').on('click', function(e) {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
	});
	$('.header--link_basket').on('click', function(e) {
		if ( !isMobile ) {
			e.preventDefault();	
			var t = $('.header--basket');
			if ( !t.hasClass('is-active') ) {
				t.addClass('is-active');
			} else {
				t.removeClass('is-active');
			}
			$('.header--search').removeClass('is-active');
		}
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade-bg').stop().fadeIn(200);
		t.stop().fadeIn(200);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		var diff = 34;
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').stop().fadeOut(200);
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target]').stop().fadeOut(200).removeClass('is-active');
		$('.fade-bg').stop().fadeOut(200);
	});
	$('.about__slider').slick({
		slidesToScroll: 1,
		slidesToShow: 1,
		arrows: false,
		dots: true,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300
	});
	$('.may-like__slider').slick({
		slidesToScroll: 6,
		slidesToShow: 6,
		arrows: false,
		dots: true,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300,
		responsive: [
			{
				breakpoint: 1230,
				settings: {
					slidesToShow: 5,
					slidesToShow: 5
				}
			}
		]
	});
	function equalHeight(e) {
		e.each(function() {
			var t = $(this);
			if ( !isMobile ) {
				var rows = Math.floor(t.find('[data-container]').size()/2);
				for ( var i=0; i<rows; i++ ) {
					var max = 0;
					for ( var j=1; j<=2; j++ ) {
						var h = t.find('[data-container="'+parseInt(i*2+j)+'"] [data-item]').height(); 
						max = h > max ? h : max;
					}
					for ( var j=1; j<=2; j++ ) {
						t.find('[data-container="'+parseInt(i*2+j)+'"] [data-item]').height(max); 
					}
				}
			} else {
				t.find('[data-item]').height('auto');
			}
		});
	}
	$(window).on('resize', function() {
		detectDevice();
		setPicRatio();
		setIntro();
		setCollections();
		equalHeight($('[data-equal]'));
		if ( justSwitched ) {
			if ( isMobile ) {
				$('.header').prepend('<span class="menu-open"></span>');
				$('.header--phone').detach().prependTo('.nav');
				$('.nav, .header--search').prepend('<span class="close"></span>');
				$('.header--search').prepend('<span class="find"></span>').prepend('<span class="clear"></span>');
				$('.nav > *').wrapAll('<div class="nav__wrap"></div>');
				$('.header--search').detach().appendTo('body');
				$('.filter').prepend('<h4 class="title">Фильтр</h4>');
				$('.card--title').detach().insertAfter('.breadcrumbs');
			} else {
				$('.menu-open, .nav .close, .header--search .close, .header--search .find, .header--search .clear, .filter .title').remove();
				$('.header--phone').detach().prependTo('.header--rc');
				$('.nav__wrap > *').unwrap();
				$('.header--search').detach().appendTo('.header');
				$('.card--title').detach().prependTo('.card__info');
			}
		}
	});
	$(window).trigger('resize');
	$('.footer__nav h5').on('click', function(e) {
		if ( isMobile ) {
			e.preventDefault();
			$(this).toggleClass('is-dropped');
		}
	});
	function showMobileMenu() {
		$('.nav').addClass('is-active');
		$('body').addClass('scroll-lock');
		$('.header--search').removeClass('is-active');
		$('.fade-bg').stop().fadeIn(300);
	}
	function hideMobileMenu() {
		$('.nav').removeClass('is-active');
		$('body').removeClass('scroll-lock');
		$('.fade-bg').stop().fadeOut(300);
	}
	$(document).on('click', '.menu-open', function(e) {
		e.preventDefault();
		showMobileMenu();
	});
	$(document).on('click', '.nav .close', function(e) {
		e.preventDefault();
		hideMobileMenu();
	});
	$(document).on('click', '.header--search .close', function(e) {
		e.preventDefault();
		$('.header--search').removeClass('is-active');
		$('body').removeClass('scroll-lock');
		$('.fade-bg').stop().fadeOut(300);
	});
	$(document).on('click', '.header--search .clear', function() {
		$(this).parents('.header--search').find('input[type="text"]').val('');
	});
	$('.header--link_search').on('click', function(e) {
		e.preventDefault();
		var t = $('.header--search');
		if ( !t.hasClass('is-active') ) {
			$('.header--search').addClass('is-active');
			$('.header--basket').removeClass('is-active');
		}
		if ( isMobile ) {
			hideMobileMenu();
			$('body').addClass('scroll-lock');
			$('.fade-bg').stop().fadeIn(300);
		}
	})
	$(document).on('click', function() {
		$('.header--basket, .header--search').removeClass('is-active');
		if ( !$('[data-target]').hasClass('is-active') ) {
			hideMobileMenu();
		}
	});
	$(document).on('click', '.header--link_basket, .header--basket, .header--link_search, .header--search, .menu-open, .nav, [data-open]', function(e) {
		e.stopPropagation();
	});
	$('.shops__cities h5').on('click', function(e) {
		if ( isMobile ) {
			e.preventDefault();
			$(this).toggleClass('is-dropped');
		}
	});
	$(document).on('click', '.filter .title', function(e) {
		$(this).toggleClass('is-dropped');
	});
	$('input[type="checkbox"], input[type="radio"]').uniform();
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.franchise__slider .core').slick({
		slidesToScroll: 1,
		slidesToShow: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300,
		adaptiveHeight: true
	});
	$('.franchise__types .drop').on('click', function() {
		var t = $(this).siblings('.description');
		if ( t.is(':hidden') ) {
			t.addClass('is-dropped');
			$(this).text('Свернуть');
		} else {
			t.removeClass('is-dropped');
			$(this).text('Развернуть');
		}
	});
});