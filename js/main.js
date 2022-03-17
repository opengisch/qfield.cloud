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
				if(data.result == 'error'){
					$('#mc-success').slideUp();
					$('#mc-error').html(data.msg)
					$('#mc-error').slideDown();
				}
				else {
					$('#mc-error').slideUp();
					$('#mc-success').html(data.msg);
					$('#mc-success').slideDown();
					$('#mc-form button').prop('disabled', true);
				}
			},
			error: function(xhr) {
				$('#mc-success').slideUp();
				$('#mc-error').slideDown();
			}
		});
	});

});
