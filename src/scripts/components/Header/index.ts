import { isTouchDevice } from "../../utilities/helpers";
import { PanelNavigator } from "./modules/PanelNavigator";

export class Header {
  private attributes: Record<string, string> = {
    ariaExpanded: "aria-expanded",
  };
  private selectors: Record<string, string> = {
    root: "[data-js-header]",
    overlay: "[data-js-header-overlay]",
    triggerButton: "[data-js-header-trigger-button]",
    itemHasSubmenu: ".has-submenu",
    panel: "[data-js-header-panel]",
  };
  private stateClasses: Record<string, string> = {
    isActive: "is-active",
    isLock: "is-lock",
  };

  private rootElement: HTMLElement | null;
  private overlayElement: HTMLElement | null;
  private triggerButtonElement: HTMLElement | null;
  private itemHasSubmenuElements: HTMLElement[];
  private toggleElements: HTMLElement[];
  private panels: HTMLElement[];
  private panelNavigator: PanelNavigator;

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.overlayElement = this.rootElement?.querySelector(this.selectors.overlay) || null;
    this.triggerButtonElement = this.rootElement?.querySelector(this.selectors.triggerButton) || null;
    this.toggleElements = [this.rootElement, this.overlayElement, this.triggerButtonElement].filter(
      Boolean
    ) as HTMLElement[];
    this.panels = Array.from(this.rootElement?.querySelectorAll(this.selectors.panel) || []) as HTMLElement[];
    this.itemHasSubmenuElements = Array.from(
      this.rootElement?.querySelectorAll(this.selectors.itemHasSubmenu) || []
    ) as HTMLElement[];
    this.panelNavigator = new PanelNavigator(this.panels);

    this.init();
  }

  private isReady(): boolean {
    return !!this.rootElement && !!this.overlayElement && !!this.triggerButtonElement;
  }

  private init(): void {
    if (!this.isReady()) return;
    this.bindEvents();
  }

  get isTouchDevice(): boolean {
    return isTouchDevice();
  }

  private onButtonClick = (): void => {
    const isActive = this.rootElement?.classList.contains(this.stateClasses.isActive);
    this.setActive(!isActive);
  };

  private onDocumentClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (
      target.closest(this.selectors.triggerButton) ||
      target.closest(this.selectors.overlay) ||
      target.closest(this.selectors.itemHasSubmenu)
    )
      return;
    this.setActive(false);
    this.closeAllMenus();
  };

  private toggleSubmenu(currentIndex: number): void {
    this.itemHasSubmenuElements.forEach((menuItem, index) => {
      const subMenu = menuItem.querySelector("ul") as HTMLElement;
      if (!subMenu) return;
      const active = menuItem.classList.contains(this.stateClasses.isActive);

      if (currentIndex === index) {
        menuItem?.classList.toggle(this.stateClasses.isActive);
        subMenu.style.maxHeight = active ? "" : `${subMenu.scrollHeight}px`;
      } else {
        menuItem.classList.remove(this.stateClasses.isActive);
        subMenu.style.maxHeight = "";
      }
    });
  }

  private closeAllMenus(): void {
    this.itemHasSubmenuElements.forEach(menuItem => {
      const subMenu = menuItem.querySelector(".nav-content") as HTMLElement;
      if (!subMenu) return;
      menuItem?.classList.remove(this.stateClasses.isActive);
      subMenu.style.maxHeight = "";
    });
    this.panelNavigator.reset();
    this.setActive(false);
  }

  private setActive(state: boolean): void {
    this.toggleElements.forEach(el => el.classList.toggle(this.stateClasses.isActive, state));
    document.documentElement.classList.toggle(this.stateClasses.isLock, state);
    this.setAttributes(state);
  }

  private setAttributes(state: boolean): void {
    this.triggerButtonElement?.setAttribute(this.attributes.ariaExpanded, String(state));
  }

  private handleInteraction(index: number, e: MouseEvent) {
    const menuItem = this.itemHasSubmenuElements[index];
    const isActive = menuItem.classList.contains(this.stateClasses.isActive);

    if (!isActive) {
      e.preventDefault();
      this.toggleSubmenu(index);
    }
  }

  private bindEvents(): void {
    document.addEventListener("click", this.onDocumentClick);
    this.triggerButtonElement?.addEventListener("click", this.onButtonClick);
    this.overlayElement?.addEventListener("click", this.panelNavigator.onOverlayClick);
    this.itemHasSubmenuElements.forEach((item, index) => {
      (item.querySelector(":scope > a") as HTMLElement | null)?.addEventListener("click", (event: MouseEvent) => {
        if (this.isTouchDevice) {
          this.handleInteraction(index, event);
        }
      });
    });
  }
}

export default Header;
