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
		if (options.leftButton) {
			this.leftButton = options.leftButton;
		}
		if (options.rightButton) {
			this.rightButton = options.rightButton;
		}

		this.onClick = this.onClick.bind(this);
		this.hide = this.hide.bind(this);
		this.blockClicks = this.blockClicks.bind(this);
		this.update = this.update.bind(this);
		this.appear = this.appear.bind(this);
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);

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
		if (this.leftButton) this.leftButton.addEventListener('click', this.prev);
		if (this.rightButton) this.rightButton.addEventListener('click', this.next);
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
		this.lightboxImg.src = currView.querySelector('img').dataset.img;
		const aside = currView.querySelector('p');
		if (aside && aside.length !== 0) this.lightboxP.textContent = aside.textContent;

		if (this.currIdx === 0) 
			this.leftButton.classList.add('hide');
		else if (this.leftButton.classList.contains('hide'))
			this.leftButton.classList.remove('hide');
		if (this.currIdx === this.imageViews.length - 1)
			this.rightButton.classList.add('hide');
		else if (this.rightButton.classList.contains('hide'))
			this.rightButton.classList.remove('hide');
		
	}

	prev () {
		if (this.currIdx === 0) return;
		
		this.currIdx -= 1;
		this.update();
	}

	next () {
		if (this.currIdx === this.imageViews.length - 1) return;

		this.currIdx += 1;
		this.update();
	}
}
