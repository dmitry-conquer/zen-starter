import { selectors } from "./constants";
import { attributes } from "./constants";
import { stateClasses } from "./constants";
import { isTouchDevice } from "./utils";
import { PanelNavigator } from "./PanelNavigator";

export class Header {
  private rootElement: HTMLElement | null;
  private overlayElement: HTMLElement | null;
  private triggerButtonElement: HTMLElement | null;
  private itemHasSubmenuElements: HTMLElement[];
  private toggleElements: HTMLElement[];
  private panels: HTMLElement[];
  private panelNavigator: PanelNavigator;

  constructor() {
    this.rootElement = document.querySelector(selectors.root);
    this.overlayElement = this.rootElement?.querySelector(selectors.overlay) || null;
    this.triggerButtonElement = this.rootElement?.querySelector(selectors.triggerButton) || null;
    this.toggleElements = [this.rootElement, this.overlayElement, this.triggerButtonElement].filter(
      Boolean
    ) as HTMLElement[];
    this.panels = Array.from(this.rootElement?.querySelectorAll(selectors.panel) || []) as HTMLElement[];
    this.itemHasSubmenuElements = Array.from(
      this.rootElement?.querySelectorAll(selectors.itemHasSubmenu) || []
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
    const isActive = this.rootElement?.classList.contains(stateClasses.isActive);
    this.setActive(!isActive);
  };

  private onDocumentClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (
      target.closest(selectors.triggerButton) ||
      target.closest(selectors.overlay) ||
      target.closest(selectors.itemHasSubmenu)
    )
      return;
    this.setActive(false);
    this.closeAllMenus();
  };

  private toggleSubmenu(currentIndex: number): void {
    this.itemHasSubmenuElements.forEach((menuItem, index) => {
      const subMenu = menuItem.querySelector(".mega-header__menu-dropdown") as HTMLElement;
      if (!subMenu) return;
      const active = menuItem.classList.contains(stateClasses.isActive);

      if (currentIndex === index) {
        menuItem?.classList.toggle(stateClasses.isActive);
        subMenu.style.maxHeight = active ? "" : `${subMenu.scrollHeight}px`;
      } else {
        menuItem.classList.remove(stateClasses.isActive);
        subMenu.style.maxHeight = "";
      }
    });
  }

  private closeAllMenus(): void {
    this.itemHasSubmenuElements.forEach(menuItem => {
      const subMenu = menuItem.querySelector(".nav-content") as HTMLElement;
      if (!subMenu) return;
      menuItem?.classList.remove(stateClasses.isActive);
      subMenu.style.maxHeight = "";
    });
    this.panelNavigator.historyStack = ["main"];
    this.panelNavigator.showPanel("main");
    this.setActive(false);
  }

  private setActive(state: boolean): void {
    this.toggleElements.forEach(el => el.classList.toggle(stateClasses.isActive, state));
    document.documentElement.classList.toggle(stateClasses.isLock, state);
    this.setAttributes(state);
  }

  private setAttributes(state: boolean): void {
    this.triggerButtonElement?.setAttribute(attributes.ariaExpanded, String(state));
  }

  private handleInteraction(index: number, e: MouseEvent) {
    const menuItem = this.itemHasSubmenuElements[index];
    const isActive = menuItem.classList.contains(stateClasses.isActive);

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
