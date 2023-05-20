export class SearchView {
  constructor(model, intent) {
    this.model = model;
    this.intent = intent;

    this.searchBar = document.querySelector(".search-bar");
    this.searchInput = this.searchBar.querySelector("input");
    this.searchModal = this.createSearchModal();

    this.setEvent();

    this.boundOutsideClick = this.OutsideClick.bind(this);
    this.model.registerListener(this.updateDOMStyle.bind(this));
    this.model.registerListener(this.render.bind(this));
  }

  createSearchModal() {
    const searchModal = document.createElement("div");
    searchModal.classList.add("search-bar-modal");
    this.searchBar.appendChild(searchModal);
    return searchModal;
  }

  render() {
    const state = this.model.getState();
    if (state.shouldRender) {
      this.searchModal.innerHTML = this.getTemplate(state);
    }
  }

  getTemplate(state) {
    if (state.layer.isOn) {
      return `
    ${state.keywords.recent ? this.getRecentTemplate(state) : ""}
    ${state.input.value ? this.getAutoTemplate(state) : ""}
    ${state.input.value ? "" : this.getSuggestedTemplate(state)}
    `;
    } else return "";
  }

  setEvent() {
    this.searchModal.addEventListener("click", (e) => {
      const targetElement = e.target;

      if (targetElement.parentNode === this.searchModal) {
        const targetText = targetElement
          .querySelector(".text")
          .textContent.trim();
        this.intent.handleKeywordClick(targetText);
        return;
      }
      if (targetElement.className === "delete-btn") {
        this.intent.handleDeleteButtonClick();
        return;
      }
    });

    this.searchInput.addEventListener("click", () => {
      this.intent.handleInputClick();
      document.addEventListener("click", this.boundOutsideClick);
    });

    this.searchInput.addEventListener("input", this.intent.handleInput);
    this.searchInput.addEventListener("keydown", this.intent.handleKeydown);

    this.searchInput.addEventListener(
      "compositionstart",
      this.intent.handleCompositionStart
    );
    this.searchInput.addEventListener(
      "compositionend",
      this.intent.handleCompositionEnd
    );
  }

  updateDOMStyle() {
    const state = this.model.getState();
    const key = state.eventKey;

    if (state.allowDOMStyleUpdate) {
      // 키로 들어오는 이벤트가 아니면 미리 컷
      const keywordsElements =
        document.querySelector(".search-bar-modal").children;
      const inputElementValue = document.querySelector("input");
      let selected = this.searchModal.querySelector(".selected") ?? null;

      const isUp = key === "ArrowUp";
      const isLast = selected === keywordsElements[keywordsElements.length - 1];
      const isFirst = selected === keywordsElements[0];

      if (isLast) {
        if (!isUp) {
          selected.classList.remove("selected");
          inputElementValue.value = "";
          return;
        }
      } else if (isFirst) {
        if (isUp) {
          selected.classList.remove("selected");
          inputElementValue.value = "";
          return;
        }
      }

      if (!selected) {
        selected = isUp
          ? keywordsElements[keywordsElements.length - 1]
          : keywordsElements[0];
        selected.classList.add("selected");

        inputElementValue.value = selected
          .querySelector(".text")
          .textContent.trim();
      } else {
        selected = isUp
          ? selected.previousElementSibling
          : selected.nextElementSibling;
        isUp
          ? selected.nextElementSibling.classList.remove("selected")
          : selected.previousElementSibling.classList.remove("selected");

        selected.classList.add("selected");
        inputElementValue.value = selected
          .querySelector(".text")
          .textContent.trim();
      }
    }
  }

  addRecentKeyword() {
    if (this.model.keywords.recent) {
      this.recentKeywords.add(this.model.keywords.recent);

      if (this.recentKeywords.size > 5) {
        const iterator = this.recentKeywords.values();
        const firstKeyword = iterator.next().value;
        this.recentKeywords.delete(firstKeyword);
      }
    }
  }

  deleteRecentKeyword() {
    if (this.recentKeywords.has(this.model.keywords.delete)) {
      this.recentKeywords.delete(this.model.keywords.delete);
    }
  }

  OutsideClick(event) {
    const searchBar = document.querySelector(".search-bar");
    if (!searchBar.contains(event.target)) {
      this.intent.handleOutsideClick();
      const inputElementValue = searchBar.querySelector("input");
      this.intent.inputValueUpdate(inputElementValue.value);
      document.removeEventListener("click", this.boundOutsideClick);
    }
  }

  getRecentTemplate(state) {
    return `
      ${Array.from(state.keywords.recent)
        .map(
          (keyword) => `
          <div class ="recent-search">
            <div class="text">${keyword}</div>
            <img class="delete-btn" src="/src/assets/img/search-close.svg" />
          </div>`
        )
        .join("")}
    `;
  }

  getAutoTemplate(state) {
    const autoCompletedKeywords = state.keywords.auto;
    return `
          ${autoCompletedKeywords
            .map((keyword) => {
              if (keyword.includes(state.input.value)) {
                const highlightedKeyword = keyword.replace(
                  new RegExp(state.input.value, "gi"),
                  `<span>${state.input.value}</span>`
                );
                return `
              <div id="autoSearchTerms">
                <div class="text">${keyword}</div>
                <div>
                  ${highlightedKeyword}
                </div>
              </div>`;
              }
              return "";
            })
            .filter(Boolean)
            .slice(0, 10)
            .join("")}
        `;
  }

  getSuggestedTemplate(state) {
    const suggestedSearchTerms = state.keywords.suggested;
    return `
      ${suggestedSearchTerms
        .map(
          (searchTerm) => `
          <div>
            <img src="/src/assets/img/search-symbol.svg">
            <div class="text">${searchTerm}</div>
          </div>`
        )
        .join("")}
    `;
  }
}

// 지피티가 리팩토링해준코드

// updateDOMStyle() {
//   const state = this.model.getState();
//   const key = state.eventKey;

//   if (!key) {
//     return;
//   }

//   const keywordsElements = document.querySelector(".search-bar-modal").children;
//   const inputElement = document.querySelector("input");

//   let selected = this.searchModal.querySelector(".selected") ?? null;
//   const isUp = key === "ArrowUp";
//   const isLast = selected === keywordsElements[keywordsElements.length - 1];
//   const isFirst = selected === keywordsElements[0];

//   const updateSelection = (element, isSelected) => {
//     if (element) {
//       element.classList.toggle("selected", isSelected);
//       inputElement.value = isSelected ? element.textContent.trim() : "";
//     }
//   };

//   if ((isUp && isFirst) || (!isUp && isLast)) {
//     updateSelection(selected, false);
//     return;
//   }

//   if (!selected) {
//     selected = isUp ? keywordsElements[keywordsElements.length - 1] : keywordsElements[0];
//   } else {
//     updateSelection(selected, false);
//     selected = isUp ? selected.previousElementSibling : selected.nextElementSibling;
//   }

//   updateSelection(selected, true);
// }
