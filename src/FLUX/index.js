import { Nav } from "./components/nav/NavComponent.js";
import { AddressModal } from "./components/nav/modals/AddressModal.js";
import { LoginModal } from "./components/nav/modals/LoginModal.js";
import { WelcomeModal } from "./components/nav/modals/WelcomeModal.js";

window.onload = () => {
  new Nav();
  new WelcomeModal();
  new AddressModal();
  new LoginModal();
};
