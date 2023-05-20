export class SearchModel {
  constructor() {
    this.state = {
      shouldRender: false,
      allowDOMStyleUpdate: false,
      layer: {
        isOn: false,
      },

      typing: {
        isInProgress: false,
      },
      input: {
        value: "",
      },
      select: {
        isReady: false,
        DOMtext: "",
      },
      eventKey: "",

      keywords: {
        current: [],
        first: "",
        last: "",

        auto: [],
        recent: new Set(),
        delete: "",
        suggested: [],
      },
    };

    this.listeners = [];

    this.initState();
  }

  async initState() {
    try {
      const keywords = this.state.keywords;
      const suggestedResponse = await fetch("http://localhost:3000/suggest");
      const suggestedJsonData = await suggestedResponse.json();

      const autoResponse = await fetch("http://localhost:3000/auto");
      const autoJsonData = await autoResponse.json();

      keywords.suggested.push(...suggestedJsonData.item); //개꿀문법 기억해
      keywords.auto.push(...autoJsonData.item);
    } catch (error) {
      console.error("모델 초기화 오류:", error);
    }
  }

  notify() {
    for (let listener of this.listeners) {
      listener();
    }

    if (this.state.shouldRender) {
      this.state.shouldRender = false;
    }

    if (this.state.allowDOMStyleUpdate) {
      this.state.allowDOMStyleUpdate = false;
    }
  }

  getState() {
    return this.state;
  }

  registerListener(listener) {
    this.listeners.push(listener);
  }

  toggleSearchLayer() {
    const newState = {
      ...this.state,
      layer: {
        isOn: !this.state.layer.isOn,
      },
      shouldRender: true,
    };
    if (newState.layer.isOn !== this.state.layer.isOn) {
      this.state = newState;
      this.notify();
    }
  }

  setInputValue(value) {
    const newState = {
      ...this.state,
      input: {
        value: value,
      },
      shouldRender: true,
    };
    if (newState.input.value !== this.state.input.value) {
      this.state = newState;

      this.notify();
    }
  }

  setEventKey(key) {
    const newState = {
      ...this.state,
      eventKey: key,
      allowDOMStyleUpdate: true,
    };
    if (
      newState.eventKey !== this.state.eventKey &&
      newState.allowDOMStyleUpdate !== this.state.allowDOMStyleUpdate
    ) {
      this.state = newState;
      this.notify();
    }
    this.state.eventKey = "";
  }

  setRecentKeyword(value) {
    const recent = this.state.keywords.recent;
    recent.add(value);

    if (recent.size > 5) {
      this.deleteRecentKeyword();
      return;
    }

    this.notify();
  }

  deleteRecentKeyword() {
    const recent = this.state.keywords.recent;
    const firstElement = recent.values().next().value;
    recent.delete(firstElement);

    this.state.shouldRender = true;

    this.notify();
  }

  toggleIsTyping() {
    this.state.typing.isInProgress = !this.state.typing.isInProgress;
  }
}
