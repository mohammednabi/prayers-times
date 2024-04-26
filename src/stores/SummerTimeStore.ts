import { makeAutoObservable } from "mobx";

export class SummerTimeStore {
  isSummerTime: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getTheSummerTime = () => {
    const summerTime = localStorage.getItem("summerTime");

    if (summerTime) {
      if (JSON.parse(summerTime) === true) {
        this.isSummerTime = true;
      } else {
        this.isSummerTime = false;
      }
    } else {
      this.isSummerTime = false;
    }
  };

  switchSummerTime() {
    const newSummerTime = !this.isSummerTime;
    this.setTheSummerTimeStorage = newSummerTime;
    this.isSummerTime = newSummerTime;
  }

  set setTheSummerTimeStorage(val: boolean) {
    localStorage.setItem("summerTime", JSON.stringify(val));
  }
}
