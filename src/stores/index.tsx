import { DaysStore } from "./DaysStore";
import { PrayersStore } from "./PrayersStore";

const prayersInstance = new PrayersStore();
const todayInstance = new DaysStore();

export const store = {
  prayers: prayersInstance,
  today: todayInstance,
};
