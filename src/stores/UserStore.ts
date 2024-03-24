import { User, signInWithEmailAndPassword } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { auth } from "../firebase/firebaseAuth";

export class UserStore {
  user: User = {} as User;
  errorMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  signIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.errorMessage = "";
        if (userCredential) {
          this.user = userCredential.user;
        }

        // console.log({ userCredential });
      })
      .catch((err) => {
        this.errorMessage = err.message;
      });
  }
}
