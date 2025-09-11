/**
 * Accordion Component
 *
 * Creates interactive accordion components with smooth animations and
 * accessibility features. Supports single-item expansion with automatic
 * state management and ARIA attributes.
 *
 * Usage:
 *   <div data-js-accordion>
 *     <button data-js-accordion-button class="is-active">Section 1</button>
 *     <div data-js-accordion-content>Content 1</div>
 *     <button data-js-accordion-button>Section 2</button>
 *     <div data-js-accordion-content>Content 2</div>
 *   </div>
 *   new AccordionCollection();
 */

type TypeAccordionSelectors = {
  root: string;
  button: string;
  content: string;
};

type TypeAccordionStateClasses = {
  isActive: string;
};

type TypeAccordionStateAttributes = {
  ariaExpanded: string;
};

type TypeAccordionState = {
  activeAccordionIndex: number;
};

/**
 * Main Accordion class
 */
class Accordion {
  // CSS selectors for accordion elements
  private readonly selectors: TypeAccordionSelectors = {
    root: "[data-js-accordion]",
    button: "[data-js-accordion-button]",
    content: "[data-js-accordion-content]",
  };

  // CSS classes for state management
  private readonly stateClasses: TypeAccordionStateClasses = {
    isActive: "is-active",
  };

  // ARIA attributes for accessibility
  private readonly stateAttributes: TypeAccordionStateAttributes = {
    ariaExpanded: "aria-expanded",
  };

  private rootElement: HTMLElement;
  private buttonElements: NodeListOf<HTMLElement>;
  private contentElements: HTMLElement[];
  private state: TypeAccordionState;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button) as NodeListOf<HTMLElement>;
    this.contentElements = this.getContentElements();

    // Initialize state with proxy for automatic UI updates
    this.state = this.createProxyState({
      activeAccordionIndex: this.getInitialActiveIndex() || -1,
    });

    if (this.isReady()) {
      this.initialize();
    } else {
      console.warn("Accordion: Required elements not found");
    }
  }

  // Checks if accordion is ready to work
  private isReady(): boolean {
    return !!this.rootElement && this.buttonElements.length > 0 && this.contentElements.length > 0;
  }

  // Gets content elements based on buttons
  private getContentElements(): HTMLElement[] {
    return Array.from(this.buttonElements).map(button => button.nextElementSibling as HTMLElement);
  }

  // Gets initial active index
  private getInitialActiveIndex(): number {
    return Array.from(this.buttonElements).findIndex(button => button.classList.contains(this.stateClasses.isActive));
  }

  // Creates reactive state object using Proxy for automatic UI updates
  private createProxyState(state: TypeAccordionState): TypeAccordionState {
    return new Proxy(state, {
      get: (target: TypeAccordionState, prop: keyof TypeAccordionState) => {
        return target[prop];
      },
      set: (target: TypeAccordionState, prop: keyof TypeAccordionState, value: number) => {
        target[prop] = value;
        this.updateUI();
        return true;
      },
    });
  }

  // Initializes accordion
  private initialize(): void {
    this.bindEvents();
    this.updateUI();
  }

  // Binds events to buttons
  private bindEvents(): void {
    this.buttonElements.forEach((button, index) => {
      button.addEventListener("click", () => this.handleButtonClick(index));
    });
  }

  // Handles button click
  private handleButtonClick(index: number): void {
    if (this.state.activeAccordionIndex === index) {
      this.state.activeAccordionIndex = -1;
    } else {
      this.state.activeAccordionIndex = index;
    }
  }

  // Updates UI based on current state
  private updateUI(): void {
    this.buttonElements.forEach((button, index) => {
      const isActive = this.state.activeAccordionIndex === index;
      const content = this.contentElements[index];

      this.updateButtonState(button, isActive);
      this.updateContentState(content, isActive);
    });
  }

  // Updates button state
  private updateButtonState(button: HTMLElement, isActive: boolean): void {
    button.classList.toggle(this.stateClasses.isActive, isActive);
    button.setAttribute(this.stateAttributes.ariaExpanded, isActive.toString());
  }

  // Updates content block state
  private updateContentState(content: HTMLElement, isActive: boolean): void {
    if (isActive) {
      content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
      content.style.maxHeight = "";
    }
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
    this.initializeAll();
  }

  // Initializes all accordion components
  private initializeAll(): void {
    const accordionElements = document.querySelectorAll("[data-js-accordion]");

    accordionElements.forEach(element => {
      new Accordion(element as HTMLElement);
    });
  }
}

export default AccordionCollection;
