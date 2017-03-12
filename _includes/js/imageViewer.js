'use strict';

class ImageViewer {
	constructor(views, lightbox, lightboxContainer, options) {
		this.imageViews = Array.from(views);
		this.lightbox = lightbox;
		this.lightboxContainer = lightboxContainer;
		this.visibleClass = options.visibleClass;
		if (options.closeButton) {
			this.closeButton = options.closeButton;
		}

		this.onClick = this.onClick.bind(this);
		this.hide = this.hide.bind(this);
		this.blockClicks = this.blockClicks.bind(this);
		this.update = this.update.bind(this);
		this.appear = this.appear.bind(this);

		this.currIdx = -1;
		this.lightboxImg = this.lightbox.getElementsByTagName('img')[0];
		this.lightboxP = this.lightbox.getElementsByTagName('p')[0];

		this.addEventListeners();
	}

	addEventListeners () {
		document.addEventListener('click', this.onClick);
		this.lightboxContainer.addEventListener('click', this.hide);
		this.lightbox.addEventListener('click', this.blockClicks);
		if (this.closeButton) this.closeButton.addEventListener('click', this.hide);
	}

	blockClicks (evt) {
		evt.stopPropagation();
	}

	hide () {
		this.lightboxContainer.classList.remove(this.visibleClass);
	}

	onClick (evt) {
		if (!this.imageViews.includes(evt.target.parentNode)) return;

		this.currIdx = this.imageViews.indexOf(evt.target.parentNode);
		this.update();
		this.appear();
	}

	appear () {
		if (!this.lightboxContainer.classList.contains(this.visibleClass)) {
			this.lightboxContainer.classList.add(this.visibleClass);
		}
	}

	update () {
		const currView = this.imageViews[this.currIdx];
		this.lightboxImg.src = currView.querySelector('img').src;
		const aside = currView.querySelector('aside');
		if (aside && aside.length !== 0)
			this.lightboxP.textContent = aside[0].textContent;
	}
}
