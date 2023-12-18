import { action, makeObservable, observable } from "mobx";

type ModalType = "ADVOCATE";

class Modal {
  shown: boolean = false;
  modalType: ModalType = "ADVOCATE";

  formData: any = null;
  formatNameObject: any = null;

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
    let tmp: any = {};
    formData?.field.forEach((item: any) => {
      console.log("item", item);
      tmp[`${item?.formatName}`] = "";
    });
    console.log("for", tmp);
    this.formatNameObject = tmp;
    this.formData = formData;
  }
}

export const modal = new Modal();
