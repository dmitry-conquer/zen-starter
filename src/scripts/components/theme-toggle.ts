export default class ThemeToggle {
  private readonly selectors: Record<string, string> = {
    toggle: "[data-theme-toggle]",
  };
  private readonly attributes: Record<string, string> = {
    theme: "data-theme",
  };
  private readonly theme: Record<string, string> = {
    light: "light",
    dark: "dark",
  };

  private toggleElement: HTMLInputElement | null = null;
  private systemTheme: MediaQueryList | null = null;

  constructor() {
    this.toggleElement = document.querySelector(this.selectors.toggle);
    this.systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    this.init();
  }

  private init() {
    if (!this.toggleElement) return;
    this.applyTheme();
    this.bindEvents();
  }

  private applyTheme() {
    if (!this.toggleElement) return;
    const currentTheme = this.getCurrentTheme() || (this.systemTheme?.matches ? this.theme.dark : this.theme.light);
    document.documentElement.setAttribute(this.attributes.theme, currentTheme);
    this.toggleElement.checked = currentTheme === this.theme.dark;
  }

  private getCurrentTheme() {
    return localStorage.getItem("theme");
  }

  private updateTheme = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const theme = target.checked ? this.theme.dark : this.theme.light;
    document.documentElement.setAttribute(this.attributes.theme, theme);
    localStorage.setItem("theme", theme);
  };

  private bindEvents() {
    this.toggleElement?.addEventListener("change", this.updateTheme);
  }
}
