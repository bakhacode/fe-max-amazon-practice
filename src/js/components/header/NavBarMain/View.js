export class NavMainView {
  constructor(model, intent) {
    this.model = model;
    this.intent = intent;

    this.$navMain = document.querySelector(".nav-bar__main");
    this.render();
    this.setEvent();
  }

  setEvent() {
    document.addEventListener("DOMContentLoaded", this.intent.handleLoaded);

    const $addressArea = this.$navMain.querySelector(".address");

    $addressArea.addEventListener("mouseenter", this.intent.handleMouseEnter);
    $addressArea.addEventListener("mouseleave", this.intent.handleMouseLeave);

    const $loginArea = this.$navMain.querySelector(".login");

    $loginArea.addEventListener("mouseenter", this.intent.handleMouseEnter);
    $loginArea.addEventListener("mouseleave", this.intent.handleMouseLeave);
  }

  render() {
    this.$navMain.innerHTML = this.template();
  }

  template() {
    return `
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
    `;
  }
}
