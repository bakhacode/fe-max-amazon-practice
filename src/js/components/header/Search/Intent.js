export class SearchIntent {
  constructor(model) {
    this.model = model;

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);

    this.handleKeydown = this.handleKeydown.bind(this);

    this.handleCompositionStart = this.handleCompositionStart.bind(this);
    this.handleCompositionEnd = this.handleCompositionEnd.bind(this);
  }

  handleInputClick() {
    const state = this.model.getState();
    if (!state.layer.isOn) {
      this.model.toggleSearchLayer();
    }
  }
  handleOutsideClick() {
    const state = this.model.getState();
    if (state.layer.isOn) {
      this.model.toggleSearchLayer();
    }
  }

  handleKeywordClick(targetText) {
    const state = this.model.getState();
    this.model.setRecentKeyword(targetText);

    if (state.layer.isOn) {
      this.model.toggleSearchLayer();
    }
  }
  handleDeleteButtonClick() {
    this.model.deleteRecentKeyword();
  }

  handleInput(e) {
    const state = this.model.getState();
    const inputElementValue = e.target.value;
    const inputValue = state.input.value;

    if (inputElementValue === inputValue) {
      return;
    }
    this.model.setInputValue(e.target.value);
  }
  handleKeydown(e) {
    const key = e.key;
    const inputElementValue = e.target.value;
    const state = this.model.getState();

    if (this.allowMoveUpDown(key) && !state.typing.isInProgress) {
      this.model.setEventKey(key);
    }
    if (key === "Enter" && !state.typing.isInProgress) {
      if (!inputElementValue) {
      } else {
        this.inputValueUpdate(inputElementValue);
        this.model.setRecentKeyword(inputElementValue);
      }
      if (state.layer.isOn) {
        this.model.toggleSearchLayer();
      }
    }
  }
  allowMoveUpDown(key) {
    return key === "ArrowUp" || key === "ArrowDown";
  }
  inputValueUpdate(currentValue) {
    this.model.setInputValue(currentValue);
  }

  handleCompositionStart() {
    this.model.toggleIsTyping();
  }

  handleCompositionEnd() {
    this.model.toggleIsTyping();
  }
}
