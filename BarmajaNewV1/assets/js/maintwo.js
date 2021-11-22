(function($){
	"use strict";
	jQuery(document).on('ready', function () {
		
		// Header Sticky
		$(window).on('scroll',function() {
            if ($(this).scrollTop() > 0){  
                $('header').addClass("is-sticky");
            }
            else{
                $('header').removeClass("is-sticky");
            }
        });
        









		

	});


}(jQuery));