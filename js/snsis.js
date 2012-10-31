(function ($) {
  $.fn.snsis = function (options) {
		var settings = $.extend({
			fadingOutSpeed: "fast",
			fadingInSpeed: "fast",
			imagesContainerElement: "article",
			enableKeyboardArrows: true,
			enableFullScreen: true,
		}, options),
			This = this,
			methods = {
				sliding: function () {

					$thisDataAction = $(this).data("action");
					active = $(settings['imagesContainerElement'] + " > img.active").index();

					$(settings['imagesContainerElement'] + " > img").eq(active).fadeOut(settings["fadingOutSpeed"], function () {
						$(this).removeClass("active");

						if (active == 0) active = 0;
						else if ($(settings['imagesContainerElement'] + " > img").size() - 1 == active) active = -1;

						if ($thisDataAction == "previous") active--;
						else if ($thisDataAction == "next") active++;

						$(settings['imagesContainerElement'] + " > img").eq(active).addClass("active").fadeIn(settings["fadingInSpeed"]);
					});


				},
				click: function () {
					methods["sliding"].apply(this);

				}
			};

		this.each(function () {

			$this = $(this);
			//checking elements and their attributes, and entered options
			if (typeof $this.data("action") === "undefined") {
				$.error("There is no 'data-action' attribute for controllers");
				return false;
			} else if (["previous", "next"].indexOf($this.data("action")) == -1) {
				$.error("'data-action' attribute must be 'previous' or 'next'");
				return false;
			} else if ($(settings['imagesContainerElement']).length == 0) {
				$.error("There is no " + settings['imagesContainerElement'] + " element");
				return false;
			}

			//binding click event on controllers
			$this.click(function () {
				methods["sliding"].apply(this);
			});
		});

		//binding left and right keyboard arrows on document
		if (settings['enableKeyboardArrows'] === true) {

			$(document).keydown(function (evt) {
				if (evt.keyCode == 37) methods["click"].apply($(This, "[data-action='previous']"));
				else if (evt.keyCode == 39) methods["click"].apply($(This, "[data-action='next']"));
			});
		}

		if (settings["enableFullScreen"]) {
			$("article > img").click(function (evt) {
				marginleft = '-' + ($(this).width() / 2) + 'px';
				marginTop = '-' + ($(this).height() / 2) + 'px';
				imgSrc = $(this).attr("src");
				$(".gray-window > div").html('<img src="' + imgSrc + '" style="margin-left:' + marginleft + ';margin-top:' + marginTop + '">');
				$(".gray-window").show();
			});

			$(".gray-window > div").click(function (evt) {
				evt.stopPropagation();
			});

			$(".gray-window").click(function () {
				$(".gray-window").hide();
			});

		}

	};
})(jQuery);
