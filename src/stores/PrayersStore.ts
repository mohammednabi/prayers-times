/* eslint-disable @typescript-eslint/no-unused-vars */
import { doc, getDoc, setDoc } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { db } from "../firebase/configration";
import { allMonths, getThePrayTime } from "../firebase/firebaseCustomFunctions";
import { prayTime } from "../specificTypes";
import { FieldValues } from "react-hook-form";
import { SummerTimeStore } from "./SummerTimeStore";

type nextPrayType = {
  nextPray?: string;
  nextPrayTime?: string;
  nextPrayTimeSeconds?: number;
};

export class PrayersStore {
  todayTimes: prayTime = {} as prayTime;
  tommorowTimes: prayTime = {} as prayTime;
  nextPrayObj: nextPrayType = {
    nextPray: "صلاة المغرب",
    nextPrayTime: "",
    nextPrayTimeSeconds: 0,
  } as nextPrayType;
  timer: string = "";

  allDays?: object = {};

  constructor() {
    makeAutoObservable(this);
  }

  getTodayPraysTimes = async () => {
    const today = new Date();

    const docRef = doc(db, "months", allMonths[today.getMonth()]);
    await getDoc(docRef).then((snapshot) => {
      runInAction(() => {
        console.log("this is all days :", snapshot.data());
        // this.allDays = snapshot.data()?.days;
        this.todayTimes = snapshot.data()?.days[`${today.getDate()}`];
      });

      // const times: prayTime = snapshot.data()?.days[`${today.getDate()}`];
      // return times;
    });
  };

  getTommorowPraysTimes = async () => {
    const today = new Date();
    const tommorow = new Date();

    tommorow.setDate(today.getDate() + 1);

    const docRef = doc(db, "months", allMonths[tommorow.getMonth()]);
    await getDoc(docRef).then((snapshot) => {
      runInAction(() => {
        this.tommorowTimes = snapshot.data()?.days[`${tommorow.getDate()}`];
      });

      // const times: prayTime = snapshot.data()?.days[`${today.getDate()}`];
      // return times;
    });
  };

  getTheNextPray = async () => {
    const timeNow = new Date();
    const summerTime = new SummerTimeStore();
    summerTime.getTheSummerTime();

    if (this.todayTimes.fajr.seconds > 0 && this.todayTimes.fajr.seconds > 0) {
      const prays: {
        prayTitle?: string;
        prayTime?: string;
        prayTimeInSeconds: number;
      }[] = [
        {
          prayTitle: "صلاة الفجر",
          prayTime: getThePrayTime(this.todayTimes.fajr?.seconds),
          prayTimeInSeconds:
            summerTime.isSummerTime === true
              ? this.todayTimes.fajr?.seconds + 3600
              : this.todayTimes.fajr?.seconds,
        },
        {
          prayTitle: "صلاة الظهر",
          prayTime: getThePrayTime(this.todayTimes.duhr?.seconds),
          prayTimeInSeconds:
            summerTime.isSummerTime === true
              ? this.todayTimes.duhr?.seconds + 3600
              : this.todayTimes.duhr?.seconds,
        },
        {
          prayTitle: "صلاة العصر",
          prayTime: getThePrayTime(this.todayTimes.asr?.seconds),
          prayTimeInSeconds:
            summerTime.isSummerTime === true
              ? this.todayTimes.asr?.seconds + 3600
              : this.todayTimes.asr?.seconds,
        },
        {
          prayTitle: "صلاة المغرب",
          prayTime: getThePrayTime(this.todayTimes.mgrb?.seconds),
          prayTimeInSeconds:
            summerTime.isSummerTime === true
              ? this.todayTimes.mgrb?.seconds + 3600
              : this.todayTimes.mgrb?.seconds,
        },
        {
          prayTitle: "صلاة العشاء",
          prayTime: getThePrayTime(this.todayTimes.asha?.seconds),
          prayTimeInSeconds:
            summerTime.isSummerTime === true
              ? this.todayTimes.asha?.seconds + 3600
              : this.todayTimes.asha?.seconds,
        },
      ];

      const next = prays.find((pray) => {
        const differneTimeInSeconds =
          (new Date(pray.prayTimeInSeconds * 1000).getTime() -
            timeNow.getTime()) /
          1000;
        if (differneTimeInSeconds > 0) {
          runInAction(() => {
            this.timer = this.formatTime(
              // summerTime.isSummerTime === true
              //   ? differneTimeInSeconds + 3600
              //   : differneTimeInSeconds
              differneTimeInSeconds
            );
          });
          return pray;
        }
      });

      if (next) {
        runInAction(() => {
          this.nextPrayObj = {
            nextPray: next?.prayTitle,
            nextPrayTime: next?.prayTime,
            nextPrayTimeSeconds: next?.prayTimeInSeconds,
          };
        });
      } else {
        const differneTimeInSeconds =
          (new Date(this.tommorowTimes.fajr?.seconds * 1000).getTime() -
            timeNow.getTime()) /
          1000;
        runInAction(() => {
          this.timer = this.formatTime(
            summerTime.isSummerTime
              ? differneTimeInSeconds + 3600
              : differneTimeInSeconds
          );
          this.nextPrayObj = {
            nextPray: "صلاة الفجر غدا",
            nextPrayTime: getThePrayTime(this.tommorowTimes.fajr?.seconds),
            nextPrayTimeSeconds: this.tommorowTimes.fajr?.seconds,
          };
        });
      }
    }
  };

  formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  getMonthDaysPraysTimes = async (monthIndex: number) => {
    // const today = new Date();

    const docRef = doc(db, "months", allMonths[monthIndex]);
    await getDoc(docRef).then((snapshot) => {
      runInAction(() => {
        console.log("this is all days of the month :", snapshot.data());
        this.allDays = snapshot.data()?.days;
        // this.todayTimes = snapshot.data()?.days[`${today.getDate()}`];
      });

      // const times: prayTime = snapshot.data()?.days[`${today.getDate()}`];
      // return times;
    });
  };

  addDayTimes = async (monthIndex: number, formData: FieldValues) => {
    this.getMonthDaysPraysTimes(monthIndex).then(() => {
      if (this.allDays && Object.keys(this.allDays).length > 0) {
        const theNewData = {
          days: {
            ...this.allDays,
            [`${new Date(formData.day).getDate()}`]: {
              fajr: new Date(`${formData.day} ${formData.fajr}`),
              sunrise: new Date(`${formData.day} ${formData.sunrise}`),
              duhr: new Date(`${formData.day} ${formData.duhr}`),
              asr: new Date(`${formData.day} ${formData.asr}`),
              mgrb: new Date(`${formData.day} ${formData.mgrb}`),
              asha: new Date(`${formData.day} ${formData.asha}`),
            },
          },
        };

        // console.log("done inside the function else");
        return setDoc(doc(db, "months", allMonths[monthIndex]), theNewData);
      } else {
        const theNewData = {
          days: {
            ...this.allDays,
            [`${new Date(formData.day).getDate()}`]: {
              fajr: new Date(`${formData.day} ${formData.fajr}`),
              sunrise: new Date(`${formData.day} ${formData.sunrise}`),
              duhr: new Date(`${formData.day} ${formData.duhr}`),
              asr: new Date(`${formData.day} ${formData.asr}`),
              mgrb: new Date(`${formData.day} ${formData.mgrb}`),
              asha: new Date(`${formData.day} ${formData.asha}`),
            },
          },
        };

        // console.log("done inside the function else");
        return setDoc(doc(db, "months", allMonths[monthIndex]), theNewData);
      }
    });
  };
}
