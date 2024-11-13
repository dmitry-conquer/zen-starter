type AccordionOptions = {
  triggerClass: string;
  toggleClass: string;
};

export class Accordion {
  private accordionTriggers: NodeListOf<HTMLElement>;
  private defaults: AccordionOptions;
  private settings: AccordionOptions;
  constructor(options: Partial<AccordionOptions>) {
    this.defaults = {
      triggerClass: "accordion-header",
      toggleClass: "accordion-active",
    };
    this.settings = { ...this.defaults, ...options };
    this.accordionTriggers = document.querySelectorAll(`.${this.settings.triggerClass}`);
  }
  public init() {
    if (this.accordionTriggers.length <= 0) {
      return;
    }
    this.initListeners();
  }
  private initListeners() {
    this.accordionTriggers.forEach(el => {
      el?.addEventListener("click", () => this.handleToggle(el.nextElementSibling as HTMLElement, el as HTMLElement));
    });
  }
  private handleToggle(content: HTMLElement, trigger: HTMLElement) {
    requestAnimationFrame(() => {
      content.style.maxHeight = content.style.maxHeight === "" ? `${content.scrollHeight}px` : "";
    });
    trigger.classList.toggle(this.settings.toggleClass);
  }
}
