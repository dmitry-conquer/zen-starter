/**
 * BackTopButton
 *
 * Creates a dynamic "back to top" button that appears when scrolling down the page.
 * Provides smooth scrolling to a target element with optimized performance using requestAnimationFrame.
 *
 * Usage:
 *   new BackTopButton(900, "home");
 *   // or with defaults
 *   new BackTopButton();
 *
 * - Appears when scroll position exceeds the specified offset (default: 900px)
 * - Smoothly scrolls to target element when clicked
 * - Uses requestAnimationFrame for performance optimization
 * - Includes proper ARIA attributes for accessibility
 * - Automatically creates and appends button to document
 */

export default class BackTopButton {
  /** Root button element */
  private rootElement: HTMLElement | null;
  /** CSS classes for state management */
  private readonly states: Record<string, string> = {
    isVisible: "is-visible",
  };
  /** Scroll offset in pixels when button becomes visible */
  private scrollOffset: number = 900;
  /** Target element ID to scroll to */
  private targetID: string = "home";
  /** Flag to prevent multiple requestAnimationFrame calls */
  private isTicking: boolean = false;

  // Initializes back to top button with optional scroll offset and target ID
  constructor(scrollOffset?: number, targetID?: string) {
    this.scrollOffset = scrollOffset || this.scrollOffset;
    this.targetID = targetID || this.targetID;
    this.rootElement = this.createElement();
    if (!this.rootElement) return;
    this.bindEvents();
  }

  // Creates and appends the button element to the document
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

  // Toggles button visibility based on scroll position and updates ARIA attributes
  private toggleVisibility = () => {
    if (!this.rootElement) return;
    const isVisible = window.scrollY > this.scrollOffset;
    this.rootElement.setAttribute("aria-hidden", `${!isVisible}`);
    this.rootElement.classList.toggle(this.states.isVisible, isVisible);
    this.isTicking = false;
  };

  // Throttles scroll events using requestAnimationFrame for performance
  private onScroll = () => {
    if (!this.isTicking) {
      this.isTicking = true;
      requestAnimationFrame(this.toggleVisibility);
    }
  };

  // Binds scroll event listener with passive option for better performance
  private bindEvents(): void {
    window.addEventListener("scroll", this.onScroll, { passive: true });
  }
}
