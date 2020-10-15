$(function () {
	"use strict";


	/* ==========================================================================
       newsletter Form
       ========================================================================== */

	$( "#mc-form" ).submit(function(e) {
		e.preventDefault(e);
		let formData = $(this).serialize()
		$.ajax({
			url: "https://opengis.us3.list-manage.com/subscribe/post-json?c=?",
			type: "POST",
			crossDomain: true,
			contentType: 'application/json',
			data: formData,
			dataType: "json",
			success: function(data) {
				$('#mc-error').slideUp();
				$('#mc-success').html(data.msg);
				$('#mc-success').slideDown();
				$('#mc-form button').prop('disabled', true);
			},
			error: function(xhr) {
				$('#mc-success').slideUp();
				$('#mc-error').slideDown();
			}
		});
	});


	/* ==========================================================================
       Navbar
     ========================================================================== */

	$(window).on('scroll', function () {
		var scrollValue = $(window).scrollTop();
		if (scrollValue > 400) {
			$('.navbar').addClass('affix');
		} else {
			$('.navbar').removeClass('affix');
		}
	});



	/* ==========================================================================
	   Collapse nav bar
	   ========================================================================== */


	$(".nav-item a:not(.nav-item .dropdown-toggle)").on('click', function () {
		$(".navbar-collapse").collapse('hide');
		$(".navbar-toggler").removeClass("hamburger-active");
	});



	/* ==========================================================================
	   Dropdown menu easing  
	   ========================================================================== */


	$('.dropdown').on('show.bs.dropdown', function () {
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
	});


	$('.dropdown').on('hide.bs.dropdown', function () {
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
	});




	/* ==========================================================================
	   Hamburger Menu Animation 
	   ========================================================================== */



	$(".navbar-toggler").on("click", function () {
		$(this).toggleClass("hamburger-active");
	});







	/* ==========================================================================
       Smooth scroll
     ========================================================================== */


	$('a[href*="#"]')

	.not('[href="#"]')
		.not('[href="#0"]')
		.on('click', function (event) {

			if (
				location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
				location.hostname === this.hostname
			) {

				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

				if (target.length) {

					event.preventDefault();
					$('html, body').animate({
						scrollTop: (target.offset().top - 80)
					}, 1000);
					return false;
				}
			}

		});





	/* ==========================================================================
	Contact form
	========================================================================== */


	var formFields = $('.contact-form form input, .contact-form form textarea');



	$(formFields).on('focus', function () {
		$(this).removeClass('input-error');
	});
	$('.contact-form form').submit(function (e) {
		e.preventDefault();
		$(formFields).removeClass('input-error');
		var postdata = $('.contact-form form').serialize();
		$.ajax({
			type: 'POST',
			url: 'php/contact.php',
			data: postdata,
			dataType: 'json',
			success: function (json) {

				if (json.nameMessage !== '') {
					$('.contact-form form .contact-name').addClass('input-error');
				}
				if (json.emailMessage !== '') {
					$('.contact-form form .contact-email').addClass('input-error');
				}
				if (json.messageMessage !== '') {
					$('.contact-form form textarea').addClass('input-error');
				}
				if (json.antispamMessage !== '') {
					$('.contact-form form .contact-antispam').addClass('input-error');
				}
				if (json.nameMessage === '' && json.emailMessage === '' && json.messageMessage === '' && json.antispamMessage === '') {

					$('.contact-form-success').slideDown();


					$('.contact-form form button').prop('disabled', true);
					$('.contact-form form').find('input, textarea').val('');

				}
			}
		});
	});



});
