/* eslint-disable @typescript-eslint/no-unused-vars */
import { doc, getDoc, setDoc } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { db } from "../firebase/configration";
import { allMonths, getThePrayTime } from "../firebase/firebaseCustomFunctions";
import { prayTime } from "../specificTypes";
import { FieldValues } from "react-hook-form";

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
        this.allDays = snapshot.data()?.days;
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

    if (this.todayTimes.fajr.seconds > 0 && this.todayTimes.fajr.seconds > 0) {
      const prays: {
        prayTitle?: string;
        prayTime?: string;
        prayTimeInSeconds: number;
      }[] = [
        {
          prayTitle: "صلاة الفجر",
          prayTime: getThePrayTime(this.todayTimes.fajr?.seconds),
          prayTimeInSeconds: this.todayTimes.fajr?.seconds,
        },
        {
          prayTitle: "صلاة الظهر",
          prayTime: getThePrayTime(this.todayTimes.duhr?.seconds),
          prayTimeInSeconds: this.todayTimes.duhr?.seconds,
        },
        {
          prayTitle: "صلاة العصر",
          prayTime: getThePrayTime(this.todayTimes.asr?.seconds),
          prayTimeInSeconds: this.todayTimes.asr?.seconds,
        },
        {
          prayTitle: "صلاة المغرب",
          prayTime: getThePrayTime(this.todayTimes.mgrb?.seconds),
          prayTimeInSeconds: this.todayTimes.mgrb?.seconds,
        },
        {
          prayTitle: "صلاة العشاء",
          prayTime: getThePrayTime(this.todayTimes.asha?.seconds),
          prayTimeInSeconds: this.todayTimes.asha?.seconds,
        },
      ];

      const next = prays.find((pray) => {
        const differneTimeInSeconds =
          (new Date(pray.prayTimeInSeconds * 1000).getTime() -
            timeNow.getTime()) /
          1000;
        if (differneTimeInSeconds > 0) {
          runInAction(() => {
            this.timer = this.formatTime(differneTimeInSeconds);
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
          this.timer = this.formatTime(differneTimeInSeconds);
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

  addDayTimes = async (monthIndex: number, formData: FieldValues) => {
    this.getTodayPraysTimes().then(() => {
      if (this.allDays && Object.keys(this.allDays).length > 0) {
        const theNewData = {
          days: {
            ...this.allDays,
            [`${new Date(formData.fajr).getDate()}`]: {
              fajr: new Date(formData.fajr),
              sunrise: new Date(formData.sunrise),
              duhr: new Date(formData.duhr),
              asr: new Date(formData.asr),
              mgrb: new Date(formData.mgrb),
              asha: new Date(formData.asha),
            },
          },
        };

        // console.log("done inside the function else");
        return setDoc(doc(db, "months", allMonths[monthIndex]), theNewData);
      }
    });
  };
}
