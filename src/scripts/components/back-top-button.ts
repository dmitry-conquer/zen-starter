export default class BackTopButton {
  private readonly selectors: Record<string, string> = {
    root: "[data-js-to-top-button]",
  };
  private readonly states: Record<string, string> = {
    isVisible: "is-visible",
  };
  private rootElement: HTMLElement | null;
  private scrollOffset = 900;
  private isTicking = false;

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
  }

  public init() {
    if (!this.rootElement) return;
    this.bindEvents();
  }

  private toggleVisibility = () => {
    if (!this.rootElement) return;
    this.rootElement.classList.toggle(this.states.isVisible, window.scrollY > this.scrollOffset);
    this.isTicking = false;
  };

  private onScroll = () => {
    if (!this.isTicking) {
      this.isTicking = true;
      requestAnimationFrame(this.toggleVisibility);
    }
  };

  private bindEvents() {
    window.addEventListener("scroll", this.onScroll);
  }
}