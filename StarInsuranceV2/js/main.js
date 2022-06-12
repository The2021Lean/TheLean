/*-----------------------------------------------------------------------------------

    Theme Name: Lifest - Insurance Agency HTML Template
    Description: Insurance Agency HTML Template
    Author: Website Design Templates
    Version: 2.0
        
    ---------------------------------- */

! function(t) {
    "use strict";
    var s = t(window);

    function a() {
        var e, a;
        e = t(".full-screen"), a = s.height(), e.css("min-height", a), e = t("header").height(), a = t(".screen-height"), e = s.height() - e, a.css("height", e)
    }
    t("#preloader").fadeOut("normall", function() {
        t(this).remove()
    }), s.on("scroll", function() {
        var e = s.scrollTop(),
            a = t(".navbar-brand img"),
            o = t(".navbar-brand.logodefault img");
        e <= 50 ? (t("header").removeClass("scrollHeader").addClass("fixedHeader"), a.attr("src", "img/NewImages/loggo.png")) : (t("header").removeClass("fixedHeader").addClass("scrollHeader"), a.attr("src", "img/NewImages/loggo.png")), o.attr("src", "img/NewImages/loggo.png")
    }), s.on("scroll", function() {
        500 < t(this).scrollTop() ? t(".scroll-to-top").fadeIn(400) : t(".scroll-to-top").fadeOut(400)
    }), t(".scroll-to-top").on("click", function(e) {
        e.preventDefault(), t("html, body").animate({
            scrollTop: 0
        }, 600)
    }), new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !1,
        live: !0
    }).init(), t(".parallax,.bg-img").each(function(e) {
        t(this).attr("data-background") && t(this).css("background-image", "url(" + t(this).data("background") + ")")
    }), t(".story-video").magnificPopup({
        delegate: ".video",
        type: "iframe"
    }), t(".source-modal").magnificPopup({
        type: "inline",
        mainClass: "mfp-fade",
        removalDelay: 160
    }), t(".current-year").text((new Date).getFullYear()), s.resize(function(e) {
        setTimeout(function() {
            a()
        }, 500), e.preventDefault()
    }), a(), 0 !== t(".copy-clipboard").length && (new ClipboardJS(".copy-clipboard"), t(".copy-clipboard").on("click", function() {
        var e = t(this);
        e.text();
        e.text("Copied"), setTimeout(function() {
            e.text("Copy")
        }, 2e3)
    })), t(document).ready(function() {
        t(".testimonial-carousel").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 1500,
            nav: !1,
            dots: !0,
            center: !1,
            margin: 0,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                768: {
                    items: 1
                },
                992: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        }), t(".feature-carousel").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 1500,
            nav: !1,
            dots: !0,
            center: !1,
            margin: 0,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        }), t(".clients-carousel").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 1500,
            nav: !1,
            dots: !1,
            center: !1,
            margin: 10,
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 4,
                    margin: 30
                },
                992: {
                    items: 5,
                    margin: 40
                },
                1200: {
                    items: 6,
                    margin: 40
                }
            }
        }), t(".portfolio-carousel").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 1500,
            nav: !1,
            dots: !0,
            center: !1,
            margin: 20,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        }), t(".clients-carousel-02").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 1500,
            nav: !1,
            dots: !1,
            center: !1,
            margin: 10,
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 4,
                    margin: 30
                },
                992: {
                    items: 5,
                    margin: 40
                },
                1200: {
                    items: 7,
                    margin: 40
                }
            }
        }), t(".testimonial-carousel-02").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 1500,
            nav: !1,
            dots: !0,
            center: !1,
            margin: 0,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                768: {
                    items: 1
                },
                992: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        }), t(".portfolio-carousel-02").owlCarousel({
            loop: !0,
            responsiveClass: !0,
            autoplay: !0,
            smartSpeed: 1500,
            nav: !1,
            dots: !1,
            center: !0,
            margin: 30,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        }), t(".slider-fade").owlCarousel({
            items: 1,
            loop: !0,
            dots: !0,
            margin: 0,
            nav: !1,
            navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"],
            autoplay: !0,
            smartSpeed: 1500,
            mouseDrag: !1,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            responsive: {
                992: {
                    nav: !1
                }
            }
        }), t(".slider-fade2").owlCarousel({
            items: 1,
            loop: !0,
            dots: !0,
            margin: 0,
            nav: !1,
            navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"],
            autoplay: !0,
            smartSpeed: 1500,
            mouseDrag: !1,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            responsive: {
                992: {
                    nav: !0,
                    dots: !1
                }
            }
        }), t(".owl-carousel").owlCarousel({
            items: 1,
            loop: !0,
            dots: !1,
            margin: 0,
            autoplay: !0,
            smartSpeed: 500
        }), t(".slider-fade").on("changed.owl.carousel", function(e) {
            e = e.item.index - 2;
            t("span").removeClass("animated fadeInUp"), t("h1").removeClass("animated fadeInUp"), t("p").removeClass("animated fadeInUp"), t("a").removeClass("animated fadeInUp"), t(".owl-item").not(".cloned").eq(e).find("span").addClass("animated fadeInUp"), t(".owl-item").not(".cloned").eq(e).find("h1").addClass("animated fadeInUp"), t(".owl-item").not(".cloned").eq(e).find("p").addClass("animated fadeInUp"), t(".owl-item").not(".cloned").eq(e).find("a").addClass("animated fadeInUp")
        }), t(".slider-fade2").on("changed.owl.carousel", function(e) {
            e = e.item.index - 2;
            t("span").removeClass("animated fadeInUp"), t("h1").removeClass("animated fadeInUp"), t("p").removeClass("animated fadeInUp"), t("a").removeClass("animated fadeInUp"), t(".owl-item").not(".cloned").eq(e).find("span").addClass("animated fadeInUp"), t(".owl-item").not(".cloned").eq(e).find("h1").addClass("animated fadeInUp"), t(".owl-item").not(".cloned").eq(e).find("p").addClass("animated fadeInUp"), t(".owl-item").not(".cloned").eq(e).find("a").addClass("animated fadeInUp")
        }), 0 !== t(".horizontaltab").length && t(".horizontaltab").easyResponsiveTabs({
            type: "default",
            width: "auto",
            fit: !0,
            tabidentify: "hor_1",
            activate: function(e) {
                var a = t(this),
                    o = t("#nested-tabInfo");
                t("span", o).text(a.text()), o.show()
            }
        }), t(".countup").counterUp({
            delay: 25,
            time: 2e3
        }), t(".countdown").countdown({
            date: "01 Sep 2024 00:01:00",
            format: "on"
        })
    }), s.on("load", function() {
        var a = t(".portfolio-gallery-isotope").isotope({});
        t(".filtering").on("click", "span", function() {
            var e = t(this).attr("data-filter");
            a.isotope({
                filter: e
            })
        }), t(".filtering").on("click", "span", function() {
            t(this).addClass("active").siblings().removeClass("active")
        }), t(".portfolio-gallery,.portfolio-gallery-isotope").lightGallery(), t(".portfolio-link").on("click", e => {
            e.stopPropagation()
        }), s.stellar()
    })
}(jQuery);