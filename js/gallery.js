---
---
{% include js/imageViewer.js %}

const images = document.querySelectorAll('.js-image-view');
const lightbox = document.querySelector('.js-lightbox');
const lightboxContainer = document.querySelector('.js-lightbox-container');
const ImgOptions = {
	'visibleClass': 'lightbox-container--visible',
	'closeButton': document.querySelector('.js-lightbox-close'),
	'leftButton': document.querySelector('.js-lightbox-left'),
	'rightButton': document.querySelector('.js-lightbox-right')
}

const onTransitionEnd = (item) => {
	return (evt) => {
		evt.target.style.position = 'relative';
		item.remove();
		evt.target.style.willChange = '';
		evt.target.style.top = '';
		evt.target.style.left = '';
		evt.target.removeEventListener('transitionend', onTransitionEnd(item));
	};
};

window.addEventListener('load', function () {
	new ImageViewer(images, lightbox, lightboxContainer, ImgOptions);

	const imageTags = Array.from(document.querySelectorAll('.js-lazy-load'));
	imageTags.forEach((item) => {
		const image = new Image();
		image.src = item.dataset.img;
		image.classList.add('image-view__img');
		image.style.position = 'absolute';
		image.style.top = '0px';
		image.style.left = '0px';
		image.style.willChange = 'opacity';
		image.dataset.img = item.dataset.img;
		image.addEventListener('transitionend', onTransitionEnd(item));
		image.onload = (() => {
			item.insertAdjacentElement('afterend', image);
			requestAnimationFrame(() => {
				image.classList.add('lazy-loaded');
			});
		});
	});
});
