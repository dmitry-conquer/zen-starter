/**
 * AdaptiveDOM
 *
 * Dynamically moves DOM elements between containers based on screen size using data attributes.
 * Uses MediaQueryList for efficient, event-driven repositioning.
 *
 * Usage:
 *   <div data-adaptive-dom="containerId,768,first|last|N">...</div>
 *   new AdaptiveDOM();
 *
 * - Moves the element to #containerId when viewport ≤ 768px, at the specified position.
 * - Restores the element to its original place when viewport > 768px.
 */

class AdaptiveDOM {
  /** CSS selector for target elements */
  private readonly selector: string = "[data-adaptive-dom]";

  /** Elements to be repositioned */
  private targets: HTMLElement[];

  /** Stores original parent and sibling for restoration */
  private originalPosition: Map<HTMLElement, { parent: HTMLElement | null; nextSibling: Node | null }>;

  /**
   * Initializes AdaptiveDOM: finds targets and sets up listeners.
   */
  constructor() {
    this.targets = Array.from(document.querySelectorAll<HTMLElement>(this.selector));
    this.originalPosition = new Map();
    this.init();
  }

  /**
   * Parses data attributes and sets up media query listeners for each target.
   */
  private init(): void {
    this.targets.forEach(target => {
      const { adaptiveDom } = target.dataset;
      if (!adaptiveDom) return;
      const [to, breakpoint, position] = adaptiveDom.split(",").map(item => item.trim());
      if (!to || !breakpoint || !position) return;
      const toElement = document.getElementById(to);
      if (!toElement) return;
      if (position !== "first" && position !== "last" && isNaN(Number(position))) return;
      this.originalPosition.set(target, {
        parent: target.parentElement,
        nextSibling: target.nextSibling,
      });
      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
      this.updatePosition(target, toElement, mediaQuery, position);
      mediaQuery.addEventListener("change", () => {
        this.updatePosition(target, toElement, mediaQuery, position);
      });
    });
  }

  /**
   * Moves or restores the element based on the media query state.
   */
  private updatePosition(
    target: HTMLElement,
    toElement: HTMLElement,
    mediaQuery: MediaQueryList,
    position: string
  ): void {
    if (mediaQuery.matches && target.parentElement === toElement) return;
    if (!mediaQuery.matches && target.parentElement === this.originalPosition.get(target)?.parent) return;
    if (mediaQuery.matches) {
      this.moveElement(target, toElement, position);
    } else {
      this.restoreElement(target);
    }
  }

  /**
   * Moves the element to the target container at the specified position.
   */
  private moveElement(target: HTMLElement, toElement: HTMLElement, position: string): void {
    if (position === "first") {
      toElement.insertBefore(target, toElement.firstChild);
    } else if (position === "last") {
      toElement.appendChild(target);
    } else {
      const index = parseInt(position);
      if (!isNaN(index)) {
        const children = Array.from(toElement.children);
        const insertIndex = Math.min(index, children.length);
        const referenceNode = children[insertIndex] || null;
        toElement.insertBefore(target, referenceNode);
      }
    }
  }

  /**
   * Restores the element to its original parent and position.
   */
  private restoreElement(target: HTMLElement): void {
    const originalPos = this.originalPosition.get(target);
    if (!originalPos?.parent) return;
    originalPos.parent.insertBefore(target, originalPos.nextSibling);
  }
}

export default AdaptiveDOM;
