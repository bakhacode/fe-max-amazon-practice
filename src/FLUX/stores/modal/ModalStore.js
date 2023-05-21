import { AppDispatcher } from "../../dispatcher/AppDispatcher.js";

class Store {
  constructor() {
    const state = {
      addressModal: false,
      loginModal: false,
      welcomeModal: true,
    };

    this.state = new Proxy(state, {
      set: (target, property, value) => {
        target[property] = value;
        this.emitChange();
        return true;
      },
    });

    this.listeners = [];

    AppDispatcher.register((action) => {
      this.dispatch(action);
    });
  }

  register(callback) {
    this.listeners.push(callback);
  }

  unregister(callback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  emitChange() {
    this.listeners.forEach((listener) => listener());
  }
  getState() {
    return this.state;
  }

  dispatch(action) {
    const newState = this.reduce(this.state, action);
    for (const key in newState) {
      this.state[key] = newState[key];
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case "OPEN_MODAL":
        return { ...state, [action.modalName]: true };
      case "CLOSE_MODAL":
        return { ...state, [action.modalName]: false };
      default:
        console.error("정의되지 않은 액션타입");
    }
  }
}

export const ModalStore = new Store();
