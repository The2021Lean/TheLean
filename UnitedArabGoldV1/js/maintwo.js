(function($){
	"use strict";
	jQuery(document).on('ready', function () {
		
		// Header Sticky
		$(window).on('scroll',function() {
            if ($(this).scrollTop() > 0){  
                $('.header-area').addClass("is-sticky");
            }
            else{
                $('.header-area').removeClass("is-sticky");
            }
        });
        
	});


}(jQuery));