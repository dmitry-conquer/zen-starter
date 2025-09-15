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

// Types and interfaces
type AdaptiveDOMConfig = {
  containerId: string;
  breakpoint: number;
  position: PositionType;
};

type OriginalPosition = {
  parent: HTMLElement | null;
  nextSibling: Node | null;
};

type PositionType = "first" | "last" | number;

// Constants
const SELECTOR = "[data-adaptive-dom]";
const POSITION_TYPES = {
  FIRST: "first",
  LAST: "last",
} as const;

/**
 * Handles element positioning logic
 */
class ElementPositioner {
  /**
   * Moves the element to the target container at the specified position
   */
  static moveElement(target: HTMLElement, toElement: HTMLElement, position: PositionType): void {
    if (position === POSITION_TYPES.FIRST) {
      toElement.insertBefore(target, toElement.firstChild);
    } else if (position === POSITION_TYPES.LAST) {
      toElement.appendChild(target);
    } else if (typeof position === "number") {
      this.insertAtPosition(target, toElement, position);
    }
  }

  /**
   * Inserts element at specific numeric position
   */
  private static insertAtPosition(target: HTMLElement, toElement: HTMLElement, index: number): void {
    const children = Array.from(toElement.children);
    const insertIndex = Math.min(index, children.length);
    const referenceNode = children[insertIndex] || null;
    toElement.insertBefore(target, referenceNode);
  }

  /**
   * Restores the element to its original parent and position
   */
  static restoreElement(target: HTMLElement, originalPos: OriginalPosition): void {
    if (!originalPos?.parent) return;
    originalPos.parent.insertBefore(target, originalPos.nextSibling);
  }
}

/**
 * Handles media query management
 */
class MediaQueryManager {
  /**
   * Creates and manages media query listener for a target element
   */
  createListener(config: AdaptiveDOMConfig, onUpdate: (matches: boolean) => void): void {
    const mediaQuery = window.matchMedia(`(max-width: ${config.breakpoint}px)`);

    const listener = () => onUpdate(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);

    // Initial call
    onUpdate(mediaQuery.matches);
  }
}

/**
 * Main AdaptiveDOM class
 */
class AdaptiveDOM {
  private targets: HTMLElement[] = [];
  private readonly originalPositions: Map<HTMLElement, OriginalPosition> = new Map();
  private readonly mediaQueryManager: MediaQueryManager = new MediaQueryManager();

  constructor() {
    this.initialize();
  }

  /**
   * Initializes AdaptiveDOM: finds targets and sets up listeners
   */
  private initialize(): void {
    this.findTargets();
    this.setupTargets();
  }

  /**
   * Finds all elements with data-adaptive-dom attribute
   */
  private findTargets(): void {
    this.targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  }

  /**
   * Sets up each target with media query listeners
   */
  private setupTargets(): void {
    this.targets.forEach(target => {
      const config = this.parseConfig(target);
      if (!config) return;

      this.storeOriginalPosition(target);
      this.setupMediaQueryListener(target, config);
    });
  }

  /**
   * Parses data-adaptive-dom attribute into configuration object
   */
  private parseConfig(target: HTMLElement): AdaptiveDOMConfig | null {
    const { adaptiveDom } = target.dataset;
    if (!adaptiveDom) return null;

    const [containerId, breakpoint, position] = adaptiveDom.split(",").map(item => item.trim());

    if (!this.validateConfig(containerId, breakpoint, position)) return null;

    return {
      containerId,
      breakpoint: parseInt(breakpoint),
      position: this.parsePosition(position),
    };
  }

  /**
   * Parses position string into PositionType
   */
  private parsePosition(position: string): PositionType {
    if (position === POSITION_TYPES.FIRST) return POSITION_TYPES.FIRST;
    if (position === POSITION_TYPES.LAST) return POSITION_TYPES.LAST;
    const numPosition = parseInt(position);
    return isNaN(numPosition) ? POSITION_TYPES.LAST : numPosition;
  }

  /**
   * Validates configuration parameters
   */
  private validateConfig(containerId: string, breakpoint: string, position: string): boolean {
    if (!containerId || !breakpoint || !position) return false;

    const targetElement = document.getElementById(containerId);
    if (!targetElement) return false;

    if (position !== POSITION_TYPES.FIRST && position !== POSITION_TYPES.LAST && isNaN(Number(position))) {
      return false;
    }

    return true;
  }

  /**
   * Stores original position information for restoration
   */
  private storeOriginalPosition(target: HTMLElement): void {
    this.originalPositions.set(target, {
      parent: target.parentElement,
      nextSibling: target.nextSibling,
    });
  }

  /**
   * Sets up media query listener for position updates
   */
  private setupMediaQueryListener(target: HTMLElement, config: AdaptiveDOMConfig): void {
    this.mediaQueryManager.createListener(config, matches => {
      this.updatePosition(target, config, matches);
    });
  }

  /**
   * Updates element position based on media query state
   */
  private updatePosition(target: HTMLElement, config: AdaptiveDOMConfig, shouldMove: boolean): void {
    const targetElement = document.getElementById(config.containerId);
    if (!targetElement) return;

    const currentParent = target.parentElement;
    const originalParent = this.originalPositions.get(target)?.parent;

    // Skip if already in correct position
    if (shouldMove && currentParent === targetElement) return;
    if (!shouldMove && currentParent === originalParent) return;

    if (shouldMove) {
      ElementPositioner.moveElement(target, targetElement, config.position);
    } else {
      const originalPos = this.originalPositions.get(target);
      if (originalPos) {
        ElementPositioner.restoreElement(target, originalPos);
      }
    }
  }
}

export default AdaptiveDOM;
