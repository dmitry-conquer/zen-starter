export default class BackTopButton {
  private rootElement: HTMLElement | null;
  private readonly states: Record<string, string> = {
    isVisible: "is-visible",
  };
  private scrollOffset: number = 900;
  private targetID: string = "home";
  private isTicking: boolean = false;

  constructor(scrollOffset?: number, targetID?: string) {
    this.scrollOffset = scrollOffset || this.scrollOffset;
    this.targetID = targetID || this.targetID;
    this.rootElement = this.createElement();
    if (!this.rootElement) return;
    this.bindEvents();
  }

  private createElement(): HTMLAnchorElement {
    const element = document.createElement("a");
    element.classList.add("back-top-button");
    element.setAttribute("href", `#${this.targetID}`);
    element.setAttribute("aria-label", "Back to top");
    element.setAttribute("aria-hidden", "true");
    element.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>`;
    document.documentElement.appendChild(element);
    return element;
  }

  private toggleVisibility = () => {
    if (!this.rootElement) return;
    const isVisible = window.scrollY > this.scrollOffset;
    this.rootElement.setAttribute("aria-hidden", `${!isVisible}`);
    this.rootElement.classList.toggle(this.states.isVisible, isVisible);
    this.isTicking = false;
  };

  private onScroll = () => {
    if (!this.isTicking) {
      this.isTicking = true;
      requestAnimationFrame(this.toggleVisibility);
    }
  };

  private bindEvents(): void {
    window.addEventListener("scroll", this.onScroll, { passive: true });
  }
}
