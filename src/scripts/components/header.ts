export class Header {
  private readonly selectors: Record<string, string> = {
    root: "[data-js-header]",
    overlay: "[data-js-header-overlay]",
    triggerButton: "[data-js-header-trigger-button]",
    itemHasSubmenu: ".has-submenu",
  };

  private readonly stateClasses: Record<string, string> = {
    isActive: "is-active",
    isLock: "is-lock",
  };

  private rootElement: HTMLElement | null;
  private overlayElement: HTMLElement | null;
  private triggerButtonElement: HTMLElement | null;
  private itemHasSubmenuElements: HTMLElement[];
  private mediaQuery: MediaQueryList;
  private isMobileView: boolean;
  private isTouchDevice: boolean;

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = this.rootElement?.querySelector(this.selectors.overlay) || null;
    this.triggerButtonElement = this.rootElement?.querySelector(this.selectors.triggerButton) || null;
    this.itemHasSubmenuElements = Array.from(
      this.rootElement?.querySelectorAll(this.selectors.itemHasSubmenu) || []
    ) as HTMLElement[];

    this.mediaQuery = window.matchMedia("(max-width: 1400px)");
    this.isMobileView = this.mediaQuery.matches;
    this.isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    this.init();
  }

  // Ensure all required elements are ready
  private isReady(): boolean {
    return !!this.rootElement && !!this.overlayElement && !!this.triggerButtonElement;
  }

  // Initialization
  private init(): void {
    if (!this.isReady()) return;
    this.bindEvents();
  }

  // Toggle the main menu (for mobile and desktop)
  private toggleMenu(): void {
    this.triggerButtonElement?.classList.toggle(this.stateClasses.isActive);
    this.overlayElement?.classList.toggle(this.stateClasses.isActive);
    document.documentElement.classList.toggle(this.stateClasses.isLock);
  }

  // Handle submenu toggle
  private toggleSubmenu(currentIndex: number): void {
    this.itemHasSubmenuElements.forEach((menuItem, index) => {
      const subMenu = menuItem.querySelector("ul") as HTMLElement;
      const isActive = menuItem.classList.contains(this.stateClasses.isActive);

      if (currentIndex === index) {
        menuItem?.classList.toggle(this.stateClasses.isActive);
        subMenu.style.maxHeight = isActive ? "" : `${subMenu.scrollHeight}px`;
      } else {
        menuItem?.classList.remove(this.stateClasses.isActive);
        subMenu.style.maxHeight = "";
      }
    });
  }

  // Close all menus
  private closeAllMenus(): void {
    // Reset all submenus
    this.itemHasSubmenuElements.forEach(menuItem => {
      const subMenu = menuItem.querySelector("ul") as HTMLElement;
      menuItem?.classList.remove(this.stateClasses.isActive);
      subMenu.style.maxHeight = "";
    });

    // Reset main menu
    this.triggerButtonElement?.classList.remove(this.stateClasses.isActive);
    this.overlayElement?.classList.remove(this.stateClasses.isActive);
    document.documentElement.classList.remove(this.stateClasses.isLock);
  }

  // Bind all events
  private bindEvents(): void {
    // Handle menu toggle
    this.triggerButtonElement?.addEventListener("click", () => this.toggleMenu());

    // Handle submenu interactions
    this.itemHasSubmenuElements.forEach((item, index) => {
      const link = item.querySelector(":scope > a") as HTMLAnchorElement;

      const handleInteraction = (e: Event) => {
        if (this.isTouchDevice || this.isMobileView) {
          e.preventDefault(); // Prevent navigation
          this.toggleSubmenu(index);
        }
      };

      link.addEventListener("click", handleInteraction);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e: MouseEvent) => {
      if (!this.rootElement?.contains(e.target as Node)) {
        this.closeAllMenus();
      }
    });

    // Update view type on window resize
    this.mediaQuery.addEventListener("change", (e: MediaQueryListEvent) => {
      this.isMobileView = e.matches;
      if (!this.isMobileView) {
        this.closeAllMenus();
      }
    });
  }
}

export default Header;