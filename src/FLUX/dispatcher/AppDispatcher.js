class Dispatcher {
  constructor() {
    this.isDispatching = false;
    this.callbacks = [];
  }

  register(callback) {
    this.callbacks.push(callback);
  }

  dispatch(payload) {
    if (this.isDispatching) {
      console.error("디스패치 도중 디스패치할 수 없습니다");
    }

    this.isDispatching = true;
    for (const callback of this.callbacks) {
      callback(payload);
    }
    this.isDispatching = false;
  }
}

export const AppDispatcher = new Dispatcher();
