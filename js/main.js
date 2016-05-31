---
---
{% include js/navbar.js %}

'use strict';
const navbar = document.querySelector('.js-navbar');
const NavOptions = {
	'animationClass': 'nav-bar--animatable',
	'hiddenClass': 'nav-bar--hidden'
};

window.addEventListener('load', function() {
		 new Navbar(navbar, NavOptions);
});
