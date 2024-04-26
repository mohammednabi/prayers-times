import { DaysStore } from "./DaysStore";
import { MonthsStore } from "./MonthsStore";
import { PrayersStore } from "./PrayersStore";
import { SummerTimeStore } from "./SummerTimeStore";
import { UserStore } from "./UserStore";

const prayersInstance = new PrayersStore();
const todayInstance = new DaysStore();
const userInstance = new UserStore();
const monthsInstance = new MonthsStore();
const summerTimeInstance = new SummerTimeStore();

export const store = {
  prayers: prayersInstance,
  today: todayInstance,
  user: userInstance,
  months: monthsInstance,
  summer: summerTimeInstance,
};
