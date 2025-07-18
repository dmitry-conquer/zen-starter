/**
 * Marquee
 *
 * Creates smooth scrolling marquee/banner effects with customizable speed and direction.
 * Supports pause on hover functionality and seamless infinite scrolling using content duplication.
 *
 * Usage:
 *   <div id="marquee-track">Your content here</div>
 *   new Marquee("marquee-track", { speed: 2, direction: "left", pauseOnHover: true });
 *   // or with defaults
 *   new Marquee("marquee-track");
 *
 * - Smooth infinite scrolling animation using requestAnimationFrame
 * - Configurable speed and direction (left/right)
 * - Optional pause on hover functionality
 * - Automatically duplicates content for seamless looping
 * - Performance optimized with transform animations
 */

class Marquee {
  /** Track element that contains the scrolling content */
  private trackEl: HTMLElement | null = null;
  /** Animation speed in pixels per frame */
  private speed: number;
  /** Current scroll offset position */
  private offset: number = 0;
  /** Animation direction: left or right */
  private direction: "left" | "right";
  /** Animation frame ID for cancellation */
  private animationId: number | null = null;

  // Initializes marquee with target element ID and optional configuration
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

  // Duplicates track content to create seamless infinite scrolling
  private duplicateTrack(): void {
    this.trackEl!.innerHTML += this.trackEl!.innerHTML;
  }

  // Adds mouse enter/leave event listeners for pause on hover functionality
  private addHoverListeners(): void {
    this.trackEl!.addEventListener("mouseenter", () => this.pause());
    this.trackEl!.addEventListener("mouseleave", () => this.resume());
  }

  // Pauses the marquee animation by canceling the animation frame
  public pause(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  // Resumes the marquee animation by restarting the move function
  public resume(): void {
    this.initMove();
  }

  // Initializes the continuous scrolling animation using requestAnimationFrame
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
