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
window.addEventListener('load', function () {
	new ImageViewer(images, lightbox, lightboxContainer, ImgOptions);
});
