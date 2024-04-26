/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { db } from "../firebase/configration";

type MonthDocument = { month: string; days: Days };

type Days = {
  days: { [key: string]: Day };
};

type Day = {
  duhr: dayTime;
  fajr: dayTime;
  mgrb: dayTime;
  sunrise: dayTime;
  asr: dayTime;
  asha: dayTime;
};

type dayTime = {
  seconds: number;
  nanoseconds: number;
};

export class MonthsStore {
  private months = [
    { en: "jan", ar: "يناير" },
    { en: "feb", ar: "فبراير" },
    { en: "mar", ar: "مارس" },
    { en: "apr", ar: "أبريل" },
    { en: "may", ar: "مايو" },
    { en: "june", ar: "يونيو" },
    { en: "july", ar: "يوليو" },
    { en: "aug", ar: "أغسطس" },
    { en: "sept", ar: "سبتمبر" },
    { en: "oct", ar: "أكتوبر" },
    { en: "nov", ar: "نوفمبر" },
    { en: "dec", ar: "ديسمبر" },
  ];
  CurrentMonth = "";
  CurrentIndex = 0;
  monthsDocuments: MonthDocument[] = [];
  currenMonthDocument: MonthDocument = {
    month: "",
    days: { days: {} },
  } as MonthDocument;

  constructor() {
    makeAutoObservable(this);
  }

  getCurrentMonth() {
    const today = new Date();
    this.CurrentMonth = this.months[today.getMonth()].ar;
    this.CurrentIndex = today.getMonth();
  }

  getNextMonth = () => {
    runInAction(() => {
      if (this.CurrentIndex < 11) {
        this.CurrentIndex++;
      } else {
        this.CurrentIndex = 0;
      }
      this.CurrentMonth = this.months[this.CurrentIndex].ar;

      this.currenMonthDocument =
        this.monthsDocuments.find(
          (doc) => doc.month === this.months[this.CurrentIndex].en
        ) ?? ({} as MonthDocument);
    });
  };

  getPreviousMonth = () => {
    runInAction(() => {
      if (this.CurrentIndex > 0) {
        this.CurrentIndex--;
      } else {
        this.CurrentIndex = 11;
      }
      this.CurrentMonth = this.months[this.CurrentIndex].ar;
      this.currenMonthDocument =
        this.monthsDocuments.find(
          (doc) => doc.month === this.months[this.CurrentIndex].en
        ) ?? ({} as MonthDocument);
    });
  };

  getAllMonthsData = async () => {
    const q = query(collection(db, "months"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.monthsDocuments.push({ month: doc.id, days: <Days>doc.data() });
      console.log({ month: doc.id, days: doc.data() });
    });
    // console.log(querySnapshot.docs);
    // await console.log(this.monthsDocuments);
  };
}
