/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { db } from "../firebase/configration";
// import { SummerTimeStore } from "./SummerTimeStore";

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
  // monthsDocumentsLength: number = 0;
  currenMonthDocument: MonthDocument = {
    month: "",
    days: { days: {} },
  } as MonthDocument;

  currentMonthTimesArray: { day: string; allTimes: string[] }[] = [];

  currentMonthDataLoading = false;

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
      // this.monthsDocumentsLength++;
      // console.log("this is all months data :", {
      //   month: doc.id,
      //   days: doc.data(),
      // });
    });

    // console.log(querySnapshot.docs);
    // await console.log(this.monthsDocuments);
  };

  getAllCurrentMonthsTimes = async () => {
    this.currentMonthDataLoading = true;
    if (this.currenMonthDocument.month !== "") {
      this.currentMonthTimesArray = [];
      const monthkeys = await Object.keys(this.currenMonthDocument.days.days);

      monthkeys.forEach((val) => {
        // console.log("this is the value from the loop :", val);
        if (this.currenMonthDocument.days.days[val]) {
          const singleTimes = {
            day: val,
            allTimes: [
              this.getDateFromSeconds(
                this.currenMonthDocument.days.days[val].fajr.seconds
              ),
              this.getDateFromSeconds(
                this.currenMonthDocument.days.days[val].sunrise.seconds
              ),
              this.getDateFromSeconds(
                this.currenMonthDocument.days.days[val].duhr.seconds
              ),
              this.getDateFromSeconds(
                this.currenMonthDocument.days.days[val].asr.seconds
              ),
              this.getDateFromSeconds(
                this.currenMonthDocument.days.days[val].mgrb.seconds
              ),
              this.getDateFromSeconds(
                this.currenMonthDocument.days.days[val].asha.seconds
              ),
            ],
          };

          this.currentMonthTimesArray.push(singleTimes);
        }
      });
    }

    this.currentMonthDataLoading = false;
  };

  private getDateFromSeconds = (seconds: number) => {
    // const summerStoreInstance = new SummerTimeStore();
    const isSummerTime = localStorage.getItem("summerTime");

    const realSeconds = isSummerTime === "true" ? seconds + 3600 : seconds;

    // const realSeconds = seconds;

    const timeNow = new Date(realSeconds * 1000).toLocaleTimeString("ar-EG", {
      minute: "2-digit",
      hour: "numeric",
      hourCycle: "h12",
    });

    return timeNow;
  };
}
