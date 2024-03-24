import { DaysStore } from "./DaysStore";
import { PrayersStore } from "./PrayersStore";
import { UserStore } from "./UserStore";

const prayersInstance = new PrayersStore();
const todayInstance = new DaysStore();
const userInstance = new UserStore();

export const store = {
  prayers: prayersInstance,
  today: todayInstance,
  user: userInstance,
};
