const rootSelector = "[data-js-accordion]";

class Accordion {
  private readonly selectors: Record<string, string> = {
    root: rootSelector,
    button: "[data-js-accordion-button]",
    content: "[data-js-accordion-content]",
  };
  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
  };
  private readonly stateAttributes: Record<string, string> = {
    ariaExpanded: "aria-expanded",
  };
  private rootElement: HTMLElement;
  private buttonElements: NodeListOf<HTMLElement>;
  private state: TypeAccordioState;

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

  private init(): void {
    if (!this.isReady()) return;
    this.bindEvents();
  }

  private isReady(): boolean {
    return !!this.rootElement && !!this.buttonElements.length;
  }

  private bindEvents(): void {
    this.buttonElements.forEach((buttonElement, index: number) => {
      buttonElement?.addEventListener("click", () => this.onButtonClick(index));
    });
  }

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

  private onButtonClick(index: number) {
    if (this.state.activeAccordionIndex === index) {
      this.state.activeAccordionIndex = -1;
      return;
    }
    this.state.activeAccordionIndex = index;
  }
}

class AccordionCollection {
  constructor() {
    this.init();
  }

  private init(): void {
    document.querySelectorAll(rootSelector).forEach(element => new Accordion(element as HTMLElement));
  }
}

export default AccordionCollection;
