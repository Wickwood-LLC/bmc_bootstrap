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
            var $contact;
            var $menu;
            var topSpacing;

            $contact = $('.pane-contact-info');
            $menu = $('.pane-system-main-menu');

            $(document).ready(sticky);
            $(window).on("resize mresize", sticky);

            function sticky() {
                topSpacing = $('#admin-menu').outerHeight();
                menuHeight = $menu.outerHeight(); // gets the height of our menu
                stickyTop = $contact.offset().top; // tells how far our target element is from the top of the page
                windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page
                currentPosition = stickyTop + menuHeight - windowTop - topSpacing; // tells how far our target element is from where our screen is currently

                if ($('sticky-header')) {
                    $menu.removeClass('sticky-header');
                }

                if (window.matchMedia("(max-width: 480px)").matches) {
                    $menu.addClass('sticky-menu');
                } else {
                    $menu.removeClass('sticky-menu');
                }

                if ($('#admin-menu').length) {
                    if ($('#navbar-administration').css('display') !== 'none') { // if navbar administration menu is being used
                        topSpacing = 0;
                        currentPosition = stickyTop - windowTop;
                        $('body').css({
                            'padding-top': '',
                        });
                    } else {
                        topSpacing = $('#admin-menu').outerHeight();
                        currentPosition = stickyTop - windowTop - topSpacing; // tells how far our target element is from where our screen is currently
                        $('body').css({
                            'padding-top': topSpacing - parseInt($('body').css("margin-top")),
                        });
                    }
                }
                //console.log("Top spacing is " + topSpacing);
            }

            $(window).scroll(function() { // scroll event
                if (window.matchMedia("(min-width: 481px)").matches) {
                    windowTop = $(window).scrollTop(); // tells how far our screen is currently from the top of the page
                    currentPosition = stickyTop + menuHeight - windowTop - topSpacing; // tells how far our target element is from where our screen is currently

                    if (currentPosition < 0) {
                        $menu.addClass('sticky-menu');
                    	$menu.css({
                    		'top': topSpacing,
                    	});
                    } else {
                        $menu.removeClass('sticky-menu');
                        $menu.css({
                        	'top': '',
                        });
                    }
                }
                // console.log('Distance from top of page: ' + stickyTop);
                // console.log('Current position: ' + currentPosition);
            });

            if ($menu.hasClass('sticky-menu')) { // if sticky menu is activated, move the contact pane into the pull out tab
                $menu.append('.pane-contact-info').css({
                    'top': topSpacing,
                });

            }
        }
    };
}(jQuery));