import { ModalStore } from "../../../stores/\bmodal/ModalStore.js";

export class WelcomeModal {
  constructor() {
    this.nav = document.querySelector(".nav-bar");
    this.welcomeModal = this.createWelcomeModal();

    ModalStore.register(() => this.render());
  }

  createWelcomeModal() {
    const welcomeModal = document.createElement("div");
    welcomeModal.classList.add("welcome-modal");
    welcomeModal.innerHTML = this.template();
    this.nav.appendChild(welcomeModal);
    setTimeout(() => {
      this.welcomeModal.style.display = "block";
    }, 1000);

    return welcomeModal;
  }

  render() {
    const { welcomeModal } = ModalStore.getState();

    if (welcomeModal) {
      this.welcomeModal.style.display = "block";
    } else {
      this.welcomeModal.remove();
    }
  }

  template() {
    return `
      <div class="welcome-modal__rectangle"></div>
      <div class="welcome-modal__content">
        <button class="welcome-modal__button">로그인</button>
        <div class="welcome-modal__caption">
          <div>기존 사용자가 아니십니까?</div>
          <a>여기에서 시작합니다.</a>
        </div>
      </div>
    `;
  }
}
