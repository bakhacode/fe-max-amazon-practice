export class WelcomeModalView {
  constructor(model) {
    this.modalRoot = document.querySelector(".modal-root");
    this.welcomeModal = this.createWelcomeModal();

    this.model = model;
    this.model.registerListener(this.render.bind(this));
  }

  createWelcomeModal() {
    const welcomeModal = document.createElement("div");
    welcomeModal.classList.add("welcome-modal");
    welcomeModal.innerHTML = this.template();

    this.modalRoot.appendChild(welcomeModal);

    return welcomeModal;
  }

  render() {
    const { welcomeModalVisible } = this.model.getState();
    if (welcomeModalVisible) {
      this.welcomeModal.style.display = "block";
    } else {
      this.welcomeModal.style.display = "none";
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
