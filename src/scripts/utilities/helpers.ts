export const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia?.("(pointer: coarse)")?.matches ||
    window.matchMedia?.("(hover: none)")?.matches
  );
};
