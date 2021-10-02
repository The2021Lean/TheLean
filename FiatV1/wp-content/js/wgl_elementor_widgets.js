(function( $ ) {
    "use strict";

    jQuery(window).on('elementor/frontend/init', function (){
        if ( window.elementorFrontend.isEditMode() ) {
            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-blog.default',
                function( $scope ){ 
                    carbonick_parallax_video();
                    carbonick_blog_masonry_init();
                    carbonick_carousel_slick();
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-blog-hero.default',
                function( $scope ){ 
                    carbonick_parallax_video();
                	carbonick_blog_masonry_init();
                	carbonick_carousel_slick();
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-carousel.default',
                function( $scope ){ 
                    carbonick_carousel_slick();
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-portfolio.default',
                function( $scope ){ 
                    carbonick_isotope();
                    carbonick_carousel_slick();
                    carbonick_scroll_animation();
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-events.default',
                function( $scope ){ 
                    carbonick_isotope();
                	carbonick_carousel_slick();
                    carbonick_scroll_animation();
                    carbonick_events_masonry_init();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-progress-bar.default',
                function( $scope ){ 
                    carbonick_progress_bars_init();
                }
            ); 

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-testimonials.default',
                function( $scope ){ 
                	carbonick_carousel_slick();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-toggle-accordion.default',
                function( $scope ){ 
                    carbonick_accordion_init();
                }
            ); 

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-team.default',
                function( $scope ){ 
                    carbonick_isotope();
                    carbonick_carousel_slick();
                    carbonick_scroll_animation();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-tabs.default',
                function( $scope ){ 
                    carbonick_tabs_init();
                }
            ); 

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-tabs-horizontal.default',
                function( $scope ){
                    carbonick_tabs_horizontal_init();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-clients.default',
                function( $scope ){ 
                	carbonick_carousel_slick();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-image-layers.default',
                function( $scope ){ 
                	carbonick_img_layers();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-video-popup.default',
                function( $scope ){ 
                    carbonick_videobox_init();
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-countdown.default',
                function( $scope ){ 
                	carbonick_countdown_init();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-time-line-vertical.default',
                function( $scope ){ 
                	carbonick_init_timeline_appear();
                }
            );
            
            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-steps-vertical.default',
                function( $scope ){ 
                	carbonick_init_steps_appear();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-striped-services.default',
                function( $scope ){ 
                	carbonick_striped_services_init();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-image-comparison.default',
                function( $scope ){ 
                	carbonick_image_comparison();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-counter.default',
                function( $scope ){ 
                	carbonick_counter_init();
                }
            );

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-menu.default',
                function( $scope ){ 
                    carbonick_menu_lavalamp();
                }
            );            

            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-header-search.default',
                function( $scope ){ 
                    carbonick_search_init();
                }
            );            
            window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wgl-header-side_panel.default',
                function( $scope ){ 
                    carbonick_side_panel_init();
                }
            );

        }
    });

})( jQuery );

