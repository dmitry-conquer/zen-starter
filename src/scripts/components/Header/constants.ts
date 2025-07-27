export const attributes: Record<string, string> = {
  ariaExpanded: "aria-expanded",
};

export const selectors: Record<string, string> = {
  root: "[data-js-header]",
  overlay: "[data-js-header-overlay]",
  triggerButton: "[data-js-header-trigger-button]",
  itemHasSubmenu: ".has-submenu",
  panel: "[data-js-header-panel]",
};

export const stateClasses: Record<string, string> = {
  isActive: "is-active",
  isLock: "is-lock",
};
