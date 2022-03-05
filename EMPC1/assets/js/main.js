$(document).ready(function()
{

    
            // fixed element section Sticky
		$(window).on('scroll',function() {
            if ($(this).scrollTop() > 1145){  

                $('#TheeSec').addClass("fixedelementtscroll");
            }
            else{
                $('#TheeSec').removeClass("fixedelementtscroll");
            }
});

	

	



})(window.jQuery);