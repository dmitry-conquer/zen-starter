/**
 * Tabs Component
 *
 * Creates accessible tab components with keyboard navigation and ARIA support.
 * Supports arrow key navigation, home/end keys, and automatic state management.
 *
 * Features:
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - Proper ARIA attributes for accessibility
 * - Reactive state management using Set
 * - Automatic focus management
 * - Supports multiple tab instances on the same page
 */

const rootSelector = "[data-js-tabs]";

class Tabs {
  private readonly selectors: Record<string, string> = {
    button: "[data-js-tabs-button]",
    content: "[data-js-tabs-content]",
  };

  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
  };

  private readonly stateAttributes: Record<string, string> = {
    ariaSelected: "aria-selected",
    tabIndex: "tabindex",
    hidden: "hidden",
  };

  private rootElement: HTMLElement;
  private buttonElements: NodeListOf<HTMLElement>;
  private contentElements: NodeListOf<HTMLElement>;
  private _activeIndex: number;
  private limitTabsIndex: number;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button) as NodeListOf<HTMLElement>;
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content) as NodeListOf<HTMLElement>;

    this._activeIndex = this.getInitialActiveIndex();
    this.limitTabsIndex = this.buttonElements.length - 1;

    if (this.isReady()) {
      this.init();
    } else {
      console.warn("Tabs: Required elements not found");
    }
  }

  private isReady(): boolean {
    return !!this.rootElement && this.buttonElements.length > 0 && this.contentElements.length > 0;
  }

  private getInitialActiveIndex(): number {
    return Array.from(this.buttonElements).findIndex(button => button.classList.contains(this.stateClasses.isActive));
  }

  set activeTabIndex(index: number) {
    this._activeIndex = index;
    this.updateUI();
  }

  private init(): void {
    this.bindEvents();
    this.updateUI();
  }

  private updateUI(): void {
    this.buttonElements.forEach((buttonElement, index) => {
      const isActive: boolean = this._activeIndex === index;

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? "0" : "-1");
    });

    this.contentElements.forEach((contentElement, index) => {
      const isActive = this._activeIndex === index;
      contentElement.toggleAttribute(this.stateAttributes.hidden, !isActive);
      contentElement.classList.toggle(this.stateClasses.isActive, isActive);
    });
  }

  private handleButtonClick(buttonIndex: number): void {
    this.activeTabIndex = buttonIndex;
  }

  private activateTab(tabIndex: number): void {
    this.activeTabIndex = tabIndex;
    this.buttonElements[tabIndex].focus();
  }

  private prevTab = (): void => {
    const newTabIndex = this._activeIndex === 0 ? this.limitTabsIndex : this._activeIndex - 1;
    this.activateTab(newTabIndex);
  };

  private nextTab = (): void => {
    const newTabIndex = this._activeIndex === this.limitTabsIndex ? 0 : this._activeIndex + 1;
    this.activateTab(newTabIndex);
  };

  private firstTab = (): void => {
    this.activateTab(0);
  };

  private lastTab = (): void => {
    this.activateTab(this.limitTabsIndex);
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    const { code } = event;

    const keyMap = {
      ArrowLeft: this.prevTab,
      ArrowDown: this.nextTab,
      ArrowRight: this.nextTab,
      ArrowUp: this.prevTab,
      Home: this.firstTab,
      End: this.lastTab,
    };

    const action = keyMap[code as keyof typeof keyMap];
    action?.();
  };

  private bindEvents(): void {
    this.buttonElements.forEach((element, index) => {
      element.addEventListener("click", () => this.handleButtonClick(index));
    });

    this.rootElement.addEventListener("keydown", this.handleKeydown);
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
    this.init();
  }

  private init(): void {
    const tabsElements = document.querySelectorAll(rootSelector);

    tabsElements.forEach(element => {
      new Tabs(element as HTMLElement);
    });
  }
}

export default TabsCollection;
