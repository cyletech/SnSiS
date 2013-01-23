/*
 * Simple and Stylish Image Slider
 * https://github.com/cyletech/SnSiS/
 * 
 * Copyright 2012 Alireza Eskandarpour Shoferi
 * Under the GNU GPLv3 license.
 * http://www.gnu.org/licenses/gpl-3.0.html
 */ (function ($) {
	$.fn.snsis = function (options) {
		var settings = $.extend({
			'fadingSpeed': 400,
			'imagesContainer': '#container',
			'controller': '#controllers',
			'keyboardArrows': true,
			'fullscreen': true,
		}, options),
			fromHere = $(settings['imagesContainer'] + ' > img.active').index(),
			imagesLength = $(settings['imagesContainer'] + ' > img').length;
		var methods = {
			slide: function (action) {
				var activeIndex = ($(settings['imagesContainer'] + ' > img.active').index()-1);
				if (action == 'next') {
					if (activeIndex == (imagesLength - 1)) fromHere = 0;
					else fromHere++;
				}
				else if (action == 'previous') {
					if (activeIndex == 0) fromHere = (imagesLength - 1);
					else fromHere--;
				}
				$(settings['imagesContainer'] + ' > img.active').fadeOut(settings['fadingSpeed']).removeAttr('class');
				$(settings['imagesContainer'] + ' > img').eq(fromHere).fadeIn(settings['fadingSpeed']).addClass('active');
			}
		};

		//bind click event on controllers
		$(settings['controller'] + ' > span', this[0]).click(function () {
			if ($(this).data('do') == 'next') methods['slide'].apply(this, ['next']);
			else if ($(this).data('do') == 'previous') methods['slide'].apply(this, ['previous']);
		});

		//keyboard arrows feature
		if (settings['keyboardArrows']) {
			$(document).keydown(function (e) {
				if ($('#gray-window').css('display') == 'none') {
					if (e.keyCode == 39) methods['slide'].apply(this, ['next']);
					else if (e.keyCode == 37) methods['slide'].apply(this, ['previous']);
				}
			});
		}

		//fullscreen feature
		if (settings['fullscreen']) {
			$(settings['imagesContainer'] + ' > img').click(function () {
				$('#gray-window > div').css({
					'width': $(this).width(),
					'height': $(this).height(),
					'margin-top': Math.abs($(this).height() / 2) * -1,
					'margin-left': Math.abs($(this).width() / 2) * -1
				}).html('<img src="' + $(this).attr("src") + '">').click(function (e) {
					e.stopPropagation();
				}).parent().click(function () {
					$(this).hide();
				}).show();
			});

			$(settings['imagesContainer']).prepend('<span title="Resize" class="icon entypo-resize-full"></span>');
		}
	}
})(jQuery);