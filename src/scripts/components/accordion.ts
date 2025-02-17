type indexStateType = {
  activeAccordionIndex: number;
};

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
    ariaSelected: "aria-selected",
  };
  private rootElement: HTMLElement;
  private buttonElements: NodeListOf<HTMLElement>;
  private state: indexStateType;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.state = this.getProxyState({
      activeAccordionIndex: [...this.buttonElements].findIndex(buttonElement =>
        buttonElement.classList.contains(this.stateClasses.isActive)
      ),
    });

    this.bindEvents();
  }

  private bindEvents(): void {
    this.buttonElements.forEach((buttonElement, index: number) => {
      buttonElement?.addEventListener("click", () => this.onButtonClick(index));
    });
  }

  private getProxyState(state: indexStateType) {
    return new Proxy(state, {
      get: (target: indexStateType, prop: keyof indexStateType) => {
        return target[prop];
      },
      set: (target: indexStateType, prop: keyof indexStateType, value: number) => {
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
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
      content.style.maxHeight = isActive ? `${content.scrollHeight}px` : "";
    });
  }

  private onButtonClick(index: number) {
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
