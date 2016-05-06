---
---
{% include js/navbar.js %}

'use strict';
const navbar = document.querySelector('.js-navbar');
const options = {
	'animationClass': 'nav-bar--animatable',
	'hiddenClass': 'nav-bar--hidden'
};

window.addEventListener('load', () => new Navbar(navbar, options));
