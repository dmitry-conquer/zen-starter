/**
 * Tabs
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

const rootSelector = "[data-js-tabs]";

class Tabs {
  /** CSS selectors for tab elements */
  private readonly selectors: Record<string, string> = {
    root: rootSelector,
    button: "[data-js-tabs-button]",
    content: "[data-js-tabs-content]",
  };

  /** CSS classes for state management */
  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
  };

  /** ARIA attributes for accessibility */
  private readonly stateAttributes: Record<string, string> = {
    ariaSelected: "aria-selected",
    tabIndex: "tabindex",
  };

  /** Root tabs container element */
  private rootElement: HTMLElement;
  /** Collection of tab button elements */
  private buttonElements: NodeListOf<HTMLElement>;
  /** Collection of tab content elements */
  private contentElements: NodeListOf<HTMLElement>;
  /** Reactive state object with proxy for automatic UI updates */
  private state;
  /** Maximum tab index for boundary checking */
  private limitTabsIndex: number;

  // Initializes tabs: sets up elements, state, and event listeners
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

  // Checks if the tabs component has all required elements to function properly
  private isReady(): boolean {
    return !!this.rootElement && !!this.buttonElements.length && !!this.contentElements.length;
  }

  // Initializes the tabs if all required elements are present
  private init(): void {
    if (!this.isReady()) return;
    this.bindEvents();
  }

  // Creates a reactive state object using Proxy for automatic UI updates
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

  // Updates the UI based on current state: toggles classes and sets ARIA attributes
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

  // Handles button click events: activates the clicked tab
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
 * TabsCollection
 *
 * Manages multiple tabs instances on the page.
 * Automatically initializes all tabs components found in the document.
 *
 * Usage:
 *   new TabsCollection();
 */
class TabsCollection {
  // Initializes the collection and creates tabs instances for all found elements
  constructor() {
    this.init();
  }

  // Finds all tabs containers and creates Tabs instances for each
  private init(): void {
    document.querySelectorAll(rootSelector).forEach(element => new Tabs(element as HTMLElement));
  }
}

export default TabsCollection;
