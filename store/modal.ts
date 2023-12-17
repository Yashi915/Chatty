import { action, makeObservable, observable } from "mobx";

type ModalType = "ADVOCATE";

class Modal {
  shown: boolean = false;
  modalType: ModalType = "ADVOCATE";

  constructor() {
    makeObservable(this, {
      shown: observable,
      showModal: action,
      closeModal: action,
    });
  }

  showModal() {
    this.shown = true;
  }

  closeModal() {
    this.shown = false;
  }
}

export const modal = new Modal();
