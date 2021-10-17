(function ($) {

        "use strict";

        const wind = $(window);
        const body = $("body");

        preloader();
        const effectScroll = effectScroller();
        const animate = effectAnimate();
        const testmonial = testmonialSliders();

        var menuP;


        wind.on("load", function () {
            navMenu().init();
            dsnGrid.removeWhiteSpace(".site-header ul.extend-container li > a");
            effectBackForward();
            reloadAjax();
            $(".day-night").on("click", function () {
                body.toggleClass("v-light");
            });
            loadComonentElme();

        });


        /**
         * Execute data after ajax
         */
        function reloadAjax($off, $el = $(document)) {
            dsnGrid.destoryAll();
            dsnGrid.loadData($el, "poster");
            dsnGrid.loadData($el, "src");

            $('.hidden[data-dsn="bg_section"]').each(function () {
                let next_element = $(this).next();
                next_element.append($(this));
                $(this).removeClass('hidden');
                $(this).find('.img-box-parallax').addClass('h-100');

            });

            testmonial.run($el);
            changeColor();

            slider($el).run();
            justifiedGallery($el);
            zoomGallery();
            magnificPopup($el);
            $("a.vid").YouTubePopUp();
            dsnAjax().ajaxLoad();
            data_overlay();
            background();
            initMap($off, $el);
            work($off);

            dsnGrid.loadMore({
                url: dsnParam.queries,
                success: function (data) {

                    if (data.status === true)
                        setTimeout(function () {
                            animate.parallaxImg();
                            work(true);
                            dsnAjax().ajaxLoad();
                            zoomGallery();
                            mouseCirMove(true);
                        }, 100);

                },
            });
            mouseCirMove($off);
            accordion($off, $el);
            services_tab($off, $el);
            isoTope($el);
            setTimeout(function () {
                projectSlider($el).run();
            }, 500);


            effectScroll.start();
            animate.allInt();

            $(".embed-3d-dimensions").on("click", function (e) {
                $(this).toggleClass("active-3d-dimensions");
            });

            $("[data-dsn-cutter=\"html\"]").each(function () {
                dsnGrid.getData(this, "cutter");
                dsnGrid.cutterHtml(this);
            });
            ImgPosition($el);
            setTimeout(function () {
                dropHash();

                animate.dsnScrollTop();
                if (!$off)
                    menuP = effctStickyNavBar();
                else if (menuP) {
                    menuP.t1.kill();
                    menuP.t2.kill();
                    $(".site-header").css({
                        paddingTop: "",
                        paddingBottom: "",
                        backgroundColor: "",
                        top: "",
                    });

                    menuP = effctStickyNavBar();
                }

            }, 500);


            sidebarOptions();


        }


        function reloadElment($off, $el = $(document)) {
            dsnGrid.loadData($el, "poster");
            dsnGrid.loadData($el, "src");


            ImgPosition($el);
            magnificPopup($el);
            projectSlider($el).run();
            justifiedGallery($el);
            isoTope($el);
            accordion(true, $el);
            testmonial.run($el, false);

            animate.parallaxImg($el);
            animate.moveSection($el);
            animate.animateFade($el);
            animate.animateSkills($el);
            animate.parallaxImgHover($el);
            animate.changeColor($el);
            services_tab($off, $el);
            slider($el).run();


            $el.find(".skills-item .fill").each(function ($index) {
                let c = $(this);
                TweenLite.to(c, 1, {
                    width: c.data("width"), ease: Power0.easeNone,
                    onUpdate: function () {
                        c.find(".number").text((c.width() / c.parent().width() * 100).toFixed(0) + "%");
                    },
                    onComplete: function () {
                        c = null;
                    },
                }, $index * 0.2);

            });
            $el.find("a.vid").YouTubePopUp();
            initMap($off, $el);


        }

        function isoTope($el) {
            $el.find(".dsn-iso").each(function () {
                $(this).isotope({
                    itemSelector: ".dsn-iso-item",
                    percentPosition: true,
                });
            });
        }


        function sidebarOptions() {

            $(".dsn-button-sidebar , [data-dsn-close=\".dsn-sidebar\"]").on("click", function () {
                if ($(this).hasClass("dsn-button-sidebar")) {
                    body.addClass("dsn-show-sidebar");
                } else {
                    body.removeClass("dsn-show-sidebar");
                }
            });

        }

        function ImgPosition($el) {
            $el.find("[data-dsn-position]").each(function () {

                if (this.nodeName === "IMG")
                    $(this).css("object-position", dsnGrid.getData(this, "position", "center"));
                else
                    $(this).css("background-position", dsnGrid.getData(this, "position", "center"));
            });
        }

        function dropHash() {

            $("a[href=\"#\"]").on("click", function (e) {
                e.preventDefault();
            });

            $("[href*=\"#\"]:not([href=\"#\"]):not([href=\"#0\"]):not([href=\"#wp-toolbar\"])").each(function () {
                let href = $(this).attr("href");

                if (href.indexOf("#") === 0) {
                    setTimeout(() => {
                        href = $(href);
                        if (href.length) {
                            let offset = href.offset().top;
                            $(this).on("click", function (e) {
                                e.preventDefault();
                                dsnGrid.scrollTop(offset, 1, -100);
                            });
                        }

                    }, 100);
                }
            });

            if (window.location.hash.length) {
                wind.scrollTop(0);
                dsnGrid.scrollTop(window.location.hash, 1, -100);
            }


        }

        function accordion($off, $el) {
            let acc = $el.find(".dsn-accordion");

            if (!acc.length) {
                acc = null;
                return;
            }
            if ($off)
                acc.off("click");
            acc.each(function () {


                let $this = $(this),
                    acc_q = $this.find(".accordion__question");
                acc_q.on("click", function () {
                    let content = $(this).next();
                    $this.find(".accordion__answer").not(content).slideUp(400);
                    acc_q.not(this).removeClass("expanded");
                    $(this).toggleClass("expanded");
                    content.slideToggle(400);
                    content = null;
                });
            });

        }

        function changeColor() {
            $("[data-dsn-bg]").each(function () {
                let bg = dsnGrid.getData(this, "bg");
                let color = dsnGrid.getData(this, "color");
                if (bg)
                    $(this).css("background-color", bg);
                if (bg) {
                    $(this).css("color", color);
                    $(this).addClass("section-dsn-color");

                }


                bg = null;
            });
        }

        function testmonialSliders() {
            let dsnslick = [];

            return {
                destory: function () {

                    for (let s of dsnslick) {
                        s.slick("unslick");
                        s = null;
                    }
                    dsnslick = [];

                },
                bySlick: function ($id, $obj) {
                    dsnGrid.convertToJQuery($id).each(function () {
                        $obj = $.extend(true, {
                            speed: 700,
                            prevArrow: "<div data-cursor=\"prev\"></div>",
                            nextArrow: "<div data-cursor=\"next\"></div>",
                            responsive: [
                                {
                                    breakpoint: 992,
                                },
                            ],

                        }, $obj || {});
                        if ($(this).hasClass("dsn-is-not-fade"))
                            $obj["fade"] = false;
                        let $s = $(this).slick($obj);
                        dsnslick.push($s);
                        $s = $obj = null;
                    });
                },
                run: function ($el, $is_destory = true) {
                    // if ( $is_destory )
                    this.destory();
                    this.bySlick($el.find(".testimonials-main-content"), {
                        slidesToShow: 1,
                        asNavFor: ".testimonials-nav",
                        loop: true,
                        autoplay: false,
                        centerMode: true,
                        infinite: true,
                        speed: 700,
                        adaptiveHeight: true,
                        fade: true,
                        cssEase: "cubic-bezier(.9, .03, .41, .49)",
                        dots: true,
                    });
                    this.bySlick($el.find(".testimonials-nav"), {
                        slidesToShow: 3,
                        asNavFor: ".testimonials-main-content",
                        vertical: true,
                        focusOnSelect: true,
                        loop: true,
                        autoplay: false,
                        arrows: false,
                        centerMode: true,
                        responsive: [
                            {
                                breakpoint: 768,
                                settings: {
                                    vertical: false,
                                    centerMode: false,
                                    dots: false,
                                },
                            },
                            {
                                breakpoint: 576,
                                settings: {
                                    slidesToShow: 2,
                                    vertical: false,
                                    centerMode: false,
                                },
                            }, {
                                breakpoint: 500,
                                settings: {
                                    slidesToShow: 1,
                                    vertical: true,
                                    centerMode: false,
                                },
                            },
                        ],
                    });

                },
            };

        }

        function projectSlider($el) {
            return {
                swiper: function ($id, $obj) {
                    $id = dsnGrid.convertToJQuery($id);

                    $obj = $.extend(true, {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        navigation: {
                            nextEl: $id.find("[data-cursor=\"next\"]"),
                            prevEl: $id.find("[data-cursor=\"prev\"]"),
                        },
                        pagination: {
                            el: $id.find(".swiper-pagination"),
                            clickable: true,
                            type: $id.find(".swiper-pagination").data("type"),
                        },
                        breakpoints: {
                            575: {
                                slidesPerView: $obj.breakpoints["768"].slidesPerView > 2 ? 2 : 1,
                            },
                            400: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            },
                        },
                    }, $obj);


                    $obj['autoplay'] = ($obj.autoplay) ? true : false;


                    let $s = new Swiper($id.find(".swiper-container"), $obj);
                    dsnGrid.addSwiper($s);
                    if ($id.hasClass("dsn-swiper-parallax") && $obj.slidesPerView === 1) {

                        let slid = slider();
                        slid.progress($s, false);
                        slid.touchStart($s);
                        slid.setTransition($s);
                    }


                    $s = $id = $obj = null;
                },

                run: function () {
                    let $this = this;
                    $el.find(".dsn-swiper").each(function () {

                        let option = dsnGrid.getData(this, "option", {});
                        $this.swiper(this, option);
                    });

                },
            };

        }


        /***
         *
         * Loading Page
         *
         */
        function preloader() {
            let preloader = $(".preloader"),
                progress_number = preloader.find(".percent"),
                progress_title = preloader.find(".title .text-fill"),
                persent = {value: 0},
                preloader_bar = preloader.find(".preloader-bar"),
                preloader_progress = preloader_bar.find(".preloader-progress");


            let timer = dsnGrid.pageLoad(0, 100, 1000, function (val) {
                progress_number.text(val);
                persent.value = val;
                progress_title.css("clip-path", "inset(" + (100 - val) + "% 0% 0% 0%)");
                preloader_progress.css("width", val + "%");

            });


            wind.on("load", function () {

                clearInterval(timer);
                new TimelineLite()
                    .to(persent, 1, {
                        value: 100, onUpdate: function () {
                            progress_number.text(persent.value.toFixed(0));
                            progress_title.css("clip-path", "inset(" + (100 - persent.value) + "% 0% 0% 0%)");
                            preloader_progress.css("width", persent.value + "%");
                        },
                    })
                    .set(preloader_progress, {backgroundColor: "#090909"})
                    .to(preloader_bar, 0.5, {height: "100%"})
                    .to(persent, 0.4, {
                        value: 0, onUpdate: function () {
                            progress_title.css("clip-path", "inset(" + (100 - persent.value) + "% 0% 0% 0%)");
                        },
                    }, "-=0.4")
                    .to(persent, 0.8, {
                        value: 100, onUpdate: function () {
                            preloader.css("clip-path", "inset(" + (persent.value) + "% 0% 0% 0%)");
                        },
                        ease: Power2.easeInOut,
                    }, "+=0.1")
                    .call(function () {
                        preloader.remove();
                        timer = preloader = progress_number = progress_title = persent = preloader_bar = preloader_progress = null;
                    })
                ;

            });


        }


        function loadMore() {


            $(".button-loadmore").each(function () {
                let button = $(this),
                    progress = button.find(".dsn-load-progress-ajax"),
                    progress_text_load_more = button.find(".progress-text.progress-load-more"),
                    progress_text_no_more = button.find(".progress-text.progress-no-more"),
                    old_text = progress_text_load_more.text(),
                    type = dsnGrid.getData(button, "type"),
                    layout = dsnGrid.getData(button, "layout"),
                    id = dsnGrid.getData(button, "id"),
                    option = dsnGrid.getData(button, "option"),
                    page = 1,
                    content = $("[data-append=\"ajax\"]"),
                    urls = dsnParam.queries;

                if (progress_text_no_more !== undefined) {
                    progress_text_no_more.hide();
                }

                button.off("click");
                button.on("click", function () {
                    page++;
                    $.ajax({
                        url: urls,
                        type: "post",
                        data: {type: type, page: page, layout: layout, dsnId: id, option: option},
                        beforeSend: function () {
                            button.addClass("dsn-loading");
                        },
                        success: function (data) {

                            if (data.status === true) {
                                if (!content.length)
                                    button.parent(".dsn-p-pag").before(data.html);
                                button.removeClass("dsn-loading");
                                progress.css("width", 0);
                                progress_text_load_more.text(old_text);
                                progress_text_no_more.hide();


                                setTimeout(function () {
                                    animate.parallaxImg();
                                    work(true);
                                    dsnAjax().ajaxLoad();
                                    zoomGallery();
                                    mouseCirMove(true);
                                }, 100);


                                if (!data.has_next) {
                                    button.off("click");
                                    progress_text_load_more.hide();
                                    progress_text_no_more.show();
                                }
                            }


                        },
                        error: function (error) {
                            console.log(error);
                        },
                        xhr: function () {
                            // get the native XmlHttpRequest object
                            var xhr = $.ajaxSettings.xhr();
                            // set the onprogress event handler
                            xhr.upload.onprogress = function (e) {
                                if (e.lengthComputable) {
                                    let p = e.loaded / e.total * 100;
                                    TweenMax.to(progress, 0.5, {
                                        width: p + "%", onUpdate: function () {
                                            progress_text_load_more.text(Math.floor(this.progress() * 100) + "%");
                                        },

                                    });


                                }
                            };

                            // return the customized object
                            return xhr;
                        },
                    });
                });


            });


        }


        function work($off) {
            let filterButton = $(".filtering-posts").first(),
                filterBox = $(".filters-content").first(),
                $p_s = filterButton.parents(".root-posts").find(".dsn-posts"),
                tl;


            $(".main-root").prepend(filterBox);

            if ($off) filterButton.off("click");
            filterButton.on("click", function () {
                tl = new TimelineLite();
                tl.set(filterBox, {y: "0%"});
                tl.to(filterBox, 1, {autoAlpha: 1});
                tl.staggerFromTo(filterBox.find("button"), 0.4, {opacity: 0, y: 30}, {
                    opacity: 1,
                    y: 0,
                    ease: Back.easeOut.config(1.7),
                }, 0.1);


            });

            if ($off) filterBox.find("> .close-wind").off("click");
            filterBox.find("> .close-wind").on("click", function () {
                tl.reverse();
                tl.call(function () {
                    tl = null;
                });
            });


            /* filter items on button click
             -------------------------------------------------------*/
            if ($off) filterBox.find("button").off("click");
            let top_sc = $p_s.offset();


            filterBox.find("button").on("click", function () {

                $(this).addClass("active").siblings().removeClass("active");
                let id_filter = $(this).data("filter"),
                    filter = $p_s.find(id_filter),
                    no_filter = $p_s.find("article:not(" + id_filter + ")");

                if (id_filter === "*")
                    filter.show(500);
                else {
                    no_filter.hide(500);
                    filter.show(500);
                }
                // dsnGrid.scrollTop( top_sc.top, 1, -100 );

            });

        }


        /**
         *  -   event will be triggered by doing browser action such as
         *  a click on the back or forward button
         */


        function effectBackForward() {
            wind.on("popstate", function (e) {
                if (window.location.hash.length) {
                    wind.scrollTop(0);
                    dsnGrid.scrollTop(window.location.hash, 1, -100);
                    return;
                }
                if (document.location.href.indexOf("#") > -1) {
                    return;
                }
                setTimeout(function () {
                    dsnAjax().backAnimate(document.location);
                }, 100);
            });
        }


        function dsnAjax() {

            let main_root = "main.main-root",
                text_e_img = "[data-dsn-ajax=\"img\"]",
                text_e_title = "[data-dsn-ajax=\"title\"]",
                img_move, title_move,
                tl = new TimelineLite();


            return {
                mainRoot: $(main_root),
                ajaxClick: $("a.effect-ajax "),
                effectAjax: function ($add) {
                    if ($add)
                        body.addClass("dsn-ajax-effect");
                    else if ($add === false)
                        body.removeClass("dsn-ajax-effect");
                    else
                        return body.hasClass("dsn-ajax-effect");
                },

                setTitle: function (data) {
                    let title = data.match(/<title[^>]*>(.+)<\/title>/);
                    if (title)
                        $("head title").html(title[1]);
                    title = null;
                },
                setBodyClass: function (data) {
                    let cls = data.match(/<body[^>]*class="(.+)">/);
                    if (cls)
                        body.attr("class", cls[1]);
                    cls = null;
                },
                setDashAdmin: function (data) {
                    let admin_bar = $(data).filter("#wpadminbar");
                    if (admin_bar.length > 0) {
                        $("#wpadminbar").html(admin_bar.html());

                    }
                    admin_bar = null;
                },
                ajaxNormal: function () {
                    let elemnt_ajax = $("<div class=\"dsn-ajax-loader dsn-ajax-normal\"></div>");
                    body.append(elemnt_ajax);
                    tl.to(elemnt_ajax, 0.5, {scaleY: 1, ease: Circ.easeIn}, 0);
                    elemnt_ajax = null;
                },
                ajaxSlider: function ($e) {

                    let
                        active = $e.parents(".slide-content"),
                        id = active.data("dsn-id"),
                        img = $(".main-slider .slide-item[data-dsn-id=\"" + id + "\"] .cover-bg").first(),
                        title = active.find(".title");
                    img.removeClass("hidden");

                    this.dsnCreateElement(img, $(".bg-container"), title, title.find("a"));


                },
                ajaxNextProject: function ($e) {

                    let
                        active = $e.parents(".next-project"),
                        img = active.find(".img-next-box"),
                        title = active.find(".title");

                    active.addClass("dsn-active");
                    this.dsnCreateElement(img, active, title, title.find("a"));
                    active = img = title = null;

                },
                ajaxWork: function ($e) {

                    let
                        active = $e.parents(".work-item"),
                        img = active.find(".img-next-box"),
                        title = active.find(".title-block").addClass("dsn-cutter");


                    title.addClass("fw-600 d-flex");
                    img.addClass("before-z-index over-hidden");
                    active.addClass("dsn-active");


                    this.dsnCreateElement(img, active, title, title.find("a"));
                    tl.to(img_move.find("img"), 1, {height: "100%", top: "0%", y: "0"});

                    active = img = title = null;

                },
                addElement: function (container, $e, $target) {
                    if ($e === undefined || $e.length <= 0) return undefined;


                    if ($target === undefined || $target.length <= 0) {
                        $target = $e;
                    }

                    let $section = $e.clone();
                    let position = $target[0].getBoundingClientRect();
                    if (position === undefined) {
                        position = {
                            left: 0,
                            top: 0,
                        };
                    }
                    $section.css({
                        position: "absolute",
                        display: "block",
                        transform: "",
                        transition: "",
                        objectFit: "cover",
                    });
                    $section.css(dsnGrid.getBoundingClientRect($target[0]));


                    container.append($section);
                    return $section;
                },
                dsnCreateElement: function ($e, $target, $letter, $targetLtter) {


                    let container = $("<div class=\"dsn-ajax-loader\"></div>");
                    container.css("background-color", body.css("background-color"));
                    img_move = this.addElement(container, $e, $target);
                    title_move = this.addElement(container, $letter, $targetLtter);


                    if (title_move.hasClass("dsn-cutter")) dsnGrid.convertTextLine(title_move);

                    if (title_move) {
                        title_move.css("width", "max-content");
                        title_move.css("white-space", "nowrap");
                        title_move.css("z-index", 2);
                    }

                    if (img_move)
                        img_move.css("z-index", 1);
                    body.append(container);
                    tl.to(container, 1, {autoAlpha: 1, ease: Power4.easeInOut});

                },
                completeElement: function (elAjax) {
                    let img = $(text_e_img);
                    let title = $(text_e_title);
                    if (!img.length && !title.length) {
                        let webkitClipPath = {value: "0%"};
                        tl.to(webkitClipPath, 1, {
                            value: "100%",
                            onUpdate: function () {
                                elAjax.css("clip-path", "inset(0% 0% " + webkitClipPath.value + " 0%)");
                            },
                            onComplete: function () {
                                webkitClipPath = null;
                            },
                            ease: Circ.easeIn,
                        });

                        return;
                    }

                    img = img.first();
                    let position = img.offset();
                    if (position === undefined) {
                        position = {
                            top: 0,
                            left: 0,
                        };
                    }

                    if (img_move.length)
                        tl.to(img_move, 0.8, {
                            top: position.top,
                            left: position.left,
                            width: img.width(),
                            height: img.height(),
                            objectFit: "cover",
                            borderRadius: 0,
                        });


                    if (title_move.length) {
                        title = title.first();
                        position = title.offset();
                        if (position === undefined) {
                            position = {
                                top: 0,
                                left: 0,
                            };
                        }


                        tl.to(title_move, 0.8, {
                            top: position.top,
                            left: position.left,

                        }, "-=0.8");

                        title_move.removeClass("title-block");
                        tl.to(title_move, 0.8, {
                            css: {className: "+=" + title.attr("class")},
                        }, "-=0.8");

                        if (title.parents(".v-middle-horizontal").length)
                            title_move.css("width", "max-content");
                        else
                            title_move.css("width", title.width());

                        if (title.find(".dsn-chars-wrapper").length) {
                            let currTrans = title.find(".dsn-chars-wrapper").css("transform").split(/[()]/)[1];
                            if (currTrans)
                                currTrans = currTrans.split(",")[5];
                            if (currTrans)
                                tl.staggerTo(
                                    dsnGrid.randomObjectArray(title_move.find(".dsn-chars-wrapper"), 0.5),
                                    0.6,
                                    {
                                        force3D: true,
                                        y: currTrans,
                                        ease: Back.easeOut.config(1.7),
                                    }, 0.04, "-=0.8");
                        }

                    }


                    let webkitClipPath = {value: "0%"};
                    tl.to(webkitClipPath, 0.5, {
                        value: "100%",
                        onUpdate: function () {
                            elAjax.css("clip-path", "inset(0% 0% " + webkitClipPath.value + " 0%)");
                        },
                        onComplete: function () {
                            webkitClipPath = null;
                        },
                        ease: Circ.easeIn,
                    });


                },
                animateAjaxStart: function (_type, _that) {
                    tl = new TimelineMax();
                    if (_type === "slider")
                        this.ajaxSlider(_that);
                    else if (_type === "next")
                        this.ajaxNextProject(_that);
                    else if (_type === "work")
                        this.ajaxWork(_that);
                    else
                        this.ajaxNormal();

                    effectScroll.locked();
                    tl.call(function () {
                        dsnGrid.scrollTop(0, 0.01);
                    });
                },
                reInitAjax: function (responseText) {

                    $(responseText).filter("script:not([src])").each(function () {
                        if ($(this).text().search(/elementorFrontendConfig/) > -1 || $(this).text().search(/ElementorProFrontendConfig/) > -1) {
                            body.append($(this));
                        }
                    });
                    let objStyle = ["style#elementor-frontend-inline-css"];

                    objStyle.forEach(function ($value) {
                        $(responseText).filter($value).each(function () {
                            let $this = $(this);
                            if (body.find($value).length) {
                                body.find($value).remove();
                            }
                            setTimeout(function () {
                                $("head").append($this);
                                $this = undefined;
                            }, 100);


                        });
                    });

                    $(responseText).filter("link[id*=\"elementor\"]:not([src*=\"plugins/elementor\"])").each(function () {
                        if (body.find("link[id=\"" + $(this).attr("id") + "\"]").length) {
                            body.find("link[id=\"" + $(this).attr("id") + "\"]").remove();
                        }
                        $("head").append($(this));
                    });

                    $(responseText).filter("style[src*=\"plugins/elementor\"]").each(function () {
                        if (!body.find("style[src=\"" + $(this).attr("src") + "\"]").length) {
                            $("head").append($(this));
                        }
                    });


                    $(responseText).filter("script[src*=\"plugins/elementor\"]").each(function () {
                        if (!body.find("script[src=\"" + $(this).attr("src") + "\"]").length) {
                            body.append($(this));
                        }
                    });


                },
                animateAjaxEnd: function (data) {
                    this.setTitle(data);
                    this.setBodyClass(data);
                    this.setDashAdmin(data);
                    this.mainRoot.html($(data).filter(main_root).html());
                    reloadAjax(true);

                    setTimeout(this.reInitAjax.bind(this, data), 50);

                    setTimeout(function () {

                        if ((typeof wpcf7 !== "undefined") && $(".wpcf7-form").length) {
                            wpcf7.initForm(".wpcf7-form");
                        }

                        if (typeof window.elementorFrontend !== "undefined") {
                            elementorFrontend.init();
                        }

                        let elAjax = $(".dsn-ajax-loader");
                        if (elAjax.hasClass("dsn-ajax-normal"))
                            tl.to(elAjax, 1, {scaleY: 0});
                        else
                            this.completeElement(elAjax);


                        tl.call(function () {
                            elAjax.remove();
                            this.effectAjax(false);
                            tl = text_e_img = main_root = null;
                        }.bind(this));
                    }.bind(this), 100);


                },
                backAnimate: function (url) {
                    if (!url) return;
                    let $parent = this;
                    $.ajax({
                        url: url,
                        dataType: "html",
                        beforeSend: $parent.animateAjaxStart.bind($parent),
                        success: function (data) {
                            tl.call($parent.animateAjaxEnd.bind($parent, data), null, null, "+=0.2");
                        }, error: function (error) {
                            window.location = url;
                        },
                    });

                },

                ajaxLoad: function () {
                    if (!body.hasClass("dsn-ajax")) return;
                    let $parent = this;
                    this.ajaxClick.off("click");
                    this.ajaxClick.on("click", function (e) {
                        e.preventDefault();
                        let _that = $(this),
                            url = _that.attr("href"),
                            _type = _that.data("dsn-ajax");

                        if (url.indexOf("#") >= 0 || url === undefined) {
                            _that = url = _type = null;
                            return;
                        }


                        if ($parent.effectAjax()) return;
                        $parent.effectAjax(true);


                        $.ajax({
                            url: url,
                            dataType: "html",
                            beforeSend: $parent.animateAjaxStart.bind($parent, _type, _that),
                            success: function (data) {

                                try {
                                    history.pushState(null, "", url);
                                    tl.call($parent.animateAjaxEnd.bind($parent, data), null, null, "+=0.2");
                                } catch (e) {
                                    window.location = url;
                                }

                            }, error: function (error) {
                                window.location = url;
                            },
                        });

                    });

                },

            };
        }

        function effctStickyNavBar() {
            let headerSmall = $(".site-header");
            headerSmall.removeClass("header-stickytop");
            let bodyScroll = 0;
            let $ofContent = $(".wrapper").offset() || {top: 70};
            let header = $(".header-single-post .container").offset();
            let post_full_content = $(".post-full-content").offset();
            let scrDown = 0;

            if (header !== undefined) {
                $ofContent = header;
            } else if ($ofContent.top <= 70) {
                $ofContent = post_full_content;
            }


            var tl = new TimelineMax({paused: true});
            var t2 = new TimelineMax({paused: true});
            tl.to(".header-top .header-container, .site-header ", .5, {
                backgroundColor: "#111",
                paddingTop: 15,
                paddingBottom: 15,
            });
            tl.reverse();

            t2.to(".header-top .header-container,  .site-header , .dsn-multi-lang", 0.5, {top: -70});
            t2.reverse();

            effectScroll.getListener(function (e) {

                if (e.type === "scroll") {
                    bodyScroll = wind.scrollTop();
                } else {
                    bodyScroll = e.offset.y;
                }


                let $top = 70;
                if ($ofContent !== undefined) {
                    if ($ofContent.top > 70)
                        $top = $ofContent.top - 100;
                }
                if (bodyScroll > $top) {
                    tl.play();
                    if (scrDown < bodyScroll) {
                        t2.play();

                    } else {
                        t2.reverse();
                    }
                } else {
                    tl.reverse();
                }


                scrDown = bodyScroll;
            });

            return {
                "t1": tl,
                "t2": t2,
            };
        }

        /**
         *
         *  - Create an high quality justified gallery
         *    of image
         *
         */
        function justifiedGallery($el) {

            $el.find(".gallery-portfolio").each(function () {
                let $this = $(this);

                $this.justifiedGallery(dsnGrid.getData($this, "option", {}));

                let p = $this.parents(".work-masonry").find(".filterings-t");
                if (p.length) {
                    p.find("button").off("click");
                    p.find("button").on("click", function () {
                        $(this).addClass("active").siblings().removeClass("active");
                        let b = $(this).data("filter");
                        console.log(b);
                        $this.justifiedGallery({
                            filter: function (entry, index, array) {

                                if (!$(entry).is(b)) TweenLite.to(entry, 0.1, {
                                    scale: 0,
                                    ease: Back.easeIn.config(1.2),
                                });
                                else TweenLite.to(entry, 0.6, {
                                    scale: 1, ease: Back.easeOut.config(1.2),
                                    delay: index * 0.1,
                                });
                                return $(entry).is(b);
                            },
                        });
                        b = null;

                    });
                }

                p = null;


            });

        }

        function zoomGallery() {
            $(".zoom-gallery").magnificPopup({
                delegate: "a:not(.effect-ajax)",
                type: "image",
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: "mfp-with-zoom mfp-img-mobile",
                image: {
                    verticalFit: true,
                    titleSrc: function (item) {
                        return item.el.attr("title") + " &middot; <a class=\"image-source-link\" href=\"" + item.el.attr("data-source") + "\" target=\"_blank\">image source</a>";
                    },
                },
                gallery: {
                    enabled: true,
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                    opener: function (element) {
                        return element.find("img");
                    },
                },

            });
        }

        function magnificPopup($el) {


            let option = {
                delegate: "div.effect-popup",
                type: "image",
                closeOnContentClick: false,
                closeBtnInside: false,
                mainClass: "mfp-with-zoom", // this class is for CSS animation below
                image: {
                    verticalFit: true,
                    titleSrc: function (item) {
                        return item.el.attr("data-title");
                    },
                },
                gallery: {
                    enabled: true,
                },
                zoom: {
                    enabled: true,
                    duration: 400, // don't foget to change the duration also in CSS
                    easing: "cubic-bezier(0.36, 0, 0.66, -0.56)", // CSS transition easing function
                    opener: function (element) {
                        return element.find("img");
                    },

                },
                callbacks: {
                    open: function () {
                        $("html").css({margin: 0});
                    }
                },

            };
            $(".gallery-portfolio").each(function () {
                $(this).magnificPopup(option);
            });

            if ($(".has-popup .pop-up").length) option.delegate = "div.pop-up";
            if ($(".has-popup .img-box-parallax").length) option.delegate = "div.img-box-parallax";
            $(".has-popup").magnificPopup(option);

            option = null;

        }


        /**
         *  - the function that move the cursor of an input element to the end
         *
         * @param $off
         *      $off is true stop event listener
         *
         */
        function mouseCirMove($off) {
            let $elemnet = $(".cursor");
            if (dsnGrid.isMobile() || !body.hasClass("dsn-cursor-effect")) {
                if ($elemnet.length) {
                    $elemnet.css("display", "none");
                    body.removeClass("dsn-cursor-effect");
                }
                $elemnet = null;
                return;
            }


            if ($off === true) {
                $elemnet.attr("class", "cursor");
                cursorEffect();
                return;
            }

            dsnGrid.mouseMove($elemnet, {speed: dsnParam.cursor.speed});
            cursorEffect();

            function cursorEffect() {


                dsnGrid.elementHover($elemnet, "a:not(> img):not(.vid):not(.dsn-button-border) , .dsn-button-sidebar,  button , .mfp-container", "cursor-scale-full");
                dsnGrid.elementHover($elemnet, ".c-hidden", "no-scale");
                dsnGrid.elementHover($elemnet, ".has-popup a , .work-item-box a:not(.effect-ajax)", "cursor-scale-half cursor-open");

                dsnGrid.elementHover($elemnet, "[data-cursor=\"close\"]", "cursor-scale-full cursor-close");


                dsnGrid.elementHover($elemnet, "a.link-pop ", "cursor-scale-full cursor-view");

                dsnGrid.elementHover($elemnet, ".proj-slider-image > .slick-list ,.our-work .slick-slider > .slick-list, .slider-project-swiper .swiper-wrapper ", "cursor-scale-half cursor-drag cursor-next cursor-prev");
                dsnGrid.elementHover($elemnet, "[data-cursor=\"next\"]", "cursor-scale-half cursor-next");
                dsnGrid.elementHover($elemnet, "[data-cursor=\"prev\"]", "cursor-scale-half cursor-prev");

                dsnGrid.elementHover($elemnet, ".our-work .work-item a ", "no-drag");

                //--> Mouse Hover Icon
                dsnGrid.moveIcon(".img-box-parallax", ".title-popup");
            }


        }


        function navMenu() {
            const siteHeader = $(".site-header");
            return {

                lineActive: function () {
                    let activeNav = siteHeader.find("ul.extend-container > li.dsn-active");
                    if (activeNav.length)
                        this.setLine(activeNav.offset().left);
                    else {
                        activeNav = siteHeader.find("ul.extend-container > li").first();
                        if (activeNav.length)
                            this.setLine(activeNav.offset().left);
                    }


                    activeNav = null;

                },
                lineMove: function () {
                    let $parent = this;
                    siteHeader.find("ul.extend-container > li").off("mouseenter");
                    siteHeader.find("ul.extend-container > li").on("mouseenter", function () {
                        if (body.hasClass("hamburger-menu")) return;
                        let $this = $(this);
                        let ul = $this.find(" > ul");
                        if (ul.length) {
                            $parent.setLine(ul.offset().left, 55, ul.width(), $this.offset().left);
                        } else {
                            $parent.setLine($(this).offset().left, 55, ul.width());
                        }

                        $this = null;
                        ul = null;

                    });
                    siteHeader.find("ul.extend-container").off("mouseleave");
                    siteHeader.find("ul.extend-container").on("mouseleave", function () {
                        $parent.lineActive();
                    });
                },
                setLine: function (left, top = 55, width = 25, leftO) {
                    TweenMax.to(".nav-border-bottom", 0.3, {
                        left: left, top: top, width: width, onComplete: function () {
                            $(".nav-border-bottom").css({
                                left: leftO || left,
                                width: 25,
                            });
                        },
                    });
                },
                cutterText: function () {
                    let text_menu = siteHeader.find(".menu-icon .text-menu");
                    if (text_menu.length <= 0) return;
                    let text_button = text_menu.find(".text-button");
                    let text_open = text_menu.find(".text-open");
                    let text_close = text_menu.find(".text-close");

                    dsnGrid.convertTextLine(text_button, text_button);
                    dsnGrid.convertTextLine(text_open, text_open);
                    dsnGrid.convertTextLine(text_close, text_close);
                    text_close = null;
                    text_open = null;
                    text_button = null;
                    text_menu = null;
                },
                hamburgerOpen: function () {
                    const mainIcon = siteHeader.find(".menu-icon");
                    const mainNav = siteHeader.find(".main-navigation");

                    if (mainNav.find("ul.extend-container > li").length >= 7) {
                        mainNav.find("ul.extend-container").removeClass('justify-content-center').addClass('justify-content-start');
                    }
                    mainNav.find("ul.extend-container > li ul").each(function () {
                        if ($(this).find("> li").length < 8) {
                            $(this).addClass('justify-content-center');
                        }
                    });


                    let tl = new TimelineMax({
                        paused: true, onReverseComplete: function () {
                            setTimeout(function () {
                                mainIcon.find(".icon-top , .icon-bottom").css("transform", "").css("display", "");
                            }, 50);


                        },
                    });


                    var menuClick = new TimelineMax();
                    let Ease = Power3.easeOut;

                    //--> Open Menu

                    tl.set(mainIcon.find(".icon-center"), {display: "none"});
                    tl.to(mainIcon.find(".icon-top"), 0.5, {width: 23, rotation: 45, top: 6, ease: Ease});
                    tl.to(mainIcon.find(".icon-bottom"), 0.5, {
                        width: 23,
                        rotation: -45,
                        top: -5,
                        ease: Ease,
                    }, 0);
                    tl.to(mainIcon, 0.01, {css: {className: "+=nav-active"}}, 0);

                    tl.to(mainNav, 0.5, {y: "0%", autoAlpha: 1, ease: Ease}, 0);
                    tl.fromTo(mainNav, 0.5, {y: "-100%", autoAlpha: 0}, {
                        y: "0%",
                        autoAlpha: 1,
                        ease: Expo.easeInOut,
                    }, 0);

                    tl.staggerTo(mainNav.find("ul.extend-container > li > a .dsn-title-menu"), 0.5, {
                        autoAlpha: 1,
                        y: 0,
                        ease: Back.easeOut.config(1.7),
                    }, 0.05);


                    tl.set(mainNav.find("ul.extend-container > li > a .dsn-meta-menu"), {
                        autoAlpha: 1,
                        ease: Ease,
                    });
                    tl.to(mainNav.find(".container-content"), 1, {autoAlpha: 1}, "-=1");
                    tl.reverse();


                    mainNav.find("ul.extend-container > li.dsn-drop-down").on("click", function (e) {
                        e.stopPropagation();
                        if (menuClick._totalDuration > 0) return;
                        menuClick = new TimelineMax({
                            onReverseComplete: function () {
                                menuClick = new TimelineMax();
                            },
                        });
                        menuClick.set($(this).find("ul"), {display: "flex"});
                        menuClick.to(mainNav.find("ul.extend-container > li > a ").find(".dsn-title-menu , .dsn-meta-menu"), 0.5,
                            {y: -30, autoAlpha: 0, ease: Back.easeIn.config(1.7)});
                        menuClick.set(".site-header .extend-container .main-navigation ul.extend-container li", {overflow: "hidden"});
                        menuClick.staggerFromTo($(this).find("ul li"), 0.5, {x: 50, autoAlpha: 0}, {
                            x: 0,
                            autoAlpha: 1,
                            ease: Back.easeOut.config(1.7),
                        }, 0.1);
                    });

                    mainIcon.off("click");
                    mainIcon.on("click", function () {
                        if (!tl.isActive()) {
                            menuClick.reverse(-1);
                            tl.reversed(!tl.reversed());
                            menuClick = new TimelineMax();
                        }


                    });

                    mainNav.find("ul.extend-container > li > [href*=\"#\"]:not([href=\"#\"]):not([href=\"#0\"])").on('click', function () {
                        tl.progress(0).reverse();
                        menuClick.progress(0).reverse();
                        menuClick = new TimelineMax();


                    });
                    let backMenu = $(".dsn-back-menu");
                    backMenu.off("click");
                    backMenu.on("click", function () {
                        menuClick.reverse();
                    });
                    backMenu = null;

                },


                init: function () {
                    if (!siteHeader.length) return;
                    let $parent = this;
                    this.cutterText();
                    if (wind.width() > 991 && body.hasClass("classic-menu")) {
                        siteHeader.find("ul.extend-container > li").off("mouseenter");
                        siteHeader.find("ul.extend-container").off("mouseleave");
                        $parent.lineMove();
                        setTimeout($parent.lineActive.bind($parent), 500);

                    }
                    $parent.hamburgerOpen();


                },
            };


        }


        /**
         *
         * @returns {{getScrollbar: getScrollbar, scrollNavigate: scrollNavigate, start: start, isScroller: (function(*=): boolean), locked: locked, getListener: getListener}}
         */
        function effectScroller() {
            const Scrollbar = window.Scrollbar;
            const locked_scroll = "locked-scroll";
            var myScrollbar = document.querySelector("#dsn-scrollbar");


            return {
                isScroller: function ($print) {
                    if ($print)
                        myScrollbar = document.querySelector("#dsn-scrollbar");

                    let hasSc = !body.hasClass("dsn-effect-scroll") || dsnGrid.isMobile() || myScrollbar === null;
                    if (hasSc && $print) {
                        body.addClass("dsn-mobile");
                    }

                    return !hasSc;
                },
                locked: function () {
                    body.addClass(locked_scroll);
                    if (this.isScroller()) {
                        let scroll = this.getScrollbar();
                        if (scroll !== undefined) {
                            scroll.destroy();
                        }
                        scroll = null;
                    }
                },
                getScrollbar: function ($id) {
                    if ($id === undefined) {
                        return Scrollbar.get(myScrollbar);
                    }
                    return Scrollbar.get(document.querySelector($id));
                },
                getListener: function ($obj, $useWin = true) {
                    if ($obj === undefined) return;
                    let $this = this;
                    if ($this.isScroller()) {
                        $this.getScrollbar().addListener($obj);
                    } else {
                        if ($useWin)
                            wind.on("scroll", $obj);
                    }
                    $this = null;
                },
                scrollNavigate: function () {
                    let top = $(".wrapper").offset();
                    top = top ? top.top : 0;
                    $(".scroll-top , .scroll-to-top").on("click", function () {
                        dsnGrid.scrollTop(0, 2);
                    });

                    $(".scroll-d").on("click", function () {
                        dsnGrid.scrollTop(top, 2,
                            ($(".scrollmagic-pin-spacer").height() * -1) - 200 || -200);
                    });

                },

                start: function () {
                    this.menuScroll();

                    body.removeClass(locked_scroll);
                    dsnGrid.scrollTop(0, 1);
                    if (!this.isScroller(true)) return;
                    Scrollbar.init(myScrollbar, {
                        damping: dsnParam.scrollbar.speed || 0.05,
                    });
                    this.sidebarScroll();
                },

                sidebarScroll: function () {
                    const comment = document.querySelector(".dsn-sidebar .sidebar-single");

                    if (comment !== null)
                        Scrollbar.init(comment, {
                            damping: dsnParam.scrollbar.speed || 0.05,
                        });
                },
                menuScroll: function () {
                    const menuNav = document.querySelector("body:not(.classic-menu) .site-header .extend-container .main-navigation");

                    if (menuNav !== null)
                        Scrollbar.init(menuNav, {
                            damping: dsnParam.scrollbar.speed || 0.05,
                        });


                    const comment = document.querySelector(".site-header .extend-container .main-navigation ul.extend-container > li ul");

                    if (comment !== null)
                        Scrollbar.init(comment, {
                            damping: dsnParam.scrollbar.speed || 0.05,
                        });

                }


            };

        }

        function effectAnimate() {
            let controller = new ScrollMagic.Controller();
            let scene = [];

            return {
                clearControl: function () {
                    controller.destroy(true);
                    controller = new ScrollMagic.Controller();
                    for (let s of scene) {
                        s.destroy(true);
                        s = null;
                    }
                    scene = [];

                },
                allInt: function () {
                    this.clearControl();
                    this.headerProject();
                    this.nextProject();
                    this.changeColor();
                    this.headerPages();
                    this.animateFade();
                    this.animateSkills();
                    this.animateNumbers();
                    this.sectionWork();
                    this.parallaxImg();
                    this.parallaxImgHover();
                    this.moveSection();


                    effectScroll.scrollNavigate();
                    effectScroll.getListener(function () {
                        for (let s of scene) {
                            s.refresh();
                        }
                    });

                },
                headerPages: function () {
                    $("[data-dsn-header=\"parallax\"]").each(function () {
                        let heroImg = $(this).find("#dsn-hero-parallax-img , .dsn-hero-parallax-img"),
                            heroTitle = $(this).find("#dsn-hero-parallax-title"),
                            holder = $(this).find("a[target=\"_blank\"] , .scroll-d");

                        let parallax = new TimelineLite();

                        //--> Hero Image Project
                        if (heroImg.length > 0) {
                            parallax.to(heroImg, 1, {top: "30%", force3D: true}, 0);
                        }

                        //--> Hero Title
                        if (heroTitle.length > 0) {
                            parallax.to(heroTitle, .8, {
                                force3D: true,
                                y: "100%",
                                autoAlpha: 0,
                                scale: 0.9,
                            }, 0);
                        }


                        //--> Hero Fill Title
                        if (holder.length > 0)
                            parallax.to(holder, .8, {
                                force3D: true,
                                y: 60,
                                autoAlpha: 0,
                            }, 0);


                        let parallaxProject = dsnGrid.tweenMaxParallax(effectScroll, controller).addParrlax({
                            id: this,
                            triggerHook: 0,
                            tween: parallax,
                        });


                        let video = heroImg.find("video");
                        if (video.length) {
                            parallaxProject.on("enter", function () {
                                if (video.length)
                                    video.get(0).play();
                            });
                            parallaxProject.on("leave", function () {
                                if (video.length)
                                    video.get(0).pause();
                            });

                        } else {
                            video = null;
                        }
                        if (parallaxProject)
                            scene.push(parallaxProject);
                        parallax = parallaxProject = null;

                    });


                },
                parallaxImgHover: function ($el = $(document)) {
                    let parallax = $el.find("[data-dsn=\"parallax\"]");
                    if (parallax.length <= 0 || dsnGrid.isMobile()) {
                        parallax = null;
                        return;
                    }

                    parallax.each(function () {
                        let _that = $(this),
                            dsn_grid = dsnGrid.removeAttr(_that, "data-dsn"),
                            speed = dsnGrid.getData(_that, "speed", 0.5),
                            move = dsnGrid.getData(_that, "move", 20);


                        dsnGrid.parallaxMoveElement(_that, move, speed, _that.find(".dsn-parallax-rev").get(0), _that.hasClass("image-zoom"));
                        _that = dsn_grid = speed = move = null;

                    });
                },
                headerProject: function () {
                    let eHeaderProject = "[data-dsn-header=\"project\"]";
                    if ($(eHeaderProject).length <= 0 || $(eHeaderProject).hasClass("dsn-end-animate")) {
                        eHeaderProject = null;
                        return false;
                    }
                    let heroImg = $("#dsn-hero-parallax-img"),
                        heroTitle = $("#dsn-hero-title"),
                        heroDec = $("#dsn-hero-description"),
                        heroDecItem = $("#dsn-hero-desc-items"),
                        heroDecItems = heroDecItem.find(".descrption-item"),
                        scrollD = $(eHeaderProject).find(".scroll-d img");

                    let parallax = new TimelineLite();


                    //--> Hero Image Project
                    if (heroImg.length && !dsnGrid.isMobile()) {
                        parallax.to(heroImg, 2, {width: "40%", left: "60%"});
                    }


                    //--> Hero Title
                    if (heroTitle.length && (heroDec.length || heroDecItem.length)) {

                        dsnGrid.convertTextLine(heroTitle.find(".title"));

                        if (heroDec.length)
                            TweenLite.set(heroTitle.find(".dsn-chars-wrapper , .metas"), {y: "+=" + heroDec.height()});
                        if (heroDecItem.length)
                            TweenLite.set(heroTitle.find(".dsn-chars-wrapper , .metas"), {y: "+=" + (heroDecItem.height() - 30)});

                        parallax.to(heroTitle.find(".metas"), 1, {
                            force3D: true,
                            y: "0",
                            ease: Back.easeOut.config(1.7),
                        }, 0);

                        parallax.staggerTo(
                            heroTitle.find(".dsn-chars-wrapper"),
                            1.5,
                            {
                                force3D: true,
                                y: "0",
                                ease: Back.easeOut.config(1.7),
                            }, 0.1, 0);
                    }


                    //--> Hero Fill Title
                    if (heroDec.length)
                        parallax.fromTo(heroDec, .8, {y: "15%", autoAlpha: 0}, {y: "0%", autoAlpha: 1});

                    //--> Hero Fill Title
                    if (heroDecItem.length)
                        parallax.fromTo(heroDecItem, .3, {y: "15%", autoAlpha: 0}, {y: "0%", autoAlpha: 1});

                    //--> Hero Fill Title
                    if (heroDecItems.length)
                        parallax.staggerFromTo(heroDecItems, 1, {y: "15%", autoAlpha: 0}, {
                            y: "0%",
                            autoAlpha: 1,
                        }, 0.2);


                    let parallaxProject = dsnGrid.tweenMaxParallax(effectScroll, controller).addParrlax({
                        id: eHeaderProject,
                        triggerHook: 0,
                        duration: 2100,
                        tween: parallax,
                        _fixed: true,
                    });


                    if (parallaxProject) {
                        if (scrollD.length) {
                            parallaxProject.on("progress", function ($num) {
                                TweenLite.to($("[data-dsn-header=\"project\"]").find(".scroll-d img"), 0.3, {rotation: $num.progress * 500});
                            });
                        }

                        scene.push(parallaxProject);
                    }


                    eHeaderProject = scrollD = scrollD = parallax = parallaxProject = heroImg = heroDecItems = heroDecItem = heroDec = heroTitle = null;

                },
                nextProject: function () {
                    let eFooterProject = $("[data-dsn-footer=\"project\"]");
                    if (!eFooterProject.length) return false;

                    let
                        heroTitle = $("#dsn-footer-title"),
                        heroImg = eFooterProject.find("#dsn-footer-hero");
                    let parallax = new TimelineLite();
                    if (heroImg.length) {

                        parallax.fromTo(heroImg, 3, {top: "-30%", opacity: 0}, {
                            top: "0%",
                            opacity: 1,
                        }, 0);
                    }


                    //--> Hero Title
                    if (heroTitle.length) {
                        dsnGrid.convertTextLine(heroTitle);
                        TweenLite.set(heroTitle.find(".dsn-chars-wrapper"), {y: 50, autoAlpha: 0});

                        parallax.staggerTo(
                            dsnGrid.randomObjectArray(heroTitle.find(".dsn-chars-wrapper"), 0.8),
                            1,
                            {
                                force3D: true,
                                y: "0",
                                autoAlpha: 1,
                                ease: Back.easeOut.config(1.7),
                            }, 0.1, "-=1");
                    }


                    let parallaxProject = dsnGrid.tweenMaxParallax(effectScroll, controller).addParrlax({
                        id: eFooterProject,
                        triggerHook: 1,
                        duration: "100%",
                        tween: parallax,
                    });

                    if (parallaxProject)
                        scene.push(parallaxProject);

                    parallax = parallaxProject = heroTitle = null;

                },
                animateFade: function ($el = $(document)) {
                    let $element = $el.find("[data-dsn-animate=\"section\"]");

                    dsnGrid.getData($element, "animate");
                    $element.each(function () {
                        let controllerFade = new ScrollMagic.Controller(),
                            tl = new TimelineLite({paused: true}),
                            $this = $(this),
                            fadeUp = $this.find(".dsn-up"),
                            text = $this.find(".dsn-text");


                        $this.addClass("transform-3d");
                        if ($this.hasClass("dsn-animate"))
                            tl.fromTo(this, 1, {y: 50, opacity: 0}, {y: 0, opacity: 1});

                        if (text.length) {
                            text.each(function () {
                                dsnGrid.convertTextLine(this, this);
                                $(this).addClass("overflow-hidden");


                                tl.staggerFromTo($(this).find(".dsn-word-wrapper"), 0.6,
                                    {
                                        willChange: "transform",
                                        transformOrigin: "0 100%",
                                        x: 8,
                                        y: 13,
                                        rotation: 20,
                                        opacity: 0,
                                    },
                                    {
                                        x: 0,
                                        y: 0,
                                        rotation: 0,
                                        opacity: 1,
                                        ease: Back.easeOut.config(2),
                                    }, 0.1);
                            });

                        }

                        if (fadeUp.length) {
                            tl.staggerFromTo(fadeUp, 0.8, {y: 20, opacity: 0}, {
                                y: 0,
                                opacity: 1,
                                delay: $this.hasClass("dsn-animate") ? 0.5 : 0,
                                ease: Back.easeOut.config(1.7),
                            }, 0.2, 0);
                        }


                        tl._totalDuration = 1;
                        dsnGrid.tweenMaxParallax(effectScroll, controllerFade).addParrlax({
                            id: this,
                            reverse: false,
                            triggerHook: dsnGrid.getData(this, "triggerhook-section", 0.5),
                            duration: 0,
                            tween: tl,
                        });

                        controllerFade = tl = $this = fadeUp = text = null;
                    });
                    $element = null;
                },
                animateSkills: function ($el = $(document)) {

                    $el.find(".skills-personal").each(function () {
                        let controllerFade = new ScrollMagic.Controller(),
                            tl = new TimelineLite({paused: true}),
                            $this = $(this),
                            skills = $this.find(".skills-item .fill");

                        if (skills.length) {
                            skills.each(function ($index) {
                                let c = $(this);
                                tl.to(c, 1, {
                                    width: c.data("width"), ease: Power0.easeNone,
                                    onUpdate: function () {
                                        c.find(".number").text((c.width() / c.parent().width() * 100).toFixed(0) + "%");
                                    },
                                    onComplete: function () {
                                        c = null;
                                    },
                                }, $index * 0.2);

                            });


                            tl._totalDuration = 1;
                        }


                        dsnGrid.tweenMaxParallax(effectScroll, controllerFade).addParrlax({
                            id: this,
                            reverse: false,
                            triggerHook: 0.5,
                            duration: 0,
                            tween: tl,
                        });

                        controllerFade = tl = null;
                    });
                },
                animateNumbers: function () {
                    let $element = $(".have-dsn-animate-number");
                    $element.each(function () {
                        let numbers = $(this).find(".has-animate-number");
                        if (!numbers.length) {
                            numbers = null;
                            return;
                        }
                        let tl = new TimelineLite({paused: true});

                        numbers.each(function ($index) {
                            let c = $(this);
                            let numbers = {value: 0};
                            tl.to(numbers, 4, {
                                value: c.text(), ease: Back.easeOut.config(1.2),
                                onUpdate: function () {
                                    c.text(dsnGrid.numberText(numbers.value.toFixed(0)));
                                },
                                onComplete: function () {
                                    c = numbers = null;
                                },
                            }, $index * 0.2);

                        });


                        tl._totalDuration = 1;


                        dsnGrid.tweenMaxParallax(effectScroll, new ScrollMagic.Controller()).addParrlax({
                            id: this,
                            reverse: false,
                            triggerHook: 0.5,
                            duration: 0,
                            tween: tl,
                        });

                        tl = null;
                    });
                    $element = null;
                },
                sectionWork: function () {
                    let containerWork = $(".work-container[data-dsn-animate=\"work\"]"),
                        sectionWork = containerWork.find(".d-block"),
                        allSection = sectionWork.find(".work-item");
                    if (sectionWork.length) {
                        let widtSection = wind.width() / 2.5;
                        if (dsnGrid.isMobile() && wind.width() < 768 && wind.width() >= 576)
                            widtSection = wind.width() / 1.5;
                        else if (dsnGrid.isMobile() && wind.width() < 576)
                            widtSection = wind.width() / 1.15;

                        allSection.each(function () {
                            $(this).css({
                                width: widtSection,
                                float: "left",
                                minHeight: 1,
                            });
                        });
                        sectionWork.css("width", (widtSection * allSection.length));
                        widtSection = null;

                        let parallaxIt = dsnGrid.tweenMaxParallax(effectScroll, controller).addParrlax({
                            id: containerWork,
                            triggerHook: 0,
                            _fixed: true,
                            duration: allSection.length * 350,
                            refreshParallax: true,
                            tween: TweenLite.to(sectionWork, 0.5, {
                                force3D: true,
                                x: (allSection.last().offset().left - (allSection.last().width()) * 1.5) * -1,
                                ease: Linear.easeNone,
                            }),
                        });
                        if (parallaxIt)
                            scene.push(parallaxIt);
                        parallaxIt = null;
                    }
                    containerWork = sectionWork = allSection = null;
                },
                parallaxImg: function ($el = $(document)) {
                    let ease = Power1.easeOut;
                    let timer = 0.01;
                    $el.find("[data-dsn-grid=\"move-up\"]").each(function ($index) {
                        let _that = $(this);

                        _that.attr("data-dsn-grid", "moveUp");
                        let img = _that.find("img:not(.hidden) , video");

                        let triggerHook = dsnGrid.getData(this, "triggerhook", 1),
                            duration = dsnGrid.getData(this, "duration", "200%"),
                            top = dsnGrid.getData(this, "top");


                        if (img.length > 0) {
                            if (top) img.css("top", top);
                            let parallax,
                                pers = dsnGrid.getData(img, "y", img.hasClass("has-opposite-direction") ? "-15" : "30"),
                                objAnimate = {y: pers + "%", skewX: 0, ease: ease, scale: 1, z: 0.01};
                            if (!img.hasClass("has-opposite-direction")) {
                                img.css("height", 100 + (pers / 2) + "%");
                                img.css("top", -1 * (pers * triggerHook) + "%");
                            }


                            if (img.hasClass("has-top-bottom")) {
                                parallax = TweenMax.to(img, timer, objAnimate);
                            } else {
                                objAnimate.scale = dsnGrid.getData(img, "scale", 1.1);
                                parallax = TweenMax.to(img, timer, objAnimate);
                            }


                            let parallaxIt = dsnGrid.tweenMaxParallax(effectScroll, controller).addParrlax({
                                id: this,
                                triggerHook: triggerHook,
                                duration: duration,
                                tween: parallax,
                            });


                            if (parallaxIt)
                                scene.push(parallaxIt);


                            parallaxIt = parallax = pers = duration = triggerHook = img = _that = objAnimate = null;

                        }

                    });
                    ease = timer = null;
                },
                dsnScrollTop: function () {

                    let wrap = $(".wrapper");
                    let wrap_id = wrap;


                    if (!wrap.length || !$(".scroll-to-top").length) {
                        wrap = null;
                        return;
                    }

                    if (wrap.offset().top <= 32) {
                        let wrap2 = wrap.find(".elementor-section-wrap > *").get(1);
                        if ($(wrap2).length)
                            wrap_id = wrap2;


                    }


                    TweenLite.to(".scroll-to-top", 1, {right: -100, autoAlpha: 0});
                    TweenLite.to(".stories-sticky-footer", 1, {autoAlpha: 0});

                    let parallaxIt = dsnGrid.tweenMaxParallax(effectScroll, controller).addParrlax({
                        id: wrap_id,
                        triggerHook: 0.5,
                        duration: (wrap.height() - (wind.height() * 0.5)) + ($(".next-project").outerHeight() || 0),
                        tween: TweenLite.to(".scroll-to-top > img", 0.3, {rotation: wrap.height() / 2}),
                    });

                    parallaxIt.on("progress", function ($s) {
                        $(".scroll-to-top .box-numper span").text((($s.progress) * 100).toFixed(0) + "%");
                    });

                    parallaxIt.on("enter", function ($s) {
                        TweenLite.to(".scroll-to-top", 1, {right: 20, autoAlpha: 1});
                        TweenLite.to(".stories-sticky-footer", 1, {autoAlpha: 1});

                    });

                    parallaxIt.on("leave", function ($s) {
                        TweenLite.to(".scroll-to-top", 1, {right: -100, autoAlpha: 0});
                        TweenLite.to(".stories-sticky-footer", 1, {autoAlpha: 0});

                    });

                    if (parallaxIt)
                        scene.push(parallaxIt);

                    parallaxIt = wrap = null;

                },
                moveSection: function ($el = $(document)) {
                    let moveUp = $el.find("[data-dsn-grid=\"move-section\"]");
                    let ease = Linear.easeNone;
                    let timer = 0.01;
                    moveUp.each(function () {
                        let _that = $(this);
                        dsnGrid.getData(this, "grid");
                        _that.addClass("dsn-move-section");
                        if (dsnGrid.getData(this, "responsive") === "tablet" && wind.width() < 869) return;

                        let move = dsnGrid.getData(_that, "move", -100),
                            triggerHook = dsnGrid.getData(_that, "triggerhook", 1),
                            opacity = dsnGrid.getData(_that, "opacity", _that.css("opacity")),
                            duration = dsnGrid.getData(_that, "duration", "150%");
                        let parallaxIt = dsnGrid.tweenMaxParallax(effectScroll, controller).addParrlax({
                            id: this,
                            triggerHook: triggerHook,
                            duration: duration,
                            tween: TweenMax.to(_that, timer, {y: move, autoAlpha: opacity, ease: ease}),
                        });
                        scene.push(parallaxIt);
                        _that = move = triggerHook = opacity = duration = null;
                    });
                    moveUp = ease = timer = null;

                },
                changeColor: function ($el = $(document)) {
                    $el.find("[data-dsn=\"color\"]").each(function () {

                        let duration = dsnGrid.getData(this, "duration");
                        if (duration)
                            duration = duration + "%";
                        else
                            duration = $(this).outerHeight() + 50;

                        let triggerHook = dsnGrid.getData(this, "triggerhook", 0);


                        let parallaxIt = new ScrollMagic.Scene({
                            triggerElement: this,
                            triggerHook: triggerHook,
                            duration: duration,
                        })
                            .addTo(controller);

                        parallaxIt.on("enter", function () {
                            body.toggleClass("v-light");
                        });
                        parallaxIt.on("leave", function () {
                            body.toggleClass("v-light");
                        });

                        if (parallaxIt)
                            scene.push(parallaxIt);

                    });
                },

            };


        }


        function slider($el) {
            const dsn_slider = $el.find(".main-slider");
            let targetNavSlider = $el.find(".nav-slider");
            let tl = new TimelineLite();
            let $obj = dsnGrid.getData(dsn_slider, 'option', {});
            return {
                run: function () {
                    if (dsn_slider.length <= 0) return;
                    let horizontal = dsn_slider.hasClass("has-horizontal");
                    this.initSlider();
                    let swiper = this.swiperObject(this.isDemoSlide(), !horizontal);
                    if (!this.isDemoSlide()) {
                        this.progress(swiper, !horizontal);
                        this.touchStart(swiper);
                        this.setTransition(swiper);
                    }
                    this.slideChange(swiper);

                    if (this.isDemoSlide() && !dsn_slider.hasClass("has-loop"))
                        swiper.slideTo(1);


                    if (targetNavSlider.length <= 0 || this.isDemoSlide()) {
                        swiper = null;
                        return;
                    }

                    //--> Navigation Slider
                    let navSlider = new Swiper(".nav-slider", {
                        speed: 1500,
                        centeredSlides: true,
                        touchRatio: 0.2,
                        slideToClickedSlide: true,
                        direction: (horizontal) ? "horizontal" : "vertical",
                        resistanceRatio: 0.65,
                        spaceBetween: 0,
                        loop: dsn_slider.hasClass("has-loop"),


                    });

                    //--> Matching sliders
                    swiper.controller.control = navSlider;
                    navSlider.controller.control = swiper;
                    this.progress(navSlider, !horizontal);
                    this.setTransition(navSlider);

                    targetNavSlider.on("click", function () {
                        if (tl.isActive()) return;
                        if (navSlider.slides.length === (navSlider.activeIndex + 1)) {
                            swiper.slideTo(0);
                        } else {
                            swiper.slideNext();
                        }

                    });


                    targetNavSlider = null;


                },
                isDemoSlide: function () {
                    return dsn_slider.hasClass("demo-3");
                },
                initSlider: function () {
                    let slid_items = dsn_slider.find(".slide-item");
                    let dsn_slider_content = dsn_slider.find(".dsn-slider-content > div");
                    let $parent = this;
                    let $object = [];
                    let $next = dsnGrid.getData(dsn_slider, "next");
                    slid_items.each(function ($index) {
                        let $this = $(this);
                        $this.attr("data-dsn-id", $index);
                        let slide_content = $(this).find(".slide-content");
                        slide_content.attr("data-dsn-id", $index);
                        if ($index === 0) slide_content.addClass("dsn-active dsn-active-cat");
                        dsn_slider_content.append(slide_content);
                        let title = slide_content.find(".title a");
                        if (!title.length)
                            title = slide_content.find(".title");

                        if (!$parent.isDemoSlide())
                            $object.push(
                                $parent.nextSlide(
                                    title.text(),
                                    slide_content.find(".metas").html(),
                                    $(this).find(".image-bg").clone(),
                                    $next,
                                ),
                            );

                        dsnGrid.convertTextLine(title, title);

                        $this = slide_content = title = null;
                    });

                    if (!$parent.isDemoSlide()) {
                        $object.push($object.shift());
                        $(".box-next > .swiper-wrapper").append($object);
                    }
                    $object = $parent = dsn_slider_content = slid_items = null;


                },
                swiperObject: function (isDemo, $isVertical = true) {

                    $obj = $.extend(true, {
                        speed: 1500,
                        spaceBetween: 20,
                        autoplay: false
                    }, $obj);

                    return new Swiper(".main-slider .slide-inner", {
                        speed: $obj.speed,
                        grabCursor: true,
                        allowTouchMove: true,
                        direction: $isVertical ? "vertical" : "horizontal",
                        slidesPerView: isDemo ? "auto" : 1,
                        centeredSlides: isDemo,
                        slideToClickedSlide: isDemo,
                        autoplay: ($obj.autoplay) ? true : false,
                        loop: dsn_slider.hasClass("has-loop"),
                        navigation: {
                            nextEl: dsn_slider.find(".arrow-down"),
                            prevEl: dsn_slider.find(".arrow-up"),
                        },
                        pagination: {
                            el: ".main-slider .dsn-controls .dsn-progress-indicator .num-progress-current",
                            type: "custom",
                            clickable: true,
                            renderCustom: function (swiper, current, total) {

                                $(".main-slider .dsn-controls .dsn-numbers span.full-number").html(dsnGrid.numberText(total));
                                TweenLite.to(".main-slider .dsn-controls .dsn-progress .dsn-progress-indicator", 1, {height: (current / total) * 100 + "%"});

                                return dsnGrid.numberText(current);
                            },
                        },
                        spaceBetween: $obj.spaceBetween,
                        resistanceRatio: 0.65,
                        watchSlidesProgress: true,
                        on: {
                            init: function () {
                                this.autoplay.stop();
                                dsn_slider.find("[data-dsn=\"video\"] video").each(function () {
                                    this.pause();
                                });
                            },
                            imagesReady: function () {
                                let v = $(this.slides[this.activeIndex]).find("[data-dsn=\"video\"] video");
                                if (v.length) v.get(0).play();
                                v = null;
                            },
                        },
                    });


                },
                progress: function (swiper, $isVertical = true) {
                    swiper.on("progress", function () {
                        let swiper = this;
                        for (let i = 0; i < swiper.slides.length; i++) {
                            let slideProgress = swiper.slides[i].progress,
                                innerOffset = ($isVertical ? swiper.height : swiper.width) * 0.5,
                                innerTranslate = slideProgress * innerOffset,
                                trns = $isVertical ? "Y" : "X";
                            swiper.slides[i].querySelector(".image-bg:not(.hidden)").style.transform =
                                "translate" + trns + "(" + innerTranslate + "px) ";

                            innerTranslate = trns = innerOffset = slideProgress = null;
                        }
                        swiper = null;
                    });
                },
                touchStart: function (swiper) {
                    swiper.on("touchStart", function () {
                        $(this.slides).css("transition", "");
                    });
                },
                setTransition: function (swiper) {
                    swiper.on("setTransition", function (speed) {
                        $(this.slides).find(".image-bg").css("transition", speed - 100 + "ms  ");
                    });
                },
                slideChange: function (swiper) {
                    let $this = this;
                    swiper.on("slideChange", start);

                    function start() {

                        //--> Slider before change
                        let contentOld = dsn_slider.find(".dsn-slider-content .dsn-active");
                        let numOld = contentOld.data("dsn-id");

                        //--> Slider current change
                        let slider = $(swiper.slides[swiper.activeIndex]);

                        let id = slider.data("dsn-id");
                        if (numOld === id) return;
                        dsn_slider.find("[data-dsn=\"video\"] video").each(function () {
                            this.pause();
                        });
                        let v = $(this.slides[this.activeIndex]).find("[data-dsn=\"video\"] video");
                        if (v.length) v.get(0).play();


                        //--> Content Old
                        let content_letterOld = contentOld.find(".dsn-chars-wrapper");
                        contentOld.removeClass("dsn-active-cat");

                        //--> Content New
                        let contentNew = dsn_slider.find(".dsn-slider-content [data-dsn-id=\"" + id + "\"]");
                        let content_letterNew = contentNew.find(".dsn-chars-wrapper");


                        let $isRight = numOld > id;

                        tl.progress(1);
                        tl = new TimelineLite();

                        tl.staggerFromTo(
                            content_letterOld,
                            0.3,
                            $this.showText().title,
                            $this.hideText($isRight).title,
                            0.05,
                            0,
                            function () {
                                dsn_slider.find(".dsn-slider-content .slide-content").removeClass("dsn-active").removeClass("dsn-active-cat");
                                contentNew.addClass("dsn-active");
                                contentNew.addClass("dsn-active-cat");
                            },
                        );

                        tl.staggerFromTo(
                            dsnGrid.randomObjectArray(content_letterNew, 0.8),
                            0.8,
                            $this.hideText(!$isRight).title,
                            $this.showText().title,
                            0.05,
                            "-=.1",
                        );

                        contentOld = numOld = slider = id = v = content_letterOld = content_letterNew = $isRight = null;

                    }
                },
                showText: function () {
                    return {
                        title: {
                            autoAlpha: 1,
                            y: "0%",
                            scale: 1,
                            rotation: 0,
                            ease: Back.easeOut.config(4),
                            yoyo: true,

                        },
                        subtitle: {
                            autoAlpha: 1,
                            y: "0%",
                            ease: Elastic.easeOut,
                        },
                    };
                },
                hideText: function ($isRigth) {
                    return {
                        title: {
                            autoAlpha: 0,
                            y: ($isRigth) ? "20%" : "-20%",
                            rotation: 8,
                            ease: Back.easeIn.config(4),
                            yoyo: true,
                        },
                        subtitle: {
                            autoAlpha: 0,
                            y: ($isRigth) ? "50%" : "-50%",
                            ease: Elastic.easeOut,
                        },
                    };
                },
                nextSlide: function ($title, $cat, $img, $next) {

                    $cat = $cat || "";
                    return " <div class=\"swiper-slide\">\n" +
                        "                    <div class=\"d-flex a-item-center h-100\">\n" +
                        "                        <div class=\"content-box-next\">\n" +
                        "                            <span class='v-middle-vertical text-next'>" + $next + "</span>\n" +
                        "                            <h5 class=\"title-next\">" + $title + "</h5>\n" +
                        "                            <div class=\"metas\">\n" + $cat +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "                        <div class=\"img-box-next p-relative h-100 overflow-hidden\">\n" + $img.addClass("p-absolute").removeClass("hidden").get(0).outerHTML +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div>";
                },


            };
        }


        /**
         * Attr data overlay
         */
        function data_overlay() {
            $("[data-overlay-color]").each(function ($index) {
                var _that = $(this);
                var _color = dsnGrid.removeAttr(_that, "data-overlay-color");
                _that.addClass("dsn-overlay-" + $index);
                $("body").append("<style>.dsn-overlay-" + $index + "[data-overlay]:before{background: " + _color + ";}</style>");
            });
        }


        /**
         *
         * Function set background image from data background
         *
         */
        function background() {

            var cover = $(".cover-bg, section , [data-image-src]");
            cover.each(function () {
                var attr = $(this).attr("data-image-src");

                if (typeof attr !== typeof undefined && attr !== false) {
                    $(this).css("background-image", "url(" + attr + ")");
                }

            });
        }

        function initMap($off, $el) {
            let map_id = $el.find(".map-custom");
            let map_scropt_id = document.getElementById("map_api");

            if (map_id.length <= 0) return;
            // Styles a map in night mode.

            if (map_scropt_id === null) {
                var GOOGLE_MAP_KEY = dsnParam.map_api;

                var script = document.createElement("script");
                script.type = "text/javascript";
                script.id = "map_api";
                script.src = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAP_KEY;
                document.body.appendChild(script);

            }

            setTimeout(function () {
                try {
                    map_id.each(function () {
                        let map_att = $(this),
                            lat = dsnGrid.getData(this, "lat"),
                            leg = dsnGrid.getData(this, "len"),
                            zoom = dsnGrid.getData(this, "zoom");
                        var letLeng = new google.maps.LatLng(lat, leg),
                            map = new google.maps.Map(map_att.get(0), {
                                center: {
                                    lat: lat,
                                    lng: leg,
                                },
                                mapTypeControl: false,
                                scrollwheel: false,
                                draggable: true,
                                streetViewControl: false,
                                navigationControl: false,
                                zoom: zoom,
                                styles: [
                                    {
                                        "featureType": "water",
                                        "elementType": "geometry",
                                        "stylers": [
                                            {
                                                "color": "#e9e9e9",
                                            },
                                            {
                                                "lightness": 17,
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "landscape",
                                        "elementType": "geometry",
                                        "stylers": [
                                            {
                                                "color": "#f5f5f5",
                                            },
                                            {
                                                "lightness": 20,
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "road.highway",
                                        "elementType": "geometry.fill",
                                        "stylers": [
                                            {
                                                "color": "#ffffff",
                                            },
                                            {
                                                "lightness": 17,
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "road.highway",
                                        "elementType": "geometry.stroke",
                                        "stylers": [
                                            {
                                                "color": "#ffffff",
                                            },
                                            {
                                                "lightness": 29,
                                            },
                                            {
                                                "weight": 0.2,
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "road.arterial",
                                        "elementType": "geometry",
                                        "stylers": [
                                            {
                                                "color": "#ffffff",
                                            },
                                            {
                                                "lightness": 18,
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "road.local",
                                        "elementType": "geometry",
                                        "stylers": [
                                            {
                                                "color": "#ffffff",
                                            },
                                            {
                                                "lightness": 16,
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "poi",
                                        "elementType": "geometry",
                                        "stylers": [
                                            {
                                                "color": "#f5f5f5",
                                            },
                                            {
                                                "lightness": 21,
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "poi.park",
                                        "elementType": "geometry",
                                        "stylers": [
                                            {
                                                "color": "#dedede",
                                            },
                                            {
                                                "lightness": 21,
                                            },
                                        ],
                                    },
                                    {
                                        "elementType": "labels.text.stroke",
                                        "stylers": [
                                            {
                                                "visibility": "on",
                                            },
                                            {
                                                "color": "#ffffff",
                                            },
                                            {
                                                "lightness": 16,
                                            },
                                        ],
                                    },
                                    {
                                        "elementType": "labels.text.fill",
                                        "stylers": [
                                            {
                                                "saturation": 36,
                                            },
                                            {
                                                "color": "#333333",
                                            },
                                            {
                                                "lightness": 40,
                                            },
                                        ],
                                    },
                                    {
                                        "elementType": "labels.icon",
                                        "stylers": [
                                            {
                                                "visibility": "off",
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "transit",
                                        "elementType": "geometry",
                                        "stylers": [
                                            {
                                                "color": "#f2f2f2",
                                            },
                                            {
                                                "lightness": 19,
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "administrative",
                                        "elementType": "geometry.fill",
                                        "stylers": [
                                            {
                                                "color": "#fefefe",
                                            },
                                            {
                                                "lightness": 20,
                                            },
                                        ],
                                    },
                                    {
                                        "featureType": "administrative",
                                        "elementType": "geometry.stroke",
                                        "stylers": [
                                            {
                                                "color": "#fefefe",
                                            },
                                            {
                                                "lightness": 17,
                                            },
                                            {
                                                "weight": 1.2,
                                            },
                                        ],
                                    },
                                ],
                            });
                        google.maps.event.addDomListener(window, "resize", function () {
                            let center = map.getCenter();
                            google.maps.event.trigger(map, "resize");
                            map.setCenter(center);
                        });

                        let marker = new google.maps.Marker({
                            position: letLeng,
                            animation: google.maps.Animation.BOUNCE,
                            icon: dsnParam.map_marker_icon,
                            title: "ASL",
                            map: map,

                        });
                    });

                } catch (e) {
                    console.log(e);
                }
            }, 1000);


        }


        /**
         *
         * servicestab
         *
         */
        function services_tab($off, $el) {

            if ($off)
                $(".services-about .link-click").off("click");

            $el.find(".services-about").each(function () {
                let _taht = $(this);
                _taht.on("click", ".link-click", function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    _taht.find("#" + $(this).attr("id") + "-content").fadeIn(1000).siblings().hide();
                });
            });
        }


        function loadComonentElme() {


            wind.on("elementor/frontend/init", function () {
                if (typeof elementor !== "undefined") {

                    elementorFrontend.hooks.addAction("frontend/element_ready/global", function ($elemnt) {
                        let hdev = $elemnt.find('.hdev-element-wrap');
                        let next_el = hdev.next();
                        if (hdev.hasClass('has-animate-text')) {
                            next_el.attr('data-dsn-animate', 'section');
                            next_el.attr('data-dsn-triggerhook-section', dsnGrid.getData(hdev, 'triggerhook-section', 0.5));
                            if (hdev.hasClass('use-animate-section')) {
                                next_el.addClass('dsn-animate');
                            }
                        }


                        if (hdev.hasClass('have-dsn-animate-number')) {
                            next_el.addClass('have-dsn-animate-number');
                        }

                        if (hdev.hasClass('skills-personal')) {
                            next_el.addClass('skills-personal');
                        }
                        reloadElment(true, $elemnt);
                    });
                }
            });
        }


    }


)(jQuery);