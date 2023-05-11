import { NavMainModel } from "./js/components/header/NavBarMain/Model.js";
import { NavMainView } from "./js/components/header/NavBarMain/View.js";
import { NavMainIntent } from "./js/components/header/NavBarMain/Intent.js";

import { AddressModalView } from "./js/components/header/modals/addressModalView.js";
import { LoginModalView } from "./js/components/header/modals/loginModalView.js";
import { WelcomeModalView } from "./js/components/header/modals/welcomeModalView.js";

const navMainModel = new NavMainModel();
const navMainIntent = new NavMainIntent(navMainModel);
new NavMainView(navMainModel, navMainIntent);

new AddressModalView(navMainModel);
new LoginModalView(navMainModel);
new WelcomeModalView(navMainModel);
