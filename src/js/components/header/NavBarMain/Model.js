export class NavMainModel {
  constructor() {
    this.state = {
      addressModalVisible: false,
      loginModalVisible: false,
      welcomeModalVisible: false,
    };

    this.listeners = [];
  }

  registerListener(listener) {
    this.listeners.push(listener);
  }
  getState() {
    return this.state;
  }
  notify() {
    for (let listener of this.listeners) {
      listener();
    }
  }

  toggleAddressModalVisible() {
    const newState = {
      ...this.state,
      addressModalVisible: !this.state.addressModalVisible,
    };
    if (newState.addressModalVisible !== this.state.addressModalVisible) {
      this.state = newState;
      this.notify();
    }
  }
  toggleLoginModalVisible() {
    const newState = {
      ...this.state,
      loginModalVisible: !this.state.loginModalVisible,
    };
    if (newState.loginModalVisible !== this.state.loginModalVisible) {
      this.state = newState;
      this.notify();
    }
  }
  setWelcomeModalVisible(value) {
    const newState = {
      ...this.state,
      welcomeModalVisible: value,
    };
    if (newState.welcomeModalVisible !== this.state.welcomeModalVisible) {
      this.state = newState;
      this.notify();
    }
  }
}
