export class NavMainIntent {
  constructor(model) {
    this.model = model;

    this.handleLoaded.bind(this);

    this.handleAddressMouseEnter.bind(this);
    this.handleAddressMouseLeave.bind(this);

    this.handleLoginMouseEnter.bind(this);
    this.handleLoginMouseLeave.bind(this);
  }

  handleLoaded() {
    this.model.setWelcomeModalVisible(true);
  }

  handleAddressMouseEnter() {
    this.model.toggleAddressModalVisible();
  }
  handleAddressMouseLeave() {
    this.model.toggleAddressModalVisible();
  }

  handleLoginMouseEnter() {
    if (this.model.state.welcomeModalVisible) {
      this.model.setWelcomeModalVisible(false);
    }
    this.model.toggleLoginModalVisible();
  }
  handleLoginMouseLeave() {
    this.model.toggleLoginModalVisible();
  }
}
