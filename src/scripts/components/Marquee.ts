/**
 * Marquee Component
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

type TypeMarqueeOptions = {
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
};

type TypeMarqueeState = {
  offset: number;
  animationId: number | null;
};

/**
 * Main Marquee class
 */
class Marquee {
  // Default configuration
  private readonly defaultOptions: Required<TypeMarqueeOptions> = {
    speed: 2,
    direction: "left",
    pauseOnHover: false,
  };

  private trackEl: HTMLElement | null = null;
  private speed: number;
  private direction: "left" | "right";
  private pauseOnHover: boolean;
  private state: TypeMarqueeState;

  constructor(id: string, options?: TypeMarqueeOptions) {
    // Merge options with defaults
    const config = { ...this.defaultOptions, ...options };
    this.speed = config.speed;
    this.direction = config.direction;
    this.pauseOnHover = config.pauseOnHover;

    // Initialize state
    this.state = {
      offset: 0,
      animationId: null,
    };

    this.initialize(id);
  }

  // Initializes marquee with target element ID
  private initialize(id: string): void {
    this.trackEl = document.getElementById(id);

    if (!this.trackEl) {
      console.warn(`Marquee: Element with id "${id}" not found`);
      return;
    }

    this.setupMarquee();
  }

  // Sets up marquee functionality
  private setupMarquee(): void {
    this.duplicateTrack();
    this.startAnimation();

    if (this.pauseOnHover) {
      this.addHoverListeners();
    }
  }

  // Duplicates track content to create seamless infinite scrolling
  private duplicateTrack(): void {
    if (!this.trackEl) return;
    this.trackEl.innerHTML += this.trackEl.innerHTML;
  }

  // Adds mouse enter/leave event listeners for pause on hover functionality
  private addHoverListeners(): void {
    if (!this.trackEl) return;

    this.trackEl.addEventListener("mouseenter", () => this.pause());
    this.trackEl.addEventListener("mouseleave", () => this.resume());
  }

  // Pauses the marquee animation by canceling the animation frame
  public pause(): void {
    if (this.state.animationId) {
      cancelAnimationFrame(this.state.animationId);
      this.state.animationId = null;
    }
  }

  // Resumes the marquee animation by restarting the move function
  public resume(): void {
    this.startAnimation();
  }

  // Starts the continuous scrolling animation
  private startAnimation(): void {
    this.animate();
  }

  // Main animation loop using requestAnimationFrame
  private animate(): void {
    if (!this.trackEl) return;

    const move = () => {
      this.updatePosition();
      this.updateTransform();
      this.state.animationId = requestAnimationFrame(move);
    };

    move();
  }

  // Updates scroll position based on direction and speed
  private updatePosition(): void {
    const halfWidth = this.trackEl!.scrollWidth / 2;

    if (this.direction === "left") {
      this.state.offset += this.speed;
      if (this.state.offset >= halfWidth) {
        this.state.offset = 0;
      }
    } else {
      this.state.offset -= this.speed;
      if (this.state.offset <= 0) {
        this.state.offset = halfWidth;
      }
    }
  }

  // Updates CSS transform for smooth scrolling
  private updateTransform(): void {
    if (!this.trackEl) return;
    this.trackEl.style.transform = `translateX(-${this.state.offset}px)`;
  }

  // Public method to destroy marquee and clean up resources
  public destroy(): void {
    this.pause();
    this.trackEl = null;
  }
}

export default Marquee;
