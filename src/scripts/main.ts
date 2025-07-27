import "../styles/main.scss";
import { Header } from "./components";

const initUIComponents = (): void => {
  new Header();
};

document.addEventListener("DOMContentLoaded", (): void => {
  initUIComponents();
});
