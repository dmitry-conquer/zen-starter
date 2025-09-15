import MicroModal from "micromodal";

export const initModal = (scroll: any) => {
  MicroModal.init({
    disableScroll: true,
    disableFocus: true,
    onShow: () => scroll.stop(),
    onClose: () => scroll.start(),
  });
};

export const openModal = (modalId: string, scroll: any) => {
  MicroModal.show(modalId, {
    disableScroll: true,
    disableFocus: true,
    onShow: () => scroll.stop(),
    onClose: () => scroll.start(),
  });
};

export const preventModalLinkClick = () => {
  const links = document.querySelectorAll("a[data-micromodal-trigger]");
  if (!links.length) return;
  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
    });
  });
};
