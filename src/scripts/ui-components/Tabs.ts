const rootSelector = "[data-js-tabs]";

class Tabs {
  private readonly selectors: Record<string, string> = {
    root: rootSelector,
    button: "[data-js-tabs-button]",
    content: "[data-js-tabs-content]",
  };

  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
  };

  private readonly stateAttributes: Record<string, string> = {
    ariaSelected: "aria-selected",
    tabIndex: "tabindex",
  };

  private rootElement: HTMLElement;
  private buttonElements: NodeListOf<HTMLElement>;
  private contentElements: NodeListOf<HTMLElement>;
  private state;
  private limitTabsIndex: number;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
    this.state = this.getProxyState({
      activeTabIndex: [...this.buttonElements].findIndex(buttonElement =>
        buttonElement.classList.contains(this.stateClasses.isActive)
      ),
    });
    this.limitTabsIndex = this.buttonElements.length - 1;

    this.init();
  }

  private isReady(): boolean {
    return !!this.rootElement && !!this.buttonElements.length && !!this.contentElements.length;
  }

  private init(): void {
    if (!this.isReady()) return;
    this.bindEvents();
  }

  private getProxyState(initialState: TypeTabsState) {
    return new Proxy(initialState, {
      get: (target: TypeTabsState, prop: keyof TypeTabsState): number => {
        return target[prop];
      },
      set: (target: TypeTabsState, prop: keyof TypeTabsState, value: number) => {
        target[prop] = value;
        this.updateUI();
        return true;
      },
    });
  }

  private updateUI(): void {
    const { activeTabIndex } = this.state;
    this.buttonElements.forEach((buttonElement, index) => {
      const isActive: boolean = activeTabIndex === index;

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? "0" : "-1");
    });

    this.contentElements.forEach((contentElement, index) => {
      const isActive = activeTabIndex === index;
      contentElement.classList.toggle(this.stateClasses.isActive, isActive);
    });
  }

  private onButtonClick(buttonIndex: number): void {
    this.state.activeTabIndex = buttonIndex;
  }

  private activateTab(tabIndex: number): void {
    this.state.activeTabIndex = tabIndex;
    this.buttonElements[tabIndex].focus();
  }

  private prevTab = (): void => {
    const newTabIndex = this.state.activeTabIndex === 0 ? this.limitTabsIndex : this.state.activeTabIndex - 1;
    this.activateTab(newTabIndex);
  };
  private nextTab = (): void => {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex ? 0 : this.state.activeTabIndex + 1;
    this.activateTab(newTabIndex);
  };
  private firstTab = (): void => {
    this.activateTab(0);
  };
  private lastTab = (): void => {
    this.activateTab(this.limitTabsIndex);
  };

  private onKeydown = (event: KeyboardEvent): void => {
    const { code } = event;

    const keyMap = {
      ArrowLeft: this.prevTab,
      ArrowRight: this.nextTab,
      Home: this.firstTab,
      End: this.lastTab,
    };

    const action = keyMap[code as keyof typeof keyMap];
    action?.();
  };

  private bindEvents(): void {
    this.buttonElements.forEach((element, index) => {
      element.addEventListener("click", () => this.onButtonClick(index));
    });

    this.rootElement.addEventListener("keydown", this.onKeydown);
  }
}

class TabsCollection {
  constructor() {
    this.init();
  }

  private init(): void {
    document.querySelectorAll(rootSelector).forEach(element => new Tabs(element as HTMLElement));
  }
}

export default TabsCollection;
