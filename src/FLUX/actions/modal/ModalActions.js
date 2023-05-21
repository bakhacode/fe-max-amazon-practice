import { ActionTypes } from "../../constants/ActionTypes.js";

export const modalActions = {
  openModal(modalName) {
    return { type: ActionTypes.OPEN_MODAL, modalName: modalName };
  },
  closeModal(modalName) {
    return { type: ActionTypes.CLOSE_MODAL, modalName: modalName };
  },
};
