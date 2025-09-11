/**
 * Tabs Component
 *
 * Creates accessible tab components with keyboard navigation and ARIA support.
 * Supports arrow key navigation, home/end keys, and automatic state management.
 *
 * Usage:
 *   <div data-js-tabs>
 *     <button data-js-tabs-button class="is-active">Tab 1</button>
 *     <button data-js-tabs-button>Tab 2</button>
 *     <div data-js-tabs-content class="is-active">Content 1</div>
 *     <div data-js-tabs-content>Content 2</div>
 *   </div>
 *   new TabsCollection();
 *
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - Proper ARIA attributes for accessibility
 * - Reactive state management using Proxy
 * - Automatic focus management
 * - Supports multiple tab instances on the same page
 */

type TypeTabsSelectors = {
  root: string;
  button: string;
  content: string;
};

type TypeTabsStateClasses = {
  isActive: string;
};

type TypeTabsStateAttributes = {
  ariaSelected: string;
  tabIndex: string;
};

type TypeTabsState = {
  activeTabIndex: number;
};

/**
 * Main Tabs class
 */
class Tabs {
  // CSS selectors for tab elements
  private readonly selectors: TypeTabsSelectors = {
    root: "[data-js-tabs]",
    button: "[data-js-tabs-button]",
    content: "[data-js-tabs-content]",
  };

  // CSS classes for state management
  private readonly stateClasses: TypeTabsStateClasses = {
    isActive: "is-active",
  };

  // ARIA attributes for accessibility
  private readonly stateAttributes: TypeTabsStateAttributes = {
    ariaSelected: "aria-selected",
    tabIndex: "tabindex",
  };

  private rootElement: HTMLElement;
  private buttonElements: NodeListOf<HTMLElement>;
  private contentElements: NodeListOf<HTMLElement>;
  private state: TypeTabsState;
  private limitTabsIndex: number;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button) as NodeListOf<HTMLElement>;
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content) as NodeListOf<HTMLElement>;

    // Initialize state with proxy for automatic UI updates
    this.state = this.createProxyState({
      activeTabIndex: this.getInitialActiveIndex(),
    });

    this.limitTabsIndex = this.buttonElements.length - 1;

    if (this.isReady()) {
      this.initialize();
    } else {
      console.warn("Tabs: Required elements not found");
    }
  }

  // Checks if tabs component is ready to work
  private isReady(): boolean {
    return !!this.rootElement && this.buttonElements.length > 0 && this.contentElements.length > 0;
  }

  // Gets initial active index
  private getInitialActiveIndex(): number {
    return Array.from(this.buttonElements).findIndex(button => button.classList.contains(this.stateClasses.isActive));
  }

  // Creates reactive state object using Proxy for automatic UI updates
  private createProxyState(state: TypeTabsState): TypeTabsState {
    return new Proxy(state, {
      get: (target: TypeTabsState, prop: keyof TypeTabsState) => {
        return target[prop];
      },
      set: (target: TypeTabsState, prop: keyof TypeTabsState, value: number) => {
        target[prop] = value;
        this.updateUI();
        return true;
      },
    });
  }

  // Initializes tabs
  private initialize(): void {
    this.bindEvents();
    this.updateUI();
  }

  // Updates UI based on current state
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

  // Handles button click events
  private onButtonClick(buttonIndex: number): void {
    this.state.activeTabIndex = buttonIndex;
  }

  // Activates a specific tab and focuses its button
  private activateTab(tabIndex: number): void {
    this.state.activeTabIndex = tabIndex;
    this.buttonElements[tabIndex].focus();
  }

  // Navigates to the previous tab with wrap-around behavior
  private prevTab = (): void => {
    const newTabIndex = this.state.activeTabIndex === 0 ? this.limitTabsIndex : this.state.activeTabIndex - 1;
    this.activateTab(newTabIndex);
  };

  // Navigates to the next tab with wrap-around behavior
  private nextTab = (): void => {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex ? 0 : this.state.activeTabIndex + 1;
    this.activateTab(newTabIndex);
  };

  // Navigates to the first tab
  private firstTab = (): void => {
    this.activateTab(0);
  };

  // Navigates to the last tab
  private lastTab = (): void => {
    this.activateTab(this.limitTabsIndex);
  };

  // Handles keyboard navigation events
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

  // Binds click and keyboard event listeners
  private bindEvents(): void {
    this.buttonElements.forEach((element, index) => {
      element.addEventListener("click", () => this.onButtonClick(index));
    });

    this.rootElement.addEventListener("keydown", this.onKeydown);
  }
}

/**
 * Tabs Collection
 *
 * Manages multiple tabs instances on the page.
 * Automatically initializes all tabs components found in the document.
 *
 * Usage:
 *   new TabsCollection();
 */
class TabsCollection {
  constructor() {
    this.initializeAll();
  }

  // Initializes all tabs components
  private initializeAll(): void {
    const tabsElements = document.querySelectorAll("[data-js-tabs]");

    tabsElements.forEach(element => {
      new Tabs(element as HTMLElement);
    });
  }
}

export default TabsCollection;
