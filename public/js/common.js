"use strict";

let div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад"
			}
		});
		$(".modal-close-js").click(function () {
			Fancybox.close();
		}); // fancybox.defaults.backFocus = false;

		const linkModal = document.querySelectorAll(link);

		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},

	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, {
			passive: true
		});
	},

	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}
	},

	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', event => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)

			let link = event.target.closest(".menu-mobile .menu a"); // (1)

			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)

			if (!container && !toggle) this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 768px)").matches) this.closeMenu();
		}, {
			passive: true
		});
	},

	// /mobileMenu
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},

	sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			event.preventDefault();
			const th = $(this);
			var data = th.serialize(); //check cart on empty

			let thisIsCartForm = this.querySelector('input[name="message-from"]').value === 'Корзина';

			if (thisIsCartForm && (this.querySelector('.cart-inp-js').value === '' || this.querySelector('.cart-inp-js').value === '{}')) {
				let cartWrap = document.querySelector('.cart-items-js');
				cartWrap.innerHTML = '<h5>Что бдем Покупать?</h5>';
				return;
			}

			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				Fancybox.close();
				Fancybox.show([{
					src: "#modal-thanks",
					type: "inline"
				}]);
				console.log('everything is ok');
				setTimeout(function () {
					th.trigger("reset");
				}, 4000);
			}).fail(function () {
				console.log('something went wrong');
			});
		});
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	}

};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.mobileMenu();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	window.setTimeout(function () {
		JSCCommon.inputMask();
	}, 200); // var x = window.location.host;
	// let screenName;
	// screenName = document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }
	// modal window
	//luckyoneJs

	let topNav = document.querySelector(".top-nav--js");
	let headerH = 0;

	function calcHeaderHeight() {
		document.documentElement.style.setProperty('--header-h', "".concat(topNav.offsetHeight, "px"));
		headerH = topNav.offsetHeight;
		if (!topNav) return;
		window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
	}

	window.addEventListener('resize', calcHeaderHeight, {
		passive: true
	});
	window.addEventListener('scroll', calcHeaderHeight, {
		passive: true
	});
	calcHeaderHeight(); //animate scroll

	$(document).on('click', ".menu li a, .scroll-link", function () {
		event.preventDefault();
		let elementClick = $(this).attr("href");

		if (!document.querySelector(elementClick)) {
			$(this).attr("href", '/' + elementClick);
		} else {
			let destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination - headerH
			}, 0);
			return false;
		}
	}); //

	let sSliderSlider = new Swiper('.sSlider-slider-js', {
		slidesPerView: 'auto',
		loop: false,
		spaceBetween: 36,
		pagination: {
			el: '.swiper-pagination',
			type: "progressbar"
		},
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev'
		}
	}); //

	let thisYear = new Date().getFullYear();
	$('.set-active-class-js').each(function () {
		if (thisYear >= Number(this.getAttribute('data-year'))) {
			$(this).addClass('dot-active');
		}
	}); //inpmaks??

	$('.number-mask-js').each(function () {
		Inputmask(this.getAttribute('data-mask')).mask(this);
	}); //readmore
	// let readMoreConts = document.querySelectorAll('.rm-cont-js');
	// for (let cont of readMoreConts){
	// 	let btn = cont.querySelector('.rm-btn-js');
	//
	// 	btn.addEventListener('click', function (){
	// 		this.classList.toggle('active');
	// 		let hidden = cont.querySelector('.rm-hidden-js');
	// 		let visiable = cont.querySelector('.rm-visible-js');
	//
	// 		$(hidden).slideToggle(function (){
	// 			$(this).toggleClass('active');
	// 		});
	// 		$(visiable).toggleClass('active');
	// 	});
	// }

	document.body.addEventListener('click', function () {
		let btn = event.target.closest('.rm-btn-js');

		if (btn) {
			let rmCont = btn.closest('.rm-cont-js');
			let hidden = rmCont.querySelector('.rm-hidden-js');
			let visiable = rmCont.querySelector('.rm-visible-js');
			$(btn).toggleClass('active');
			$(hidden).slideToggle(function () {
				$(this).toggleClass('active');
			});
			$(visiable).toggleClass('active');
		}
	}); //cart
	//-

	let sSocSlider = new Swiper('.sSoc-slider-js', {
		slidesPerView: 'auto',
		loop: false,
		spaceBetween: 36,
		pagination: {
			el: '.sSoc--js .swiper-pagination',
			type: "fraction"
		},
		navigation: {
			nextEl: '.sSoc--js .swiper-next',
			prevEl: '.sSoc--js .swiper-prev'
		}
	}); //

	function getCookieObj() {
		return document.cookie.split(';').map(function (c) {
			return c.trim().split('=').map(decodeURIComponent);
		}).reduce(function (a, b) {
			try {
				a[b[0]] = JSON.parse(b[1]);
			} catch (e) {
				a[b[0]] = b[1];
			}

			return a;
		}, {});
	} //document.cookie = "ageConfirmed=false";


	window.setTimeout(function () {
		//set this in order avoid empty cookie case
		document.cookie = "user=John";
		let cookieObj = getCookieObj();
		if (cookieObj.ageConfirmed) return;
		new Fancybox([{
			src: "#modal-adult",
			type: "inline"
		}], {
			on: {
				closing: (fancybox, slide) => {
					let adultChb = document.querySelector('.adult-chek-js');

					if (adultChb.checked) {
						Fancybox.close();
						document.cookie = "ageConfirmed=true";
					} else {
						document.location.replace('http://www.kalininnews.ru/news/2018-03-29/chto-grozit-nesovershennoletnim-za-raspitie-alkogolya/');
					}
				}
			}
		});
	}, 500); //

	$('.go-next-step-js').click(function () {
		let stepParent = this.closest('.modal-reg-step-js');
		let stepInputs = stepParent.querySelectorAll('input[required]');
		let inputsValid = [];

		for (let input of stepInputs) {
			inputsValid.push(input.reportValidity());
		}

		if (inputsValid.reduce((accumulator = 'true', currentValue) => accumulator && currentValue) || inputsValid.length === 0) {
			$(stepParent).slideUp(function () {
				$(this).removeClass('active');
				$(this.nextElementSibling).addClass('active');
			});
		}
	}); //- 1
	//-let token = 'IGQVJVYmNqOEpkU2luSVJyem5hUHNyWU9kQjBxZA3hWd1Rld2RlZAEp3Q2lhdDJHTjFZAekVCdFcxMzRFbWRMMUFGMFQyYkpmNGRNemxDUm4zY3hBU2t4OWIxRHpKSWhSVzU1cHVmZAkxmWlg1cm1tVlFGWgZDZD'; // ваш токен
	// let token = 'IGQVJVYmNqOEpkU2luSVJyem5hUHNyWU9kQjBxZA3hWd1Rld2RlZAEp3Q2lhdDJHTjFZAekVCdFcxMzRFbWRMMUFGMFQyYkpmNGRNemxDUm4zY3hBU2t4OWIxRHpKSWhSVzU1cHVmZAkxmWlg1cm1tVlFGWgZDZD'; // ваш токен
	// let	userid = '726781521519447'; // id пользователя
	// let	num_photos = 10; // Количество фотографий, которые вы хотите получить
	//
	// $.ajax({
	// 	url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
	// 	dataType: 'jsonp',
	// 	type: 'GET',
	// 	data: {access_token: token, count: num_photos},
	// 	success: function(data){
	// 		console.log(data);
	// 		for( x in data.data ){
	// 			$('#av_instafeed').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>');
	// 			// data.data[x].link - URL поста в Инстаграме
	// 			// data.data[x].images.standard_resolution.url - URL изображений 612х612
	// 		}
	// 	},
	// 	error: function(data){
	// 		console.log(data); // отправим сообщение в консоль, если появятся ошибки
	// 	}
	// });
	//-???
	// const getMediaByUsername = require('nanogram.js').getMediaByUsername;
	//
	// getMediaByUsername('instagram').then((media) => {
	// 	console.log(media);
	// });
	// const getMediaByUsername = window.Nanogram.getMediaByUsername;
	//
	// getMediaByUsername('luckyone612').then((media) => {
	// 	console.log(media);
	// });
	//end luckyoneJs
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}