export class AddressModalView {
  constructor(model) {
    this.addressArea = document.querySelector(".address");
    this.addressModal = this.createAddressModal();

    this.model = model;
    this.model.registerListener(this.render.bind(this));
  }

  createAddressModal() {
    const addressModal = document.createElement("div");
    addressModal.classList.add("address-modal");
    addressModal.innerHTML = this.getTemplate();

    this.addressArea.appendChild(addressModal);

    return addressModal;
  }

  render() {
    const { addressModalVisible } = this.model.getState();

    if (addressModalVisible) {
      this.addressModal.style.display = "block";
    } else {
      this.addressModal.style.display = "none";
    }
  }

  getTemplate() {
    return `
      <div class="address-modal__content">
      <div class="address-modal__rectangle"></div>
        <div>
          KR으로 배송할 품목을 표시하겠습니다. 다른 국가로 배송되는 품목을
          보려면 배송 주소를 변경하십시오.
        </div>
        <div class="address-modal__button-container">
          <button class="address-modal__button1">계속</button>
          <button class="address-modal__button2">주소 변경</button>
        </div>
        <div class="address-modal__rectangle"></div>
      </div>
      `;
  }
}
