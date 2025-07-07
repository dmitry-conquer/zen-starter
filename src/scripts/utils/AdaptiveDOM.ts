/**
 * AdaptiveDOM - Dynamic DOM element repositioning based on screen size
 * 
 * Automatically moves DOM elements between containers when screen size changes
 * using MediaQueryList for better performance than resize events.
 * 
 * @example
 * // HTML structure:
 * <div id="container1">
 *   <div data-da="container2,768,first">This will move to container2 on mobile</div>
 * </div>
 * <div id="container2"></div>
 * 
 * // JavaScript:
 * new AdaptiveDOM();
 * 
 * @example
 * // Move element to specific position (index 2):
 * <div data-da="container2,768,2">Element will be inserted at position 2</div>
 * 
 * @example
 * // Move to end of container:
 * <div data-da="container2,768,last">Element will be appended to container</div>
 */

class AdaptiveDOM {
  private readonly selectors = {
    target: "[data-da]",
  };
  private targets: HTMLElement[] = [];
  private originalPosition = new Map<HTMLElement, { parent: HTMLElement | null; nextSibling: Node | null }>();

  constructor() {
    this.targets = Array.from(document.querySelectorAll<HTMLElement>(this.selectors.target)) || [];
    this.init();
  }

  private init(): void {
    this.targets.forEach(target => {
      const { da } = target.dataset;
      if (!da) return;

      const [to, breakpoint, position] = da.split(",").map(item => item.trim());
      if (!to || !breakpoint || !position) return;

      const toElement = document.getElementById(to);
      if (!toElement) return;

      if (isNaN(Number(position))) return;

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

  private restoreElement(target: HTMLElement): void {
    const originalPos = this.originalPosition.get(target);
    if (!originalPos?.parent) return;

    originalPos.parent.insertBefore(target, originalPos.nextSibling);
  }
}

export default AdaptiveDOM;
