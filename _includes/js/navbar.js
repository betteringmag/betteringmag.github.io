'use strict';
class Navbar {
  constructor(element, options) {
    this.navbar = element;
    this.animationClass = options.animationClass;
    this.hiddenClass = options.hiddenClass;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.requestTick = this.requestTick.bind(this);
    this.update = this.update.bind(this);

    this.isTicking = false;
    this.lastKnownScrollY = 0;

    window.addEventListener('scroll', this.requestTick);
  }

  requestTick() {
    if (!this.isTicking) {
      this.isTicking = true;
      requestAnimationFrame(this.update);
    }
  }

  show() {
    this.navbar.classList.add(this.animationClass);
    this.navbar.classList.remove(this.hiddenClass);
    this.navbar.addEventListener('transitionend', this.onTransitionEnd);
  }

  hide() {
    this.navbar.classList.add(this.animationClass);
    this.navbar.classList.add(this.hiddenClass);
    this.navbar.addEventListener('transitionend', this.onTransitionEnd);
  }

  onTransitionEnd() {
    this.navbar.classList.remove(this.animationClass);
    this.isTicking = false;
    this.navbar.removeEventListener('transitionend', this.onTransitionEnd);
  }

  update() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastKnownScrollY && !this.navbar.classList.contains(this.hiddenClass)) {
      this.hide();
    } else if (st < this.lastKnownScrollY && this.navbar.classList.contains(this.hiddenClass)) {
      this.show();
    } else {
      this.isTicking = false;
    }
    this.lastKnownScrollY = st;
  }

}
