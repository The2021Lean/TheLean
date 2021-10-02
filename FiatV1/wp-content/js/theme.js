"use strict";

is_visible_init();
carbonick_slick_navigation_init();

jQuery(document).ready(function($) {
	carbonick_sticky_init();
	carbonick_search_init();
	carbonick_side_panel_init();
	carbonick_mobile_header();
	carbonick_woocommerce_helper();
	carbonick_woocommerce_login_in();
	carbonick_init_timeline_appear();
	carbonick_init_steps_appear();
	carbonick_accordion_init();
	carbonick_services_accordion_init();
	carbonick_striped_services_init();
	carbonick_progress_bars_init();
	carbonick_carousel_slick();
	carbonick_image_comparison();
	carbonick_counter_init();
	carbonick_countdown_init ();
	carbonick_img_layers();
	carbonick_page_title_parallax();
	carbonick_extended_parallax();
	carbonick_portfolio_parallax();
	carbonick_message_anim_init();
	carbonick_scroll_up();
	carbonick_link_scroll();
	carbonick_skrollr_init();
	carbonick_sticky_sidebar();
	carbonick_videobox_init();
	carbonick_parallax_video();
	carbonick_tabs_init();
	carbonick_tabs_horizontal_init();
	carbonick_select_wrap();
	jQuery( '.wgl_cpt_section .carousel_arrows' ).carbonick_slick_navigation();
	jQuery( '.wgl_module_title .carousel_arrows' ).carbonick_slick_navigation();
	jQuery( '.wgl-filter_wrapper .carousel_arrows' ).carbonick_slick_navigation();
	jQuery( '.wgl-products > .carousel_arrows' ).carbonick_slick_navigation();
	jQuery( '.carbonick_module_custom_image_cats > .carousel_arrows' ).carbonick_slick_navigation();
	carbonick_scroll_animation();
	carbonick_woocommerce_mini_cart();
	carbonick_text_background();
	carbonick_dynamic_styles();
	carbonick_animate_bg();
});

jQuery(window).load(function() {
	carbonick_isotope();
	carbonick_blog_masonry_init();
	setTimeout(function(){
		jQuery('#preloader-wrapper').fadeOut();
	},1100);

	carbonick_menu_lavalamp();
	jQuery(".wgl-currency-stripe_scrolling").each(function(){
		jQuery(this).simplemarquee({
			speed: 40,
			space: 0,
			handleHover: true,
			handleResize: true
		});
	})
});
