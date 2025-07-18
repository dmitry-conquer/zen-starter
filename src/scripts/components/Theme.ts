/**
 * ThemeToggle
 *
 * Manages theme switching between light and dark modes with system preference detection.
 * Persists theme choice in localStorage and automatically applies system preference on first visit.
 *
 * Usage:
 *   <input type="checkbox" data-theme-toggle>
 *   new ThemeToggle();
 *
 * - Automatically detects and applies system color scheme preference
 * - Persists theme choice in localStorage
 * - Updates document data-theme attribute for CSS styling
 * - Syncs checkbox state with current theme
 * - Supports light and dark theme modes
 */

export default class ThemeToggle {
  /** CSS selectors for theme elements */
  private readonly selectors: Record<string, string> = {
    toggle: "[data-theme-toggle]",
  };
  /** Data attributes for theme management */
  private readonly attributes: Record<string, string> = {
    theme: "data-theme",
  };
  /** Available theme values */
  private readonly theme: Record<string, string> = {
    light: "light",
    dark: "dark",
  };

  /** Theme toggle checkbox element */
  private toggleElement: HTMLInputElement | null = null;
  /** Media query for system dark mode preference */
  private systemTheme: MediaQueryList | null = null;

  // Initializes theme toggle: finds elements and sets up theme management
  constructor() {
    this.toggleElement = document.querySelector(this.selectors.toggle);
    this.systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    this.init();
  }

  // Initializes theme management if toggle element is found
  private init() {
    if (!this.toggleElement) return;
    this.applyTheme();
    this.bindEvents();
  }

  // Applies current theme to document and syncs checkbox state
  private applyTheme() {
    if (!this.toggleElement) return;
    const currentTheme = this.getCurrentTheme() || (this.systemTheme?.matches ? this.theme.dark : this.theme.light);
    document.documentElement.setAttribute(this.attributes.theme, currentTheme);
    this.toggleElement.checked = currentTheme === this.theme.dark;
  }

  // Retrieves saved theme from localStorage
  private getCurrentTheme() {
    return localStorage.getItem("theme");
  }

  // Updates theme based on checkbox state and saves to localStorage
  private updateTheme = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const theme = target.checked ? this.theme.dark : this.theme.light;
    document.documentElement.setAttribute(this.attributes.theme, theme);
    localStorage.setItem("theme", theme);
  };

  // Binds change event listener to toggle element
  private bindEvents() {
    this.toggleElement?.addEventListener("change", this.updateTheme);
  }
}
