export class PanelNavigator {
  public historyStack: string[] = ["main"];
  private panels: HTMLElement[];

  constructor(panels: HTMLElement[]) {
    this.panels = panels;
  }

  public showPanel(id: string): void {
    this.panels.forEach(panel => {
      panel.classList.remove("is-active", "to-right", "to-left");
      const panelIdStr = (panel as HTMLElement).dataset.panelId;
      if (panelIdStr !== undefined && panelIdStr === id) {
        panel.classList.add("is-active");
      } else if (
        this.historyStack[this.historyStack.length - 2] &&
        this.historyStack[this.historyStack.length - 2] === (panel as HTMLElement).dataset.panelId
      ) {
        panel.classList.add("to-left");
      } else {
        panel.classList.add("to-right");
      }
    });
  }

  public onOverlayClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const nextButton = target.closest(".next-panel");
    const backButton = target.closest(".prev-panel");
    if (nextButton) {
      e?.preventDefault();
      const id = (nextButton as HTMLElement).dataset.panel;
      if (!id) return;
      this.historyStack.push(id);
      this.showPanel(id);
    }

    if (backButton) {
      this.historyStack.pop();
      this.showPanel(this.historyStack[this.historyStack.length - 1]);
    }
  };

  public reset(): void {
    this.historyStack = ["main"];
    this.showPanel("main");
  }
}
