/**
 * Accordion component for accessible single-panel expansion with smooth height animation.
 * Handles ARIA state, focusability, and inert on hidden panels.
 *
 * Features:
 * - Proper ARIA attributes for accessibility
 * - Reactive state management using Set
 * - Automatic focus management
 * - Supports multiple accordions instances on the same page
 * - Toggles tabindex and max-height to control focus and animation
 */

class Accordion {
  private readonly selectors: Record<string, string> = {
    root: "[data-js-accordion]",
    button: "[data-js-accordion-button]",
    content: "[data-js-accordion-content]",
  };

  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
  };

  private readonly stateAttributes: Record<string, string> = {
    ariaExpanded: "aria-expanded",
    tabIndex: "tabindex",
    inert: "inert",
  };

  private rootElement: HTMLElement;
  private buttonElements: NodeListOf<HTMLElement>;
  private contentElements: NodeListOf<HTMLElement>;
  private _activeIndex: number;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button) as NodeListOf<HTMLElement>;
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content) as NodeListOf<HTMLElement>;

    this._activeIndex = this.getInitialActiveIndex() >= 0 ? this.getInitialActiveIndex() : -1;

    if (this.isReady()) {
      this.init();
    } else {
      console.warn("Accordion: Required elements not found");
    }
  }

  private isReady(): boolean {
    return !!this.rootElement && this.buttonElements.length > 0 && this.contentElements.length > 0;
  }

  private getInitialActiveIndex(): number {
    return Array.from(this.buttonElements).findIndex(button => button.classList.contains(this.stateClasses.isActive));
  }

  set activeIndex(index: number) {
    this._activeIndex = index;
    this.updateUI();
  }

  private init(): void {
    this.bindEvents();
    this.activeIndex = this._activeIndex;
  }

  private bindEvents(): void {
    this.buttonElements.forEach((button, index) => {
      button.addEventListener("click", () => this.handleButtonClick(index));
    });
  }

  private handleButtonClick(index: number): void {
    if (this._activeIndex === index) {
      this.activeIndex = -1;
    } else {
      this.activeIndex = index;
    }
  }

  private updateUI(): void {
    this.buttonElements.forEach((button, index) => {
      const isActive = this._activeIndex === index;
      const content = this.contentElements[index];

      this.updateButtonState(button, isActive);
      this.updateContentState(content, isActive);
    });
  }

  private updateButtonState(button: HTMLElement, isActive: boolean): void {
    button.classList.toggle(this.stateClasses.isActive, isActive);
    button.setAttribute(this.stateAttributes.ariaExpanded, isActive.toString());
  }

  private updateContentState(content: HTMLElement, isActive: boolean): void {
    content.toggleAttribute(this.stateAttributes.inert, !isActive);
    content.style.maxHeight = isActive ? `${content.scrollHeight}px` : "";
  }
}

/**
 * Accordion Collection
 *
 * Automatically initializes all accordion components on the page.
 *
 * Usage:
 *   new AccordionCollection();
 */
class AccordionCollection {
  constructor() {
    this.init();
  }

  // Initializes all accordion components
  private init(): void {
    const accordionElements = document.querySelectorAll("[data-js-accordion]");

    accordionElements.forEach(element => {
      new Accordion(element as HTMLElement);
    });
  }
}

export default AccordionCollection;
