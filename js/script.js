(function ($) {
	'use strict';

	/*-------------------------------------------------------------------------------
	  Header
	-------------------------------------------------------------------------------*/

	if ($('.header').length) {
		var offset = $('.header').outerHeight() + $(window).height() / 2;
		$(window).on('scroll', function () {
			var scroll = $(window).scrollTop();
			if (scroll >= offset) {
				$('.header__content').addClass('fixed');
			} else {
				$('.header__content').removeClass('fixed');
			}
		});
	}

	$('.a-toggle-nav').on('click', function () {
		if ($('html').hasClass('menu-opened')) {
			setTimeout(function () {
				$('html').removeClass('menu-opened');
			}, 400);
			// $('.navbar__nav, .navbar__search, .modal').slideUp();
			$('.dropdown').removeClass('opened');
			$('.dropdown__menu').slideUp();
		} else {
			$('html').addClass('menu-opened');
			// $('.navbar__nav').slideDown();
		}
	});

	$('.a-search-toggle').on('click', function(){
		$('.search').toggle();
	});

	$('.app__close').on('click', function(){
		$('.app').hide();
	});

	/*-------------------------------------------------------------------------------
	  Dropdown
	-------------------------------------------------------------------------------*/

	$('.dropdown__toggle').on('click', function(e){
		if ( $(window).width() < 1200 ) {
			// if ( ! $(this).closest('.dropdown').hasClass('opened')) {
				// $('.dropdown').removeClass('opened');
				$(this).closest('.dropdown').toggleClass('opened').find('.dropdown__menu').slideToggle();
				return false;
			// }
		}
	});

	$('body').on('click', function (e) {
		if ( $(window).width() < 1200 ) {
			$('.dropdown').removeClass('opened');
			$('.dropdown__menu').slideUp();
		} else {
			$('.dropdown').removeClass('opened');
		}
	});

	$('.dropdown__menu').click(function (e) {
		// e.stopPropagation();
	});

	/*-------------------------------------------------------------------------------
	  Collapse
	-------------------------------------------------------------------------------*/

	$('.collapse__toggle').on('click', function(){
		if ( $(window).width() > 992 && $(window).width() < 1200) {
			if(!$(this).closest('.collapse').hasClass('opened')) {
				if($(this).hasClass('filter__header')) {
					$('.collapse__body').slideUp();
					$('.collapse').removeClass('opened');
				}
			}
		}

		$(this).closest('.collapse').toggleClass('opened').find('.collapse__body').first().slideToggle();
		$('.filter').toggleClass('subfilter');
		$('.dropdown').removeClass('opened');
		$('.dropdown__menu').slideUp();

		return false;
	});

	$('.filter__clear a').on('click', function(){
		$(this).parents('.filter__group').removeClass('active');
		return false;
	});

	$('.collapse__toggle a:not(.clear)').on('click', function(){
		window.location = $(this).attr('href');
		return false;
	});

	$('.filter__show-all a').on('click', function(){
		$(this).closest('.filter__box').toggleClass('all')
		return false;
	});

	// $('.section--collapse .collapse__toggle .btn').on('click', function(){
	// 	Fancybox.bind('[data-fancybox]', {
	// 		Thumbs: false,
	// 		placeFocusBack: false,
	// 		Toolbar: false,
	// 	});
	// 	// return false;
	// });


	/*-------------------------------------------------------------------------------
	  Tabs
	-------------------------------------------------------------------------------*/

	$('.tabs__link').on('click', function(){
		var tabName = $(this).attr('data-tab');
		if (tabName.length) {
			$(this).closest('.tabs').find('.tabs__item.active').removeClass('active');
			$(this).closest('.tabs__item').addClass('active');
			$(this).closest('.tabs').find('.tabs__pane.show').removeClass('show');
			$('#' + tabName + '').addClass('show');

			// ScrollTrigger.refresh();

			if ($(this).closest('.tabs').hasClass('brands__lang')) {
				$('.toggletext').html($(this).attr('data-lang'));
				$('.dropdown__menu').slideUp();
			}
		}
		return false;
	});

	/*-------------------------------------------------------------------------------
	  Forms Material
	-------------------------------------------------------------------------------*/

	if ( $('.a-material').length ) {
		$('.a-material .form__control').each(function() {
			if ($(this).val().length > 0 || $(this).attr('placeholder') !== undefined) {
				$(this).closest('.a-material').addClass('active');
			}
		});
		$('.a-material .form__control').focus(function() {
			$(this).closest('.a-material').addClass('active');
		});
		$('.a-material .form__control').blur(function() {
			if ($(this).val() == '' && $(this).attr('placeholder') == undefined) {
				$(this).closest('.a-material').removeClass('active');
			}
		});
		$('.a-material .form__control').change(function() {
			if ($(this).val() == '' && $(this).attr('placeholder') == undefined) {
				$(this).closest('.a-material').removeClass('active');
			} else {
				$(this).closest('.a-material').addClass('active');
			}
		});
	}

	$('.toggle-pass').on('click', function(){
		let eye = $(this),
			eyeI = eye.closest('.form__group').find('.form__control');
		if(eye.hasClass('show')) {
			eye.removeClass('show');
			eyeI.attr('type', 'password');
		} else {
			eye.addClass('show');
			eyeI.attr('type', 'text');
		}
	});

	$('.a-check-all').on('change', function(){
		if ($(this).is(':checked')) {
			$('.check-all-group input[type=checkbox]').each(function() {
				$(this).attr('checked', 'checked');
			});
		} else {
			$('.check-all-group input[type=checkbox]').each(function() {
				$(this).removeAttr('checked');
			});
		}
	});

	$('.push .form__control').keydown(function(e){
		$(this).val('');
	});
	$('.push .form__control').keyup(function(e){
		let wrap = $('.push'),
			inputs = wrap.find('.form__control'),
			val = $(this).val();
		// Ввод только цифр
		if(val == val.replace(/[0-9]/, '')) {
			$(this).val('');
			return false;
		}
		// Передача фокуса следующему innput
		inputs.eq(inputs.index(this) + 1).focus();
		// Заполнение input hidden
		var fullval = '';
		inputs.each(function(){
			fullval = fullval + (parseInt($(this).val()) || '0');
		});
		wrap.find('input[type="hidden"]').val(fullval);
	});


	/*-------------------------------------------------------------------------------
	  Forms Add Photo
	-------------------------------------------------------------------------------*/

	let maxFileSize = 2 * 1024 * 1024, // (2mB)
		queue = {},
		form = $('.add-testimonial__form'),
		imagesList = $('#uploadImagesList'),
		itemPreviewTemplate = imagesList.find('.add-testimonial__photo.template').clone();
	itemPreviewTemplate.removeClass('template');
	imagesList.find('.add-testimonial__photo.template').remove();

	$('#addImages').on('change', function () {
		let files = this.files;
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			if ( !file.type.match(/image\/(jpeg|jpg|png|gif)/) ) {
				alert( 'Фотография должна быть в формате jpg, png или gif' );
				continue;
			}
			if ( file.size > maxFileSize ) {
				alert( 'Размер фотографии не должен превышать 2 Мб' );
				continue;
			}
			preview(files[i]);
		}
		this.value = '';
		if (!$(this).attr('multiple')) {
			$(this).closest('.add-testimonial__btn').hide();
		}
	});

	function preview(file) {
		let reader = new FileReader();
		reader.addEventListener('load', function(event) {
			let img = document.createElement('img'),
				itemPreview = itemPreviewTemplate.clone();
			itemPreview.find('.add-testimonial__img img').attr('src', event.target.result);
			itemPreview.data('id', file.name);
			imagesList.append(itemPreview);
			queue[file.name] = file;
		});
		reader.readAsDataURL(file);
	}
	// Удаление фотографий
	imagesList.on('click', '.add-testimonial__remove', function () {
		let item = $(this).closest('.add-testimonial__photo'),
			id = item.data('id');
		delete queue[id];
		item.remove();
		$('.add-testimonial__btn').show();
	});
	// Отправка формы
	form.on('submit', function(event) {
		let formData = new FormData(this);
		for (let id in queue) {
			formData.append('images[]', queue[id]);
		}
		$.ajax({
			url: $(this).attr('action'),
			type: 'POST',
			data: formData,
			async: true,
			success: function (res) {
				alert(res)
			},
			cache: false,
			contentType: false,
			processData: false
		});
		return false;
	});





	$('.a-add-new-list').on('click', function(){
		$(this).hide();
		$('.add-new-list__form').show();
	});

	$('.a-hide-new-list').on('click', function(){
		$('.a-add-new-list').show();
		$('.add-new-list__form').hide();
	});



	$('.abc__link').on('click', function(){
		$(this).parent().toggleClass('active');
		return false
	});

	$('.switch__toggler').on('click', function(){
		$(this).toggleClass('active');
	});

	$('.add-to-favorite, .add-to-wait').on('click', function(){
		$(this).toggleClass('active');
	});

	$('.add-to-cart').on('click', function(){
		$('.header__cart').addClass('visible');
		$(this).toggleClass('active');
	});

	$('.add-to-cart-btn').on('click', function(){
		// setTimeout(function () {
		// 	$(this).addClass('active').html('ПЕРЕЙТИ К ОФОРМЛЕНИЮ');
		// }, 400);
	});

	$('.header__cart-footer [data-fancybox-close]').on('click', function(){
		$('.header__cart').removeClass('visible');
	});

	$('.item-feedback .btn-rounded').on('click', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).closest('.item-feedback').find('.active').removeClass('active');
			$(this).addClass('active');
		}
	});

	/*-------------------------------------------------------------------------------
      Fancybox init
    -------------------------------------------------------------------------------*/

	Fancybox.bind('[data-fancybox]', {
		Thumbs: false,
		placeFocusBack: false,
		// closeButton: false,
		// showClass: "slideUp",
		// hideClass: "slideDown",
		Toolbar: false,
	});

	$('.modal [data-fancybox]').on('click', function() {
		Fancybox.close();
	});

	// $('.btn--quick').on('click', function (){
		// swiper.init(el)
	// })

	/*-------------------------------------------------------------------------------
	  Carousel Brands
	-------------------------------------------------------------------------------*/

	let swiperBrands = new Swiper('.a-carousel-brands', {
		slidesPerView: '5',
		spaceBetween: 20,
		watchSlidesProgress: true,
		speed: 900,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			prevEl: '.btn-prev',
			nextEl: '.btn-next',
		},
		breakpoints: {
			1600: {
				slidesPerView: '6',
			}
		},
	});

	/*-------------------------------------------------------------------------------
	  Carousel Promo
	-------------------------------------------------------------------------------*/

	let swiperPromo = new Swiper('.a-carousel-promo', {
		slidesPerView: '1',
		spaceBetween: 20,
		watchSlidesProgress: true,
		// freeMode: true,
		speed: 900,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});

	/*-------------------------------------------------------------------------------
	  Carousel Product
	-------------------------------------------------------------------------------*/

	let swiperProduct = new Swiper('.a-carousel-product', {
		slidesPerView: '2',
		spaceBetween: 20,
		watchSlidesProgress: true,
		freeMode: true,
		speed: 900,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			768: {
				slidesPerView: '2',
				spaceBetween: 22,
				freeMode: true,
				// slidesPerGroup: '2',
			},
			992: {
				slidesPerView: '3',
				spaceBetween: 30,
				freeMode: false,
				// slidesPerGroup: '3',
			},
			1200: {
				 slidesPerView: '5',
				 spaceBetween: 30,
				 freeMode: false,
				 // slidesPerGroup: '4',
			},
			1600: {
				slidesPerView: '6',
				spaceBetween: 20,
				freeMode: false,
				// slidesPerGroup: '4',
			}
		},
	});

	/*-------------------------------------------------------------------------------
	  Carousel Sale
	-------------------------------------------------------------------------------*/

	let swiperSale = new Swiper('.a-carousel-sale', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		watchSlidesProgress: true,
		freeMode: true,
		speed: 900,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			992: {
				slidesPerView: 2,
				grid: {
					rows: 2,
				},
				spaceBetween: 20,
				freeMode: false,
			},
			1200: {
			 	slidesPerView: '4',
				grid: false,
				spaceBetween: 20,
				freeMode: false,
			}
		},
	});

	/*-------------------------------------------------------------------------------
	  Carousel Review
	-------------------------------------------------------------------------------*/

	let swiperReview = new Swiper('.a-carousel-review', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		watchSlidesProgress: true,
		freeMode: true,
		speed: 900,
		navigation: {
			prevEl: '.btn-prev',
			nextEl: '.btn-next',
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			992: {
				slidesPerView: '2',
				freeMode: false,
			},
			1200: {
				 slidesPerView: '3',
				 freeMode: false,
			},
			1600: {
				slidesPerView: '3',
				freeMode: false,
				// spaceBetween: 45
			}
		},
	});

	/*-------------------------------------------------------------------------------
	  Carousel Article
	-------------------------------------------------------------------------------*/

	let swiperArticle = new Swiper('.a-carousel-article', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		watchSlidesProgress: true,
		freeMode: true,
		speed: 900,
		navigation: {
			prevEl: '.btn-prev',
			nextEl: '.btn-next',
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			992: {
				slidesPerView: '2',
				freeMode: false,
				pagination: false
			},
			1600: {
				slidesPerView: '3',
				freeMode: false,
				pagination: false
			}
		},
	});

	let swiperArticleFull = new Swiper('.a-carousel-article-full', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		watchSlidesProgress: true,
		freeMode: true,
		speed: 900,
		navigation: {
			prevEl: '.btn-prev',
			nextEl: '.btn-next',
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			992: {
				slidesPerView: '2',
				freeMode: false,
				pagination: false
			},
			1200: {
				slidesPerView: '3',
				freeMode: false,
				pagination: false
			},
			1600: {
				slidesPerView: '4',
				freeMode: false,
				pagination: false
			}
		},
	});


	const breakpoint2 = window.matchMedia('(min-width:1200px)');
	let articleSide = document.querySelectorAll('.a-carousel-article-side');
	articleSide.forEach(function(oneSlider) {
		let mySwiper;
		const breakpointChecker = function () {
			if (breakpoint2.matches === true) {
				if (mySwiper !== undefined) mySwiper.destroy(true, true);
				return;
			} else if (breakpoint2.matches === false) {
				return enableSwiper();
			}
		};
		const enableSwiper = function () {
			mySwiper = new Swiper(oneSlider, {
				slidesPerView: 'auto',
				spaceBetween: 20,
				watchSlidesProgress: true,
				freeMode: true,
				speed: 900,
				a11y: true,
				navigation: {
					prevEl: '.btn-prev',
					nextEl: '.btn-next',
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				breakpoints: {
					992: {
						slidesPerView: '2',
						freeMode: false,
						pagination: false
					}
				}
			});
		};
		breakpoint2.addListener(breakpointChecker);
		breakpointChecker();
	});


	/*-------------------------------------------------------------------------------
	  Carousel Testimonial User
	-------------------------------------------------------------------------------*/

	const breakpoint = window.matchMedia('(max-width:992px)');
	var allSliders = document.querySelectorAll('.a-carousel-testimonial-user');
	allSliders.forEach(function(oneSlider) {
		let mySwiper;
		const breakpointChecker = function () {
			if (breakpoint.matches === true) {
				if (mySwiper !== undefined) mySwiper.destroy(true, true);
				return;
			} else if (breakpoint.matches === false) {
				return enableSwiper();
			}
		};
		const enableSwiper = function () {
			mySwiper = new Swiper(oneSlider, {
				speed: 900,
				slidesPerView: '2',
				spaceBetween: 20,
				watchSlidesProgress: true,
				a11y: true,
				navigation: {
					prevEl: '.btn-prev',
					nextEl: '.btn-next',
				},
				breakpoints: {
					1200: {
						slidesPerView: '3',
					}
				}
			});
		};
		breakpoint.addListener(breakpointChecker);
		breakpointChecker();
	});

	/*-------------------------------------------------------------------------------
	  Carousel Review User
	-------------------------------------------------------------------------------*/

	let swiperRviewUser = new Swiper('.a-carousel-review-user', {
		slidesPerView: 'auto',
		spaceBetween: 5,
		watchSlidesProgress: true,
		freeMode: true,
		speed: 900,
		navigation: {
			prevEl: '.btn-prev',
			nextEl: '.btn-next',
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			480: {
				spaceBetween: 10,
			},
			992: {
				freeMode: false,
				slidesPerView: '5',
			},
			1200: {
				slidesPerView: '8',
				spaceBetween: 10,
				freeMode: false
			},
			1600: {
				slidesPerView: '8',
				spaceBetween: 0,
				freeMode: false
			}
		},
	});

	/*-------------------------------------------------------------------------------
      Carousel Product Photo
    -------------------------------------------------------------------------------*/

	let swiperThumbs = new Swiper('.a-photo-thumbs', {
		spaceBetween: '20',
		slidesPerView: '5',
		observer: true,
		observeParents: true,
		watchSlidesProgress: true,
		direction: 'vertical',
		navigation: {
			prevEl: '.btn-prev',
			nextEl: '.btn-next',
		},
		breakpoints: {
			1200: {
				slidesPerView: '6',
				spaceBetween: '14'
			},
		}
	});
	let swiperMain = new Swiper('.a-photo-main', {
		spaceBetween: 10,
		observer: true,
		observeParents: true,
		watchSlidesProgress: true,
		pagination: {
			el: ".product__pagination",
			clickable: true,
		},
		thumbs: {
			swiper: swiperThumbs,
		},
	});

	$('.a-photo-thumbs .swiper-slide').on('click', function() {
		if ($(this).hasClass('swiper-slide-active')) {
			swiperThumbs.slidePrev();
		} else {
			swiperThumbs.slideNext();
		}
	});

	swiperMain.on('slideChange', function() {
		$('.a-photo-main video').each(function () {
			if ($(this).get(0).play) {
				$(this).get(0).pause();
			}
		});
	});

	/*-------------------------------------------------------------------------------
      Carousel Set Photo
    -------------------------------------------------------------------------------*/

	let swiperSetThumbs = new Swiper('.a-set-photo-thumbs', {
		spaceBetween: '20',
		slidesPerView: '3',
		observer: true,
		observeParents: true,
		watchSlidesProgress: true,
		direction: 'vertical',
		navigation: {
			prevEl: '.btn-prev',
			nextEl: '.btn-next',
		},
		breakpoints: {
			1200: {
				spaceBetween: '10'
			},
		}
	});
	let swiperSetMain = new Swiper('.a-set-photo-main', {
		spaceBetween: 10,
		observer: true,
		observeParents: true,
		watchSlidesProgress: true,
		pagination: {
			el: ".product__pagination",
			clickable: true,
		},
		thumbs: {
			swiper: swiperSetThumbs,
		},
	});

	$('.a-set-photo-thumbs .swiper-slide').on('click', function() {
		if ($(this).hasClass('swiper-slide-active')) {
			swiperSetThumbs.slidePrev();
		} else {
			swiperSetThumbs.slideNext();
		}
	});

	swiperSetMain.on('slideChange', function() {
		$('.a-set-photo-main video').each(function () {
			if ($(this).get(0).play) {
				$(this).get(0).pause();
			}
		});
	});



	function tooltip(tooltipContainer) {
		let tooltips;

		if (tooltipContainer) {
			if (tooltipContainer instanceof Node) {
				tooltips = tooltipContainer.querySelectorAll('[data-tooltip]');
			}
		} else {
			tooltips = document.querySelectorAll('[data-tooltip]');
		}

		if (tooltips.length) {
			const tooltipInit = (tooltip) => {
				tooltip.setAttribute('data-tooltip-init', '');

				let tooltipContent = tooltip.getAttribute('title') || tooltip.getAttribute('data-tooltip-content') || '';
				let tooltipTrigger = tooltip.getAttribute('data-tooltip-trigger') || 'focus';

				if (tooltipContent) {
					tippy(tooltip, {
						content: tooltip.getAttribute('title') || tooltip.getAttribute('data-tooltip-content') || '',
						allowHTML: true,
						trigger: tooltipTrigger,
						// trigger: 'click',
						// hideOnClick: 'toggle',
						placement: 'top',
						maxWidth: 300,
						animation: 'shift-toward',
						offset: [0, 14],
						onShow(instance) {
							tooltip.classList.add('active');
						},
						onHide(instance) {
							tooltip.classList.remove('active');
						},
					});
				}
			}

			for (let i = 0; i < tooltips.length; i++) {
				const tooltip = tooltips[i];

				if (!tooltip.hasAttribute('data-tooltip-init')) {
					tooltipInit(tooltip);
				}
			}
		}
	}

	tooltip();


}($));

