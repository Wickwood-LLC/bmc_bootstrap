(function($) {
    /**
     * Sticky header
     */
    Drupal.behaviors.stickyHeader = {
        attach: function(context, settings) {
            var stickyTop;
            var menuWidth;
            var menuHeight;
            var headerHeight;
            var windowTop;
            var currentPosition;
            var $header;
            var $menu;
            var topSpacing;
            var windowWidth;

            $header = $('.pane-contact-info');
            $menu = $('.pane-system-main-menu');

            $(document).ready(widthCheck);
            $(window).on("resize mresize", widthCheck);

            function widthCheck() { // Check screen size, then run the sticky script
                if (window.matchMedia("(max-width: 767px)").matches) {
                	$menu.removeClass('sticky-menu-full');
                    sticky();
                } else if (window.matchMedia("(min-width: 768px)").matches) {
                    $('#header').css("margin-top", "");
                    $header.removeClass('sticky-header');
                    stickyDesktop();
                }

                // console.log("Screen size is " + windowWidth);
                // console.log('Distance from top of page: ' + stickyTop);
                // console.log('Position on load ' + currentPosition);
            }

            function sticky() {
            	windowWidth = $(window).width();
                topSpacing = $('#admin-menu').outerHeight();
                headerHeight = $header.outerHeight(); // gets the height of our header
                menuHeight = $menu.outerHeight(); // gets the height of our menu
                stickyTop = $header.offset().top; // tells how far our target element is from the top of the page
                windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page
                currentPosition = stickyTop - windowTop - topSpacing + headerHeight; // tells how far our target element is from where our screen is currently

                if ($('sticky-header')) {
                    $menu.removeClass('sticky-header');
                }
                if ($('sticky-menu-full')) {
                    $menu.removeClass('sticky-menu-full');
                }

                if (currentPosition < 0) { // if target element goes above the screen
                    $header.addClass('sticky-header');
                    $('#header .container-12:not(:first-child)').css({
                        'margin-top': headerHeight,
                    });
                    $header.css({
                        top: '0',
                    });
                } else {
                    $header.removeClass('sticky-header');
                    $('#header .container-12:not(:first-child)').css({
                        'margin-top': '',
                    });
                    $header.css({
                        top: '',
                    });
                }

                if ($('#admin-menu').length) {
                    if ($('#navbar-administration').css('display') !== 'none') { // if navbar administration menu is being used
                        topSpacing = 0;
                        currentPosition = stickyTop - windowTop + headerHeight;
                        $('body').css({
                            'padding-top': '',
                        });
                    } else {
                        topSpacing = $('#admin-menu').outerHeight();
                        currentPosition = stickyTop - windowTop - topSpacing + headerHeight; // tells how far our target element is from where our screen is currently
                        $('body').css({
                            'padding-top': topSpacing - parseInt($('body').css("margin-top")),
                        });
                    }

                    if (currentPosition < 0) { // if target element goes above the screen
                        $header.css({
                            top: topSpacing,
                        });
                    } else {
                        $header.css({
                            top: '',
                        });
                    }
                }
                //console.log("Top spacing is " + topSpacing);
            }

            function stickyDesktop() {
            	windowWidth = $(window).width();
                topSpacing = $('#admin-menu').outerHeight();
                menuHeight = $menu.outerHeight(); // gets the height of our header
                stickyTop = $menu.offset().top; // tells how far our target element is from the top of the page
                windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page

                currentPosition = stickyTop - windowTop - topSpacing + menuHeight; // tells how far our target element is from where our screen is currently

                if ($('sticky-menu-full')) {
                    $menu.removeClass('sticky-menu-full');
                }
                if ($('sticky-header')) {
                    $menu.removeClass('sticky-header');
                }

                if (currentPosition < 0) {
                    $menu.addClass('sticky-menu-full');
                    if ($('#admin-menu').length) {
                    	$menu.css({
                    		'top': topSpacing,
                    	});
                    } else {
                    	$menu.css({
                    		'top': 0,
                    	})
                    }

                    $('.region-menu').css({
                        'height': menuHeight,
                    });
                } else {
                    $menu.removeClass('sticky-menu-full');
                    $menu.css({
                    	'top': '',
                    });
                    $('.region-menu').css({
                        'height': '',
                    });
                }
            }

            $(window).scroll(function() { // scroll event
                if (window.matchMedia("(max-width: 717px)").matches) {
                    windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page
                    currentPosition = stickyTop - windowTop + headerHeight; // tells how far our target element is from where our screen is currently
                    if ($('#admin-menu').length) {
                        currentPosition = stickyTop - windowTop - topSpacing + headerHeight; // tells how far our target element is from where our screen is currently
                    }

                    if (currentPosition < 0) { // if target element goes above the screen
                        $header.addClass('sticky-header');
                        $('#header .container-12:not(:first-child)').css({
                            'margin-top': headerHeight,
                        });

                        if ($('#admin-menu').length) {
                            $header.css({
                                top: topSpacing,
                            });
                        }
                    } else if (currentPosition >= 0) {
                        $header.removeClass('sticky-header');
                        $('#header .container-12:not(:first-child)').css({
                            'margin-top': '',
                        });

                        if ($('#admin-menu').length) {
                            $header.css({
                                top: '',
                            });
                        }
                    }
                    //console.log("Top spacing is " + topSpacing);
                } else if (window.matchMedia("(min-width: 718px)").matches) {
                    windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page
                    currentPosition = stickyTop - windowTop - topSpacing + menuHeight; // tells how far our target element is from where our screen is currently

                    if (currentPosition < 0) {
                        $menu.addClass('sticky-menu-full');
                        if ($('#admin-menu').length) {
                        	$menu.css({
                        		'top': topSpacing,
                        	})
                        } else {
                        	$menu.css({
                        		'top': 0,
                        	});
                        }
                        $('.region-menu').css({
                            'height': menuHeight,
                        });
                    } else {
                        $menu.removeClass('sticky-menu-full');
                        $menu.css({
                        	'top': '',
                        });
                        $('.region-menu').css({
                            'height': '',
                        });
                    }
                }

                // console.log('Distance from top of page: ' + stickyTop);
                // console.log('Current position: ' + currentPosition);
            });
        }
    };
}(jQuery));