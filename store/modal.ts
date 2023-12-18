import { action, makeObservable, observable } from "mobx";

type ModalType = "ADVOCATE";

class Modal {
  shown: boolean = false;
  modalType: ModalType = "ADVOCATE";

  formData: any = null;

  constructor() {
    makeObservable(this, {
      shown: observable,
      formData: observable,
      showModal: action,
      closeModal: action,
      setFormData: action,
    });
  }

  showModal() {
    this.shown = true;
  }

  closeModal() {
    this.shown = false;
  }

  setFormData(formData: any) {
    this.formData = formData;
  }
}

export const modal = new Modal();
