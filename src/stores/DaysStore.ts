import { makeAutoObservable, runInAction } from "mobx";

export class DaysStore {
  todayRoman: string = "";
  todayHijri: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  getTodayDate() {
    const todayDate = new Date();

    runInAction(() => {
      this.todayRoman = todayDate.toLocaleDateString("ar-EG", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      this.todayHijri = todayDate.toLocaleDateString("ar-SA", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    });
  }
}
