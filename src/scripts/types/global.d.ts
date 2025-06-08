type TypeAccordioState = {
  activeAccordionIndex: number;
};

type TypeTabsState = {
  activeTabIndex: number;
};

type ModalOptions = {
  onShow?: () => void;
  onClose?: () => void;
  disableScroll?: boolean;
  disableFocus?: boolean;
};
