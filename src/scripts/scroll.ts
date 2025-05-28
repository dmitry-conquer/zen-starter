import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import "lenis/dist/lenis.css";

declare const backendData: {
  smoothScroll?: boolean;
};

export default class Scroll {
  private isSmoothScrollReady() {
    return typeof backendData !== "undefined" && backendData.smoothScroll;
  }

  public initSmoothScroll() {
    if (!this.isSmoothScrollReady()) return;
    new Lenis({
      autoRaf: true,
      anchors: true,
    });
  }

  public initAOS() {
    AOS.init({
      duration: 700,
      once: true,
    });
  }
}
