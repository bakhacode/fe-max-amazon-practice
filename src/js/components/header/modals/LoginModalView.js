export class LoginModalView {
  constructor(model) {
    this.loginArea = document.querySelector(".login");
    this.loginModal = this.createLoginModal();

    this.model = model;
    this.model.registerListener(this.render.bind(this));
  }

  createLoginModal() {
    const loginModal = document.createElement("div");
    loginModal.classList.add("login-modal");
    loginModal.innerHTML = this.template();

    this.loginArea.appendChild(loginModal);

    return loginModal;
  }

  render() {
    const { loginModalVisible } = this.model.getState();

    if (loginModalVisible) {
      this.loginModal.style.display = "block";
    } else {
      this.loginModal.style.display = "none";
    }
  }

  template() {
    return `
      <div class="login-modal__content">
        <div class="login-modal__rectangle"></div>
          <button class="login-modal__button">로그인</button>
          <div class="login-modal__caption">
            <div>기존 사용자가 아니십니까?</div>
            <a>여기에서 시작합니다.</a>
          </div>
          <div class="login-modal__border-line"></div>
          <div class="login-modal__category">
            <div class="item-container1">
              <div class="login-modal__category-name">귀하의 목록</div>
              <div>목록 생성</div>
              <div>목록 또는 레지스트리 찾기</div>
              <div>AmazonSmile 자선 품목 목록</div>
            </div>
            <div class="item-container2">
              <div class="login-modal__category-name">계정</div>
              <div>계정</div>
              <div>주문</div>
              <div>권장 사항</div>
              <div>검색 기록</div>
              <div>워치리스트</div>
              <div>비디오 구매 및 대여</div>
              <div>Kindle 언리미티드</div>
              <div>콘텐츠 및 기기</div>
              <div>항목 구독 및 저장</div>
              <div>멤버십 및 구독</div>
              <div>음악 라이브러리</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
