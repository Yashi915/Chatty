import { action, makeObservable, observable, runInAction } from "mobx";

import { router } from "expo-router";
import Toast from "react-native-toast-message";

class User {
  isloggedIn = false;
  loading = false;
  error = "";
  email = "";
  name = "";
  type: "admin" | "institute" | "" = "";

  constructor() {
    makeObservable(this, {
      login: action,
      resetError: action,
      logout: action,
      type: observable,
      loading: observable,
      isloggedIn: observable,
      error: observable,
    });
  }

  async login({ email, password, tab }: { email: string; password: string; tab: string }) {
    this.loading = true;

    if (tab === "admin") {
      if (email === "admin@aph.com" && password === "123456") {
        Toast.show({
          type: "info",
          text1: "Succesfully Login",
        });

        this.name = "Admin";
        this.type = "admin";
        this.isloggedIn = true;
        this.email = email;

        router.replace("/");
      } else {
        Toast.show({
          type: "info",
          text1: "Invalid Credential",
        });
      }
    } else {
      router.replace("/(tabs)/");
    }

    this.loading = false;
  }

  resetError() {
    this.error = "";
  }

  logout() {
    this.isloggedIn = false;
    this.name = "";
    this.type = "";
    this.email = "";

    router.replace("/");
  }
}

export const user = new User();
