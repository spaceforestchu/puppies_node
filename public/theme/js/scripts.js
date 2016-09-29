/* ========================================

Table of CONTENTS

01.	Page pre loader
02.	Slider
03.	Smooth scroll
04.	Back to top
05.	Navigation
06.	Header
07.	Transitional layer
08.	Modals
09.	Notices
10.	Accordion
11.	Draws
12.	Alerts
13.	Tabs
14.	Maps
15.	Lightbox
16.	Countdown
17.	Utility bar
18.	Hero units

======================================== */

var a = $(window),
	b = $(document),
	animSpeed = 300,
	header = $('.primary-header'),
	nav = $('nav'),
	mobNavToggleClass = '.mobile-nav-toggle',
	mobNavToggle = $('.mobile-nav-toggle'),
	heroUnit = $('.hero-unit'),
	desktopNav = $('desktop-nav'),
	ofHeroUnit = $('.offset-hero-unit__contents'),
	mobNavSubmenu = '.has-submenu',
	mobNavMegamenu = '.has-megamenu',
	transitionLayer = $('.transition-layer');

a.on('load', function() {
	'use strict';
	/* ========================================
	01. Page pre loader
	======================================== */

	$('.page-pre-loader').fadeOut('slow',function(){
		$(this).remove();
	});

	/* ========================================
	02. Slider
	======================================== */

	$(".ensemble-slideshow__first-slide").find(".ensemble-slideshow__caption").addClass("animated go");
		$(".ensemble-slideshow").on("cycle-before", function(b, c, d, a) {
  		$(a).find(".ensemble-slideshow__caption").removeClass("animated go");
	});
	$(".ensemble-slideshow").on("cycle-after", function(b, c, d, a) {
  		$(a).find(".ensemble-slideshow__caption").addClass("animated go");
	});
	$(".ensemble-slideshow").cycle();
});

b.ready(function() {
	'use strict';

	/* ========================================
	03. Smooth scroll
	======================================== */

	$('a').smoothScroll({
		speed: 800,
		offset: -100
	});

	/* ========================================
	04. Back to top
	======================================== */

	$(function() {
		$(".back-to-top").on('click', function() {
			$('body,html').animate({
				scrollTop: 0
			}, 1000);
			return false;
		});
	});

	$(".back-to-top--floating").hide();
	$(function() {
		a.on('scroll', function() {
			if($(a).scrollTop() > 100) {
				$(".back-to-top--floating").fadeIn(1500);
			} else {
				$(".back-to-top--floating").fadeOut(1500);
			}
		});

		$(".back-to-top--floating").on('click', function() {
			$('body,html').animate({
				scrollTop: 0
			}, 1000);
			return false;
		});
	});
});

/* ========================================
05. Navigation
======================================== */

function checkSize() {
	if (mobNavToggle.css('display') === 'none') {
		nav.addClass('desktop-nav');
			desktopNav.removeClass('mobile-nav');
	}

	if (mobNavToggle.css('display') === 'block') {
		nav.addClass('mobile-nav');
			nav.removeClass('desktop-nav');
	}
}
checkSize();

nav.on('click',mobNavSubmenu, function(e) {
	$(this).toggleClass('submenu-open');
	e.stopPropagation();
});

nav.on('click',mobNavMegamenu, function(e) {
	$(this).toggleClass('submenu-open');
	e.stopPropagation();
});

header.on('click',mobNavToggleClass, function() {
	nav.toggleClass('mobile-nav-slide-in');
});

header.on('click',mobNavToggleClass, function() {
	if ($(this).hasClass('mobile-nav-toggle__is-active')) {
		$(this).removeClass('mobile-nav-toggle__is-active');
	} else {
		$(this).addClass('mobile-nav-toggle__is-active');
	}
});
a.on('resize', checkSize);

/* ========================================
06. Header
======================================== */

a.on('scroll',header, function() {
	if ($(this).scrollTop() > 200 && (mobNavToggle.css('display') === 'none')) {
		$('.primary-header--fixed-nav').addClass('primary-header--resized');
	} else {
		$('.primary-header--fixed-nav').removeClass('primary-header--resized');
	}

	/* ========================================
	07. Transitional layer
	======================================== */

	if (a.scrollTop() < 300) {
		transitionLayer.addClass('transition-layer__closing');
	}

	if (a.scrollTop() > 400) {
		transitionLayer.addClass('transition-layer__visible transition-layer__opening');
		transitionLayer.removeClass('transition-layer__closing');
	}
});

/* ========================================
08. Modals
======================================== */

$('.modal').ensembleModal({
	delay: '8000',
	clickOverlayClosing: 'true'
});

/* ========================================
09. Notices
======================================== */

$('.notice').ensembleNotices({
	delay: '8000'
});

/* ========================================
10. Accordion
======================================== */

$('.accordion').ensembleAccordion({
	beginOpen: 'false'
});

/* ========================================
11. Draws
======================================== */

$('.draw').ensembleDraws();

/* ========================================
12. Alerts
======================================== */

$('.alert').on('click','.alert__close', function() {
	$(this).closest('.alert').fadeOut(animSpeed);
});

/* ========================================
13. Tabs
======================================== */

$('.tabs').ensembleTabs();

/* ========================================
14. Maps
======================================== */

if ($('.google-map').length) {
	var map;
	map = new GMaps({
		div: '.google-map',
		lat: 51.523004,
		lng: -0.127010,
		scrollwheel: false,
		height: 400
	});
	map.drawOverlay({
		lat: map.getCenter().lat(),
		lng: map.getCenter().lng(),
		content: '<div></div>',
		verticalAlign: 'top',
		horizontalAlign: 'center'
	});
	map.addMarker({
		lat: 51.523004,
		lng: -0.127010,
		icon: "img/general/map-marker.png",
		title: 'Vidal Themes',
		infoWindow: {
			content: 'We are located here'
		}
	});

	var styles = [{
		stylers: [{
			hue: "#1a2a8f"
		}, {
			saturation: 10
		}, {
			lightness: '50'
		}, {
			invert_lightness: false
		}, {
			gamma: '1.5'
		}]
	}, {
		featureType: "road",
		elementType: "geometry",
		stylers: [{
			lightness: 100
		}, {
			visibility: "simplified"
		}]
	}, {
		featureType: "road",
		elementType: "labels",
		stylers: [{
			visibility: "on"
		}]
	}];
	map.setOptions({
		styles: styles
	});
}

/* ========================================
15. Lightbox
======================================== */

$('a[data-lightbox="lightbox"]').ensembleLightbox({
	activity: true,
	button: true,
	caption: true,
	overlay: true,
	quitOnImgClick: true,
	selector: 'a[data-lightbox="lightbox"]'
});

$('a[data-lightbox="gallery"]').ensembleLightbox({
	activity: true,
	button: true,
	caption: true,
	navigation: false,
	overlay: true,
	arrows: true,
	selector: 'a[data-lightbox="gallery"]'
});

/* ========================================
16. Countdown
======================================== */

$(function() {
	var launchDay = new Date();
	launchDay = new Date(2016, 12 - 1, 25);
	$('#countdown').countdown({
		until: launchDay
	});
	$('#year').text(launchDay.getFullYear());
});

/* ========================================
17. Utility bar
======================================== */

header.on('click','.utility-bar-toggle', function() {
	$('.utility-bar').toggleClass('submenu-open');
});

header.on('click','.utility-bar-toggle', function() {
	$('.utility-bar-toggle i').toggleClass('utility-bar-toggle__active');
});

/* ========================================
18. Hero units
======================================== */

a.on('resize', function() {
	var windowHeight = a.height();
	heroUnit.css('height', windowHeight);

	var heroImageHeight = $('.offset-hero-unit__images').height();
	var content = $('.offset-hero-unit__content');
	if (heroImageHeight > 0) {
		ofHeroUnit.css('height', heroImageHeight);
	} else {
		content.css('transform', 'translateY(0)');
	}
});
a.trigger('resize');
