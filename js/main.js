/*  ---------------------------------------------------
  Template Name: DJoz / Portfolio
  Author: Monishka Senadira Portfolio
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader Safe Dismiss
    --------------------*/
    function hidePreloader() {
        $(".loader").fadeOut();
        $("#preloder").delay(100).fadeOut("fast");
    }

    $(window).on('load', hidePreloader);
    // Fallback timer so preloader never hangs if external assets are delayed
    setTimeout(hidePreloader, 1500);

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        if (bg) {
            $(this).css('background-image', 'url(' + bg + ')');
        }
    });

    /*------------------
        Mobile Navigation (SlickNav)
    --------------------*/
    if ($('.mobile-menu').length) {
        $(".mobile-menu").slicknav({
            prependTo: '#mobile-menu-wrap',
            allowParentLinks: true
        });
    }

    /*------------------
        Smooth Navigation & Anchor Scrolling
    --------------------*/
    function getHeaderOffset() {
        var $header = $('.header');
        return $header.length ? $header.outerHeight() : 80;
    }

    function scrollToSection(targetId) {
        if (!targetId) return;
        var cleanId = targetId.replace(/^#/, '');
        var targetElem = document.getElementById(cleanId);
        if (!targetElem) return;

        var headerOffset = getHeaderOffset();
        var targetTop = targetElem.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth'
        });

        // Update active class in navigation
        updateNavActive(cleanId);

        // Auto close SlickNav mobile menu if open
        if ($('.mobile-menu').length && $.fn.slicknav) {
            try {
                $('.mobile-menu').slicknav('close');
            } catch (err) {}
        }
    }

    function updateNavActive(currentId) {
        $('.header__menu ul li, .slicknav_nav li').removeClass('active');
        $('.header__menu ul li a, .slicknav_nav li a').each(function () {
            var href = $(this).attr('href') || '';
            if (href === '#' + currentId || href.endsWith('#' + currentId)) {
                $(this).closest('li').addClass('active');
            }
        });
    }

    // Intercept clicks on links pointing to #anchors
    $(document).on('click', 'a[href*="#"]', function (e) {
        var href = $(this).attr('href');
        if (!href || href === '#' || href === '#!' || href.startsWith('#customLightbox')) return;

        var hashIndex = href.indexOf('#');
        if (hashIndex === -1) return;

        var path = href.substring(0, hashIndex);
        var targetId = href.substring(hashIndex + 1);
        if (!targetId) return;

        var currentPath = window.location.pathname.split('/').pop() || 'index.html';
        var linkPath = path.split('/').pop();

        // If the link is on the current page or path is empty or both point to index.html
        var isCurrentPage = (!linkPath || linkPath === currentPath ||
            ((currentPath === '' || currentPath === 'index.html') && (linkPath === '' || linkPath === 'index.html')));

        if (isCurrentPage) {
            var targetElem = document.getElementById(targetId);
            if (targetElem) {
                e.preventDefault();
                scrollToSection(targetId);
                if (history.pushState) {
                    history.pushState(null, null, '#' + targetId);
                }
            }
        }
    });

    // Handle hash on initial page load (e.g., index.html#aboutme)
    if (window.location.hash) {
        var initialHash = window.location.hash.substring(1);
        setTimeout(function () {
            scrollToSection(initialHash);
        }, 300);
    }

    // ScrollSpy: highlight active menu item on scroll
    var scrollSpyThrottle;
    $(window).on('scroll', function () {
        if (scrollSpyThrottle) return;
        scrollSpyThrottle = setTimeout(function () {
            scrollSpyThrottle = null;
            var scrollPos = $(window).scrollTop() + getHeaderOffset() + 30;
            var sections = ['projects', 'lecture-slides', 'blood-donation', 'aboutme', 'home'];
            for (var i = 0; i < sections.length; i++) {
                var el = document.getElementById(sections[i]);
                if (el && el.offsetTop <= scrollPos) {
                    updateNavActive(sections[i]);
                    break;
                }
            }
        }, 80);
    });

    /*------------------
        Magnific Popup for Videos
    --------------------*/
    if ($.fn.magnificPopup) {
        $('.video-popup').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    /*------------------
        Barfiller Progress Bars
    --------------------*/
    if ($.fn.barfiller) {
        if ($('#bar1').length) $('#bar1').barfiller({ barColor: "#00e5ff" });
        if ($('#bar2').length) $('#bar2').barfiller({ barColor: "#f3214b" });
        if ($('#bar3').length) $('#bar3').barfiller({ barColor: "#5c00ce" });
    }

})(jQuery);
