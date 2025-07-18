/**
 * Accordion
 *
 * Creates interactive accordion components with smooth animations and accessibility features.
 * Supports single-item expansion with automatic state management and ARIA attributes.
 *
 * Usage:
 *   <div data-js-accordion>
 *     <button data-js-accordion-button class="is-active">Section 1</button>
 *     <div data-js-accordion-content>Content 1</div>
 *     <button data-js-accordion-button>Section 2</button>
 *     <div data-js-accordion-content>Content 2</div>
 *   </div>
 *   new AccordionCollection();
 *
 * - Automatically handles click events and state management
 * - Provides smooth height animations using maxHeight
 * - Sets proper ARIA attributes for accessibility
 * - Supports only one active section at a time
 */

const rootSelector = "[data-js-accordion]";

class Accordion {
  /** CSS selectors for accordion elements */
  private readonly selectors: Record<string, string> = {
    root: rootSelector,
    button: "[data-js-accordion-button]",
    content: "[data-js-accordion-content]",
  };
  /** CSS classes for state management */
  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
  };
  /** ARIA attributes for accessibility */
  private readonly stateAttributes: Record<string, string> = {
    ariaExpanded: "aria-expanded",
  };
  /** Root accordion container element */
  private rootElement: HTMLElement;
  /** Collection of accordion button elements */
  private buttonElements: NodeListOf<HTMLElement>;
  /** Reactive state object with proxy for automatic UI updates */
  private state: TypeAccordioState;

  // Initializes accordion: sets up elements, state, and event listeners
  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.state = this.getProxyState({
      activeAccordionIndex: [...this.buttonElements].findIndex(buttonElement =>
        buttonElement.classList.contains(this.stateClasses.isActive)
      ),
    });

    this.init();
  }

  // Initializes the accordion if all required elements are present
  private init(): void {
    if (!this.isReady()) return;
    this.bindEvents();
  }

  // Checks if the accordion has all required elements to function properly
  private isReady(): boolean {
    return !!this.rootElement && !!this.buttonElements.length;
  }

  // Binds click event listeners to all accordion buttons
  private bindEvents(): void {
    this.buttonElements.forEach((buttonElement, index: number) => {
      buttonElement?.addEventListener("click", () => this.onButtonClick(index));
    });
  }

  // Creates a reactive state object using Proxy for automatic UI updates
  private getProxyState(state: TypeAccordioState) {
    return new Proxy(state, {
      get: (target: TypeAccordioState, prop: keyof TypeAccordioState) => {
        return target[prop];
      },
      set: (target: TypeAccordioState, prop: keyof TypeAccordioState, value: number) => {
        target[prop] = value;
        this.updateUI();

        return true;
      },
    });
  }

  // Updates the UI based on current state: toggles classes, sets ARIA attributes, and animates content height
  private updateUI() {
    const { activeAccordionIndex } = this.state;
    this.buttonElements.forEach((buttonElement: HTMLElement, index: number) => {
      const isActive = activeAccordionIndex === index;
      const content = buttonElement.nextElementSibling as HTMLElement;

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
      buttonElement.setAttribute(this.stateAttributes.ariaExpanded, isActive.toString());
      content.style.maxHeight = isActive ? `${content.scrollHeight}px` : "";
    });
  }

  // Handles button click events: toggles accordion sections
  private onButtonClick(index: number) {
    if (this.state.activeAccordionIndex === index) {
      this.state.activeAccordionIndex = -1;
      return;
    }
    this.state.activeAccordionIndex = index;
  }
}

/**
 * AccordionCollection
 *
 * Manages multiple accordion instances on the page.
 * Automatically initializes all accordion components found in the document.
 *
 * Usage:
 *   new AccordionCollection();
 */
class AccordionCollection {
  // Initializes the collection and creates accordion instances for all found elements
  constructor() {
    this.init();
  }

  // Finds all accordion containers and creates Accordion instances for each
  private init(): void {
    document.querySelectorAll(rootSelector).forEach(element => new Accordion(element as HTMLElement));
  }
}

export default AccordionCollection;
