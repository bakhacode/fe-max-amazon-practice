export class NavMainIntent {
  constructor(model) {
    this.model = model;
    this.handleLoaded = this.handleLoaded.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleLoaded() {
    this.model.setWelcomeModalVisible(true);
  }

  handleMouseEnter(e) {
    if (e.target.className === "address") {
      this.model.toggleAddressModalVisible();
    }
    if (e.target.className === "login") {
      if (this.model.state.welcomeModalVisible) {
        this.model.setWelcomeModalVisible(false);
      }
      this.model.toggleLoginModalVisible();
    }
  }

  handleMouseLeave(e) {
    if (e.target.className === "address") {
      this.model.toggleAddressModalVisible();
    }
    if (e.target.className === "login") {
      this.model.toggleLoginModalVisible();
    }
  }
}

// modalSetup() {
//   const addressArea = document.querySelector(".address");
//   const loginArea = document.querySelector(".login");

//   let timerIdForModal;
//   const halfSecond = 500;

//   document.addEventListener("DOMContentLoaded", () => {
//     this.model.setVisible("welcomeModalVisible", true);
//     this.updateWelcomeModal();
//   });

//   addressArea.addEventListener("mouseenter", () => {
//     if (!this.model.state.addressModalVisible) {
//       this.model.setVisible("addressModalVisible", true);
//       this.updateAddressModal();
//       this.dimIntent.showDim();
//     }
//     clearTimeout(timerIdForModal);
//   });

//   addressArea.addEventListener("mouseleave", () => {
//     timerIdForModal = setTimeout(() => {
//       this.model.setVisible("addressModalVisible", false);
//       this.updateAddressModal();
//       this.dimIntent.hideDim();
//     }, halfSecond);
//   });

//   loginArea.addEventListener("mouseenter", () => {
//     const welcomeModal = document.querySelector(".welcome-modal");
//     if (welcomeModal) {
//       this.model.setVisible("welcomeModalVisible", false);
//       this.updateWelcomeModal();
//     }
//     if (!this.model.state.loginModalVisible) {
//       this.model.setVisible("loginModalVisible", true);
//       this.updateLoginModal();
//       this.dimIntent.showDim();
//     }
//     clearTimeout(timerIdForModal);
//   });

//   loginArea.addEventListener("mouseleave", () => {
//     timerIdForModal = setTimeout(() => {
//       this.model.setVisible("loginModalVisible", false);
//       this.updateLoginModal();
//       this.dimIntent.hideDim();
//     }, halfSecond);
//   });
// }

// updateSearchBarModalState(event, state) {
//   const searchBar = document.querySelector(".search-bar");
//   const searchBarInput = document.querySelector(".search-bar input");
//   const searchBarModalElement = document.querySelector(".search-bar-modal");

//   if (event.key === "Enter") {
//     const selectedSearchTermText =
//       state.selectedSearchTerm.querySelector(".text").textContent;

//     this.model.addRecentSearch(selectedSearchTermText);
//     if (this.model.state.prevInputValue) {
//       searchBarInput.value = this.model.state.prevInputValue;
//     } else {
//       searchBarInput.value = "";
//     }

//     this.updateSearchBarModal(searchBarModalElement);

//     const currentModalSearchTerms = searchBarModalElement.children;
//     this.model.state.currentModalSearchTerms = currentModalSearchTerms;
//     this.model.state.firstSearchTerm = currentModalSearchTerms[0];
//     this.model.state.lastSearchTerm =
//       currentModalSearchTerms[currentModalSearchTerms.length - 1];
//     // this.model.toggleSearchBarModal(false);
//     // searchBar.removeChild(searchBarModalElement);
//     // this.dimIntent.hideDim();
//   }

//   if (event.key === "ArrowDown") {
//     // const isCursorAtEnd =
//     //   event.target.selectionStart === event.target.value.length &&
//     //   event.target.selectionEnd === event.target.value.length;
//     if (!state.selectedSearchTerm) {
//       if (state.isTyping) {
//         event.preventDefault();
//         return;
//       }
//       if (event.target.value && !state.isTyping && !state.selectable) {
//         console.log("이제 선택할 준비가 다됨");
//         this.model.setSelectable(true);
//         return;
//       }
//       this.model.setSelectable(true);
//       if (state.selectable) {
//         if (event.target.value) {
//           this.model.setPrevInputValue(event.target.value);
//         }
//         state.inputValue = event.target.value;
//         state.selectedSearchTerm = state.firstSearchTerm;
//         state.selectedSearchTerm.classList.add("selected");
//         searchBarInput.value =
//           state.selectedSearchTerm.querySelector(".text").textContent;
//       }
//     } else {
//       state.selectedSearchTerm.classList.remove("selected");
//       if (state.selectedSearchTerm.nextElementSibling === null) {
//         state.selectedSearchTerm = "";
//         searchBarInput.value = state.prevInputValue;
//         return;
//       }
//       state.selectedSearchTerm = state.selectedSearchTerm.nextElementSibling;
//       state.selectedSearchTerm.classList.add("selected");
//       searchBarInput.value =
//         state.selectedSearchTerm.querySelector(
//           ".selected > .text"
//         ).textContent;
//     }
//   }
//   if (event.key === "ArrowUp") {
//     if (!state.selectedSearchTerm) {
//       state.selectedSearchTerm = state.lastSearchTerm;
//       state.selectedSearchTerm.classList.add("selected");
//       searchBarInput.value =
//         document.querySelector(".selected > .text").textContent;
//     } else {
//       state.selectedSearchTerm.classList.remove("selected");
//       if (state.selectedSearchTerm.previousElementSibling === null) {
//         state.selectedSearchTerm = "";
//         searchBarInput.value = state.prevInputValue;
//         return;
//       }
//       state.selectedSearchTerm =
//         state.selectedSearchTerm.previousElementSibling;
//       state.selectedSearchTerm.classList.add("selected");
//       searchBarInput.value =
//         document.querySelector(".selected > .text").textContent;
//     }
//   }
// }

// inputSetup() {
//   let timerIdForInput;
//   const searchBar = document.querySelector(".search-bar");
//   const searchBarInput = document.querySelector(".search-bar input");
//   let isKoreanTyping = "false";

//   searchBarInput.addEventListener("keydown", (event) => {
//     this.updateSearchBarModalState(event, this.model.state);
//   });

//   searchBarInput.addEventListener("compositionstart", () => {
//     console.log("한글입력시작");
//     this.model.setIsTyping(true);
//   });

//   searchBarInput.addEventListener("compositionend", () => {
//     // 한글 입력 완료
//     console.log("한글입력완료");
//     this.model.setIsTyping(false);
//   });

//   searchBarInput.addEventListener("input", (e) => {
//     const inputValue = searchBarInput.value;
//     const searchBarModalElement = document.querySelector(".search-bar-modal");
//     const inputValueState = this.model.state.inputValue;
//     console.log(searchBarModalElement);
//     if (inputValue) {
//       if (!searchBarModalElement) {
//         const searchBarModalElement =
//           document.querySelector(".search-bar-modal");
//       }
//       console.log(searchBarModalElement);
//       this.model.setInputSuggested(false);
//       this.updateSearchBarModal(searchBarModalElement);
//     }
//     if (inputValue === "") {
//       if (!searchBarModalElement) {
//         const searchBarModalElement =
//           document.querySelector(".search-bar-modal");
//       }
//       console.log(searchBarModalElement);
//       this.model.setPrevInputValue("");
//       this.model.setInputSuggested(true);
//       this.updateSearchBarModal(searchBarModalElement);
//     }

//     if (e.data !== " ") {
//       this.model.setCurrentInputData(e.data);
//       this.model.setInputValue(inputValue);

//       this.updateSearchBarModal(searchBarModalElement);
//       if (searchBarModalElement.children.length > 0) {
//         const currentModalSearchTerms = searchBarModalElement.children;

//         if (currentModalSearchTerms) {
//           this.model.state.currentModalSearchTerms = currentModalSearchTerms;
//           this.model.state.firstSearchTerm = currentModalSearchTerms[0];
//           this.model.state.lastSearchTerm =
//             currentModalSearchTerms[currentModalSearchTerms.length - 1];
//         }
//       }
//     }
//   });

//   searchBar.addEventListener("click", (e) => {
//     const searchBarModalElement = document.querySelector(".search-bar-modal");
//     const deleteButtons = document.querySelectorAll(".delete-btn");
//     if (searchBarModalElement.contains(e.target)) {
//       const selectedByClick = e.target
//         .closest(".search-bar-modal > *")
//         .querySelector(".text").textContent;

//       this.model.addRecentSearch(selectedByClick);
//       if (this.model.state.prevInputValue) {
//         searchBarInput.value = this.model.state.prevInputValue;
//       } else {
//         searchBarInput.value = "";
//       }

//       this.updateSearchBarModal(searchBarModalElement);

//       const currentModalSearchTerms = searchBarModalElement.children;
//       this.model.state.currentModalSearchTerms = currentModalSearchTerms;
//       this.model.state.firstSearchTerm = currentModalSearchTerms[0];
//       this.model.state.lastSearchTerm =
//         currentModalSearchTerms[currentModalSearchTerms.length - 1];
//     }
//     deleteButtons.forEach((deleteButton) => {
//       if (e.target === deleteButton) {
//         const parentRecentSearch = deleteButton.closest(".recent-search");
//         console.log(parentRecentSearch);

//         this.model.state.recentSearches =
//           this.model.state.recentSearches.filter((search) => {
//             return (
//               search !== parentRecentSearch.querySelector(".text").textContent
//             );
//           });

//         this.updateSearchBarModal(searchBarModalElement);
//       }
//     });
//   });

//   searchBarInput.addEventListener("focus", () => {
//     clearTimeout(timerIdForInput);
//     this.model.toggleSearchBarModal(true);
//     const searchBarModalElement = document.createElement("div");
//     searchBarModalElement.classList.add("search-bar-modal");
//     searchBar.appendChild(searchBarModalElement);
//     this.updateSearchBarModal(searchBarModalElement);
//     this.dimIntent.showDim();

//     const currentModalSearchTerms = searchBarModalElement.children;
//     this.model.state.currentModalSearchTerms = currentModalSearchTerms;
//     this.model.state.firstSearchTerm = currentModalSearchTerms[0];
//     this.model.state.lastSearchTerm =
//       currentModalSearchTerms[currentModalSearchTerms.length - 1];
//   });

//   searchBarInput.addEventListener("blur", () => {
//     timerIdForInput = setTimeout(() => {
//       this.model.setSelectable(false);
//       this.model.toggleSearchBarModal(false);
//       const searchBarModalElement =
//         document.querySelector(".search-bar-modal");
//       searchBar.removeChild(searchBarModalElement);
//       this.dimIntent.hideDim();
//     }, 100);
//   });
// }

// updateSearchBarModal(element) {
//   element.innerHTML = this.view.renderSearchBarModalElement(this.model.state);
// }

// updateWelcomeModal() {
//   const navBarMain = document.querySelector(".nav-bar__main");
//   if (this.model.state.welcomeModalVisible) {
//     const welcomeModal = this.view.createWelcomeModalElement();
//     setTimeout(() => {
//       navBarMain.appendChild(welcomeModal);
//     }, 1000);
//   } else {
//     const welcomeModalElement = document.querySelector(".welcome-modal");
//     if (welcomeModalElement) {
//       navBarMain.removeChild(welcomeModalElement);
//     }
//   }
// }

// updateAddressModal() {
//   const addressArea = document.querySelector(".address");
//   if (this.model.state.addressModalVisible) {
//     const addressModal = this.view.createAddressModalElement();
//     addressArea.appendChild(addressModal);
//   } else {
//     const addressModalElement = document.querySelector(".address-modal");
//     if (addressModalElement) {
//       addressArea.removeChild(addressModalElement);
//     }
//   }
// }

// updateLoginModal() {
//   const loginArea = document.querySelector(".login");
//   if (this.model.state.loginModalVisible) {
//     const loginModal = this.view.createLoginModalElement();
//     loginArea.appendChild(loginModal);
//   } else {
//     const loginModalElement = document.querySelector(".login-modal");
//     if (loginModalElement) {
//       loginArea.removeChild(loginModalElement);
//     }
//   }
// }
// }
