class Marquee {
  private trackEl: HTMLElement | null = null;
  private speed: number;
  private offset: number = 0;
  private direction: "left" | "right";
  private animationId: number | null = null;

  constructor(id: string, options?: any) {
    const { speed = 2, direction = "left", pauseOnHover = false } = options || {};
    this.speed = speed;
    this.direction = direction;
    this.trackEl = document.getElementById(id) || null;
    if (!this.trackEl) return;
    this.duplicateTrack();
    this.initMove();
    if (pauseOnHover) {
      this.addHoverListeners();
    }
  }

  private duplicateTrack(): void {
    this.trackEl!.innerHTML += this.trackEl!.innerHTML;
  }

  private addHoverListeners(): void {
    this.trackEl!.addEventListener("mouseenter", () => this.pause());
    this.trackEl!.addEventListener("mouseleave", () => this.resume());
  }

  public pause(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public resume(): void {
    this.initMove();
  }

  private initMove(): void {
    const move = () => {
      const halfWidth = this.trackEl!.scrollWidth / 2;
      this.offset += this.direction === "left" ? this.speed : -this.speed;
      if (this.direction === "left" && this.offset >= halfWidth) {
        this.offset = 0;
      } else if (this.direction === "right" && this.offset <= 0) {
        this.offset = halfWidth;
      }
      this.trackEl!.style.transform = `translateX(-${this.offset}px)`;
      this.animationId = requestAnimationFrame(move);
    };
    move();
  }
}

export default Marquee;
