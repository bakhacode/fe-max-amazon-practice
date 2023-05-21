import { modalActions } from "../../actions/modal/ModalActions.js";
import { AppDispatcher } from "../../dispatcher/AppDispatcher.js";

export class Nav {
  constructor() {
    this.nav = this.createNav();
    this.render();
    this.setEvent();
    this.welcomeModalOn = true;
    this.openWelcomeModal();
  }

  createNav() {
    const header = document.querySelector("header");
    const nav = document.createElement("div");
    nav.classList.add("nav-bar");
    header.appendChild(nav);

    return nav;
  }

  render() {
    this.nav.innerHTML = this.template();
  }

  setEvent() {
    const $addressArea = this.nav.querySelector(".address");

    $addressArea.addEventListener("mouseenter", () =>
      this.handleAddressEnter()
    );
    $addressArea.addEventListener("mouseleave", () =>
      this.handleAddressLeave()
    );

    const $loginArea = this.nav.querySelector(".login");

    $loginArea.addEventListener("mouseenter", () => this.handleLoginEnter());
    $loginArea.addEventListener("mouseleave", () => this.handleLoginLeave());
  }

  openWelcomeModal() {
    console.log("로드이벤트");
    AppDispatcher.dispatch(modalActions.openModal("welcomeModal"));
  }

  handleAddressEnter() {
    AppDispatcher.dispatch(modalActions.openModal("addressModal"));
  }
  handleAddressLeave() {
    AppDispatcher.dispatch(modalActions.closeModal("addressModal"));
  }
  handleLoginEnter() {
    AppDispatcher.dispatch(modalActions.openModal("loginModal"));
    if (this.welcomeModalOn) {
      this.welcomeModalOn = false;
      AppDispatcher.dispatch(modalActions.closeModal("welcomeModal"));
    }
  }
  handleLoginLeave() {
    AppDispatcher.dispatch(modalActions.closeModal("loginModal"));
  }

  template() {
    return `
      <div class="nav-bar__main">
        <img src="src/assets/img/amazon-logo.svg" />
        <div class="address">
          <div class="subtext-container">
            <img src="src/assets/img/address.svg" />
            <div class="subtext">배송처</div>
          </div>
          <div>대한민국</div>
        </div>
        <div class='search-bar'>
          <div class="search-bar__container">
            <div class="input-container">
              <input type="text" placeholder="검색 Amazon" />
            </div>
            <img
              class="search-bar__button"
              src="src/assets/img/search-btn.svg"
            />
          </div>
        </div>
        <div class="nation">🇰🇷 KO</div>
        <div class="login">
          <div class="subtext">안녕하세요,로그인</div>
          <div>계정 및 목록</div>
        </div>
        <div class="my-page">
          <div class="subtext">반품</div>
          <div>&주문</div>
        </div>
        <div class="cart">
          <img src="src/assets/img/cart.svg" />
          <div>장바구니</div>
        </div>
      </div>
    `;
  }
}
